import type { Coach, Conversation, Message } from '@/lib/types/database';

/**
 * Build the system prompt for the AI assistant
 */
export function buildSystemPrompt(coach: Coach): string {
  const businessName = coach.businessName;
  const niche = coach.niche || 'fitness coaching';
  const pricing = `$${coach.pricing.amount}/${coach.pricing.billingPeriod}`;

  return `You are a friendly AI assistant for ${businessName}, a ${niche} coach.

Your job is to qualify leads by asking these questions in a natural, conversational way:

1. What's their main fitness goal?
   - Options: Lose weight, Build muscle, Get stronger, Improve athletic performance, General health/wellness, Other

2. How much experience do they have with structured training programs?
   - Options: Complete beginner, Some experience (1-2 years), Experienced (3+ years), Very experienced athlete

3. Do they have any injuries or limitations?
   - Ask them to describe if yes

4. What's their timeline to get started?
   - Options: ASAP (this week), Within 2 weeks, Within a month, Just exploring for now

5. Budget fit: "${businessName}'s coaching starts at ${pricing}. Does this fit your budget?"
   - Options: Yes that works, Need to know more first, That's more than I expected

IMPORTANT INSTRUCTIONS:
- Be conversational and friendly, not robotic
- Ask ONE question at a time
- Acknowledge their answers warmly ("Got it!", "That's great!", "Thanks for sharing")
- If they mention injuries, be empathetic: "Thanks for letting me know. ${businessName} will review this carefully."
- Don't rush through questions - make it feel like a real conversation
- If someone asks a question, answer it briefly before continuing qualification
- Keep responses under 100 words

Once you've collected all 5 pieces of information, your next response should include the phrase "QUALIFICATION_COMPLETE" at the very end (after your message to the user).

Example flow:
User: "Hi, I want to get in shape"
You: "Hey! Great to meet you! So you want to get in shape - that's awesome. Can you tell me more about your specific goal? Are you looking to lose weight, build muscle, get stronger, improve athletic performance, or just general health and wellness?"

User: "I want to lose about 20 pounds"
You: "Got it! Losing 20 pounds is a solid goal. How much experience do you have with structured training programs? Are you a complete beginner, have some experience, or have you been training for a while?"

Continue naturally until all questions are answered.`;
}

/**
 * Analyze conversation to extract qualification data
 */
