import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  WhereFilterOp,
  DocumentData,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from './config';
import type {
  Coach,
  Lead,
  Conversation,
  AnalyticsEvent,
  CreateCoachInput,
  UpdateCoachInput,
  CreateLeadInput,
  UpdateLeadInput,
} from '@/lib/types/database';

// ==================== COLLECTION REFERENCES ====================
export const collections = {
  coaches: 'coaches',
  leads: 'leads',
  conversations: 'conversations',
  analytics: 'analytics',
} as const;

// ==================== COACHES ====================

export async function createCoach(
  coachId: string,
  data: CreateCoachInput
): Promise<void> {
  const coachRef = doc(db, collections.coaches, coachId);
  await setDoc(coachRef, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function getCoach(coachId: string): Promise<Coach | null> {
  const coachRef = doc(db, collections.coaches, coachId);
  const coachSnap = await getDoc(coachRef);

  if (!coachSnap.exists()) {
    return null;
  }

  return { id: coachSnap.id, ...coachSnap.data() } as Coach;
}

export async function updateCoach(
  coachId: string,
  data: UpdateCoachInput
): Promise<void> {
  const coachRef = doc(db, collections.coaches, coachId);
  await updateDoc(coachRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteCoach(coachId: string): Promise<void> {
  const coachRef = doc(db, collections.coaches, coachId);
  await deleteDoc(coachRef);
}

// ==================== LEADS ====================

export async function createLead(data: CreateLeadInput): Promise<string> {
  const leadsRef = collection(db, collections.leads);
  const docRef = await addDoc(leadsRef, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getLead(leadId: string): Promise<Lead | null> {
  const leadRef = doc(db, collections.leads, leadId);
  const leadSnap = await getDoc(leadRef);

  if (!leadSnap.exists()) {
    return null;
  }

  return { id: leadSnap.id, ...leadSnap.data() } as Lead;
}

export async function updateLead(
  leadId: string,
  data: UpdateLeadInput
): Promise<void> {
  const leadRef = doc(db, collections.leads, leadId);
  await updateDoc(leadRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function getLeadsByCoach(
  coachId: string,
  limitCount?: number
): Promise<Lead[]> {
  const leadsRef = collection(db, collections.leads);
  let q = query(
    leadsRef,
    where('coachId', '==', coachId),
    orderBy('createdAt', 'desc')
  );

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Lead)
  );
}

export async function getQualifiedLeadsByCoach(
  coachId: string
): Promise<Lead[]> {
  const leadsRef = collection(db, collections.leads);
  const q = query(
    leadsRef,
    where('coachId', '==', coachId),
    where('qualified', '==', true),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Lead)
  );
}

// ==================== CONVERSATIONS ====================

export async function createConversation(data: {
  coachId: string;
  leadId: string;
}): Promise<string> {
  const conversationsRef = collection(db, collections.conversations);
  const docRef = await addDoc(conversationsRef, {
    ...data,
    messages: [],
    status: 'active',
    qualificationCompleted: false,
    metadata: {
      startedAt: Timestamp.now(),
      messageCount: 0,
    },
  });
  return docRef.id;
}

export async function getConversation(
  conversationId: string
): Promise<Conversation | null> {
  const conversationRef = doc(db, collections.conversations, conversationId);
  const conversationSnap = await getDoc(conversationRef);

  if (!conversationSnap.exists()) {
    return null;
  }

  return {
    id: conversationSnap.id,
    ...conversationSnap.data(),
  } as Conversation;
}

export async function addMessageToConversation(
  conversationId: string,
  message: {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }
): Promise<void> {
  const conversation = await getConversation(conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const newMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...message,
    timestamp: Timestamp.now(),
  };

  const conversationRef = doc(db, collections.conversations, conversationId);
  await updateDoc(conversationRef, {
    messages: [...conversation.messages, newMessage],
    'metadata.messageCount': conversation.metadata.messageCount + 1,
  });
}

export async function getConversationsByCoach(
  coachId: string,
  limitCount?: number
): Promise<Conversation[]> {
  const conversationsRef = collection(db, collections.conversations);
  let q = query(
    conversationsRef,
    where('coachId', '==', coachId),
    orderBy('metadata.startedAt', 'desc')
  );

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Conversation)
  );
}

// ==================== ANALYTICS ====================

export async function logAnalyticsEvent(data: {
  coachId: string;
  eventType: AnalyticsEvent['eventType'];
  data: Record<string, any>;
}): Promise<string> {
  const now = new Date();
  const analyticsRef = collection(db, collections.analytics);

  const docRef = await addDoc(analyticsRef, {
    ...data,
    timestamp: Timestamp.now(),
    date: now.toISOString().split('T')[0], // "2025-11-05"
    hour: now.getHours(),
    dayOfWeek: now.getDay(),
  });

  return docRef.id;
}

export async function getAnalyticsByCoach(
  coachId: string,
  startDate?: Date,
  endDate?: Date
): Promise<AnalyticsEvent[]> {
  const analyticsRef = collection(db, collections.analytics);
  let q = query(
    analyticsRef,
    where('coachId', '==', coachId),
    orderBy('timestamp', 'desc')
  );

  if (startDate) {
    q = query(q, where('timestamp', '>=', Timestamp.fromDate(startDate)));
  }

  if (endDate) {
    q = query(q, where('timestamp', '<=', Timestamp.fromDate(endDate)));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as AnalyticsEvent)
  );
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Generic query builder for any collection
 */
export async function queryCollection<T extends DocumentData>(
  collectionName: string,
  filters: Array<{
    field: string;
    operator: WhereFilterOp;
    value: any;
  }>,
  orderByField?: string,
  limitCount?: number
): Promise<T[]> {
  const collectionRef = collection(db, collectionName);
  let q = query(collectionRef);

  // Apply filters
  filters.forEach(({ field, operator, value }) => {
    q = query(q, where(field, operator, value));
  });

  // Apply ordering
  if (orderByField) {
    q = query(q, orderBy(orderByField, 'desc'));
  }

  // Apply limit
  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as T)
  );
}
