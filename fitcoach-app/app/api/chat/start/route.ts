import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import type { Coach } from '@/lib/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coachId, source } = body;

    // Validate required fields
    if (!coachId) {
      return NextResponse.json(
        { error: 'Missing coachId' },
        { status: 400 }
      );
    }

    // Fetch coach data
    const coachDoc = await adminDb.collection('coaches').doc(coachId).get();
    if (!coachDoc.exists) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
    }
    const coach = { id: coachDoc.id, ...coachDoc.data() } as Coach;

    // Create new lead
    const leadRef = await adminDb.collection('leads').add({
      coachId,
      qualified: false,
      status: 'new',
      source: source || 'widget',
      flaggedForFollowUp: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const leadId = leadRef.id;

    // Create new conversation
    const conversationRef = await adminDb.collection('conversations').add({
      coachId,
      leadId,
      messages: [],
      status: 'active',
      qualificationCompleted: false,
      metadata: {
        startedAt: new Date(),
        messageCount: 0,
      },
    });

    const conversationId = conversationRef.id;

    // Update lead with conversationId
    await leadRef.update({
      conversationId,
    });

    // Add initial greeting message
    const welcomeMessage = coach.widgetSettings.welcomeMessage;

    const greetingMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date(),
    };

    await conversationRef.update({
      messages: [greetingMessage],
      'metadata.messageCount': 1,
    });

    // Log analytics event
    await adminDb.collection('analytics').add({
      coachId,
      eventType: 'conversation_started',
      data: {
        leadId,
        conversationId,
        source: source || 'widget',
      },
      timestamp: new Date(),
      date: new Date().toISOString().split('T')[0],
      hour: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
    });

    // Increment coach's lead count
    await adminDb
      .collection('coaches')
      .doc(coachId)
      .update({
        'usage.leadsThisMonth': (coach.usage.leadsThisMonth || 0) + 1,
      });

    return NextResponse.json({
      conversationId,
      leadId,
      welcomeMessage,
    });
  } catch (error) {
    console.error('Start conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to start conversation' },
      { status: 500 }
    );
  }
}
