import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { generateChatCompletion } from '@/lib/openai/client';
import {
  buildConversationHistory,
  extractQualificationData,
  getQualificationResultMessage,
} from '@/lib/openai/qualification';
import type { Coach, Conversation, Message } from '@/lib/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coachId, conversationId, message } = body;

    // Validate required fields
    if (!coachId || !conversationId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch coach data
    const coachDoc = await adminDb.collection('coaches').doc(coachId).get();
    if (!coachDoc.exists) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
    }
    const coach = { id: coachDoc.id, ...coachDoc.data() } as Coach;

    // Fetch conversation
    const conversationDoc = await adminDb
      .collection('conversations')
      .doc(conversationId)
      .get();
    if (!conversationDoc.exists) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }
    const conversation = {
      id: conversationDoc.id,
      ...conversationDoc.data(),
    } as Conversation;

    // Add user message to conversation
    const userMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content: message,
      timestamp: new Date() as any,
    };

    const updatedMessages = [...conversation.messages, userMessage];

    // Build conversation history for OpenAI
    const conversationHistory = buildConversationHistory(coach, updatedMessages);

    // Check if qualification is already complete
    const qualificationData = extractQualificationData({
      ...conversation,
      messages: updatedMessages,
    });

    let assistantResponse: string;

    if (qualificationData.qualificationComplete) {
      // Already qualified - provide a helpful response
      assistantResponse =
        "Thanks for your message! I've passed your information to the coach. Is there anything else I can help you with?";
    } else {
      // Generate AI response
      assistantResponse = await generateChatCompletion(conversationHistory);

      // Check if qualification is now complete
      const assistantMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date() as any,
      };

      const tempMessages = [...updatedMessages, assistantMessage];
      const newQualificationData = extractQualificationData({
        ...conversation,
        messages: tempMessages,
      });

      // If qualification just completed, add the result message
      if (newQualificationData.qualificationComplete) {
        const resultMessage = getQualificationResultMessage(
          newQualificationData.qualified,
          coach
        );
        assistantResponse = resultMessage;
      }
    }

    // Remove QUALIFICATION_COMPLETE marker from response
    const cleanResponse = assistantResponse.replace(/QUALIFICATION_COMPLETE/gi, '').trim();

    // Add assistant message
    const assistantMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: cleanResponse,
      timestamp: new Date() as any,
    };

    const finalMessages = [...updatedMessages, assistantMessage];

    // Extract final qualification data
    const finalQualificationData = extractQualificationData({
      ...conversation,
      messages: finalMessages,
    });

    // Update conversation in Firestore
    await adminDb
      .collection('conversations')
      .doc(conversationId)
      .update({
        messages: finalMessages,
        qualificationCompleted: finalQualificationData.qualificationComplete,
        'metadata.messageCount': finalMessages.length,
        ...(finalQualificationData.qualificationComplete && {
          status: 'completed',
          'metadata.completedAt': new Date(),
        }),
      });

    // If qualification just completed, update lead
    if (finalQualificationData.qualificationComplete) {
      const leadDoc = await adminDb
        .collection('leads')
        .where('conversationId', '==', conversationId)
        .limit(1)
        .get();

      if (!leadDoc.empty) {
        const leadId = leadDoc.docs[0].id;
        await adminDb
          .collection('leads')
          .doc(leadId)
          .update({
            qualified: finalQualificationData.qualified,
            status: finalQualificationData.qualified ? 'qualified' : 'unqualified',
            goalType: finalQualificationData.goalType,
            experienceLevel: finalQualificationData.experienceLevel,
            injuries: finalQualificationData.injuries,
            timeline: finalQualificationData.timeline,
            budgetResponse: finalQualificationData.budgetResponse,
            ...(finalQualificationData.qualified
              ? {}
              : {
                  disqualificationReason:
                    finalQualificationData.timeline?.includes('exploring')
                      ? 'timeline'
                      : 'budget',
                }),
            updatedAt: new Date(),
          });

        // Log analytics event
        await adminDb.collection('analytics').add({
          coachId,
          eventType: finalQualificationData.qualified
            ? 'lead_qualified'
            : 'lead_disqualified',
          data: {
            leadId,
            qualificationData: finalQualificationData,
          },
          timestamp: new Date(),
          date: new Date().toISOString().split('T')[0],
          hour: new Date().getHours(),
          dayOfWeek: new Date().getDay(),
        });
      }
    }

    return NextResponse.json({
      response: cleanResponse,
      qualificationComplete: finalQualificationData.qualificationComplete,
      qualified: finalQualificationData.qualified,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
