import { Timestamp } from 'firebase/firestore';

/**
 * Database Types for FitCoach AI Assistant
 * Based on PRD Section 7: Database Schema
 */

// ==================== COACHES ====================
export interface Coach {
  id: string;
  email: string;
  fullName: string;
  businessName: string;
  phoneNumber?: string;
  websiteUrl?: string;
  niche?: string;
  pricing: {
    currency: string;
    amount: number;
    billingPeriod: 'monthly' | 'weekly';
  };
  targetClient?: string;
  qualificationCriteria: {
    budgetRequired: boolean;
    timelineOptions: string[];
  };
  calendarIntegration?: {
    type: 'calendly' | 'cal.com';
    url: string;
    webhookId?: string;
  };
  widgetSettings: {
    primaryColor: string;
    position: 'bottom-right' | 'bottom-left';
    welcomeMessage: string;
    avatarUrl?: string;
  };
  emailSettings: {
    fromName: string;
    replyToEmail: string;
    introVideoUrl?: string;
    intakeFormUrl?: string;
  };
  subscription: {
    stripeCustomerId?: string;
    status: 'trialing' | 'active' | 'past_due' | 'canceled';
    plan: 'starter' | 'pro';
    trialEndsAt?: Timestamp;
    currentPeriodEnd?: Timestamp;
  };
  usage: {
    leadsThisMonth: number;
    leadsLimit: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==================== LEADS ====================
export interface Lead {
  id: string;
  coachId: string;

  // Contact info
  name?: string;
  email?: string;
  phoneNumber?: string;

  // Qualification data
  goalType?: string;
  experienceLevel?: string;
  injuries?: string;
  timeline?: string;
  budgetResponse?: string;

  // Status
  qualified: boolean;
  status: 'new' | 'qualified' | 'unqualified' | 'booked' | 'contacted' | 'converted' | 'lost';
  disqualificationReason?: 'budget' | 'timeline' | 'other';

  // Booking info
  bookingDetails?: {
    scheduledAt: Timestamp;
    calendlyEventId?: string;
    meetingUrl?: string;
  };

  // Metadata
  conversationId: string;
  source?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastContactedAt?: Timestamp;

  // Coach notes
  notes?: string;
  flaggedForFollowUp: boolean;
}

// ==================== CONVERSATIONS ====================
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Timestamp;
}

export interface Conversation {
  id: string;
  coachId: string;
  leadId: string;
  messages: Message[];
  status: 'active' | 'completed' | 'abandoned';
  qualificationCompleted: boolean;
  metadata: {
    startedAt: Timestamp;
    completedAt?: Timestamp;
    messageCount: number;
    averageResponseTime?: number;
  };
}

// ==================== ANALYTICS ====================
export type AnalyticsEventType =
  | 'widget_loaded'
  | 'conversation_started'
  | 'conversation_completed'
  | 'lead_qualified'
  | 'lead_disqualified'
  | 'booking_made'
  | 'email_sent';

export interface AnalyticsEvent {
  id: string;
  coachId: string;
  eventType: AnalyticsEventType;
  data: Record<string, any>;
  timestamp: Timestamp;
  date: string; // Format: "2025-11-05"
  hour: number; // 0-23
  dayOfWeek: number; // 0-6
}

// ==================== INPUT TYPES (for creating documents) ====================
export type CreateCoachInput = Omit<Coach, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCoachInput = Partial<Omit<Coach, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateLeadInput = Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLeadInput = Partial<Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateConversationInput = Omit<Conversation, 'id'>;
export type UpdateConversationInput = Partial<Omit<Conversation, 'id'>>;