export function extractQualificationData(conversation: Conversation): {
  goalType?: string;
  experienceLevel?: string;
  injuries?: string;
  timeline?: string;
  budgetResponse?: string;
  qualified: boolean;
  qualificationComplete: boolean;
} {
  const messages = conversation.messages;
  const userMessages = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.toLowerCase());
  const assistantMessages = messages
    .filter((m) => m.role === 'assistant')
    .map((m) => m.content.toLowerCase());

  let goalType: string | undefined;
  let experienceLevel: string | undefined;
  let injuries: string | undefined;
  let timeline: string | undefined;
  let budgetResponse: string | undefined;

  // Check for qualification complete signal
  const qualificationComplete = assistantMessages.some((msg) =>
    msg.includes('qualification_complete')
  );

  // Extract goal type
  const goalKeywords = {
    'lose weight': ['lose', 'weight', 'fat', 'slim', 'drop pounds'],
    'build muscle': ['build', 'muscle', 'gain', 'bulk', 'mass'],
    'get stronger': ['strong', 'strength', 'power', 'lift'],
    'improve athletic performance': ['athletic', 'performance', 'sport', 'compete'],
    'general health': ['health', 'wellness', 'fit', 'shape', 'healthy'],
  };

  for (const [goal, keywords] of Object.entries(goalKeywords)) {
    if (userMessages.some((msg) => keywords.some((kw) => msg.includes(kw)))) {
      goalType = goal;
      break;
    }
  }

  // Extract experience level
  if (userMessages.some((msg) => msg.includes('beginner') || msg.includes('never'))) {
    experienceLevel = 'Complete beginner';
  } else if (
    userMessages.some((msg) => msg.includes('experienced') || msg.includes('years'))
  ) {
    experienceLevel = 'Experienced (3+ years)';
  } else if (userMessages.some((msg) => msg.includes('some') || msg.includes('bit'))) {
    experienceLevel = 'Some experience (1-2 years)';
  }

  // Extract injuries
  if (
    userMessages.some(
      (msg) =>
        msg.includes('injury') ||
        msg.includes('hurt') ||
        msg.includes('pain') ||
        msg.includes('injured')
    )
  ) {
    const injuryMessage = messages.find(
      (m) =>
        m.role === 'user' &&
        (m.content.toLowerCase().includes('injury') ||
          m.content.toLowerCase().includes('hurt') ||
          m.content.toLowerCase().includes('pain'))
    );
    injuries = injuryMessage?.content || 'Yes (details in conversation)';
  } else if (
    userMessages.some((msg) => msg.includes('no') && msg.includes('injury'))
  ) {
    injuries = 'No current injuries';
  }

  // Extract timeline
  if (
    userMessages.some((msg) => msg.includes('asap') || msg.includes('now') || msg.includes('today'))
  ) {
    timeline = 'ASAP (this week)';
  } else if (userMessages.some((msg) => msg.includes('week'))) {
    timeline = 'Within 2 weeks';
  } else if (userMessages.some((msg) => msg.includes('month'))) {
    timeline = 'Within a month';
  } else if (
    userMessages.some((msg) => msg.includes('exploring') || msg.includes('not sure'))
  ) {
    timeline = 'Just exploring for now';
  }

  // Extract budget response
  if (userMessages.some((msg) => msg.includes('yes') && msg.includes('budget'))) {
    budgetResponse = 'Yes, that works';
  } else if (
    userMessages.some(
      (msg) => msg.includes('more') && (msg.includes('info') || msg.includes('know'))
    )
  ) {
    budgetResponse = 'Need to know more first';
  } else if (
    userMessages.some(
      (msg) =>
        msg.includes('expensive') ||
        msg.includes('much') ||
        msg.includes('more than expected')
    )
  ) {
    budgetResponse = "That's more than I expected";
  }

  // Determine if qualified
  const qualified = determineQualification(timeline, budgetResponse);

  return {
    goalType,
    experienceLevel,
    injuries,
    timeline,
    budgetResponse,
    qualified,
    qualificationComplete,
  };
}

/**
 * Determine if a lead is qualified based on criteria
 */
export function determineQualification(
  timeline?: string,
  budgetResponse?: string
): boolean {
  // Qualified if:
  // - Timeline is within a month (not "just exploring")
  // - Budget response is positive (not "more than expected")

  const timelineQualified =
    timeline &&
    !timeline.toLowerCase().includes('exploring') &&
    !timeline.toLowerCase().includes('not sure');

  const budgetQualified =
    budgetResponse &&
    (budgetResponse.toLowerCase().includes('yes') ||
      budgetResponse.toLowerCase().includes('need to know more'));

  return !!(timelineQualified && budgetQualified);
}

/**
 * Generate the next message based on qualification status
 */
export function getQualificationResultMessage(
  qualified: boolean,
  coach: Coach
): string {
  if (qualified) {
    return `Awesome! You sound like a great fit for ${coach.businessName}'s program. I'd love to get you on a quick 15-minute call to discuss your goals in detail.

Before we schedule, I'll send you a short video that explains exactly how the program works and what to expect. Sound good?

Let me get you booked in! QUALIFICATION_COMPLETE`;
  } else {
    return `Thanks so much for your interest in ${coach.businessName}'s program! It sounds like you might not be quite ready to commit just yet, and that's totally okay.

I'm going to add you to ${coach.businessName}'s email list where you'll get free training tips, success stories, and helpful resources. When you're ready to take the next step, you can book a call anytime!

Is there anything else I can help you with today? QUALIFICATION_COMPLETE`;
  }
}

/**
 * Build conversation history for OpenAI
 */
export function buildConversationHistory(
  coach: Coach,
  messages: Message[]
): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
  const systemPrompt = buildSystemPrompt(coach);

  const history: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ];

  // Add conversation messages
  for (const message of messages) {
    if (message.role === 'user' || message.role === 'assistant') {
      history.push({
        role: message.role,
        content: message.content,
      });
    }
  }

  return history;
}
