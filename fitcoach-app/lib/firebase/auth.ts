import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './config';
import { createCoach } from './firestore';
import type { CreateCoachInput } from '@/lib/types/database';

const googleProvider = new GoogleAuthProvider();

/**
 * Sign up a new coach with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
  businessName: string
): Promise<User> {
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: fullName,
    });

    // Send email verification
    await sendEmailVerification(user);

    // Create coach document in Firestore
    const coachData: CreateCoachInput = {
      email,
      fullName,
      businessName,
      pricing: {
        currency: 'USD',
        amount: 350,
        billingPeriod: 'monthly',
      },
      qualificationCriteria: {
        budgetRequired: true,
        timelineOptions: ['ASAP', 'Within 2 weeks', 'Within a month'],
      },
      widgetSettings: {
        primaryColor: '#3B82F6',
        position: 'bottom-right',
        welcomeMessage: `Hi! I'm ${businessName}'s AI assistant. Ready for a few quick questions?`,
      },
      emailSettings: {
        fromName: businessName,
        replyToEmail: email,
      },
      subscription: {
        status: 'trialing',
        plan: 'starter',
      },
      usage: {
        leadsThisMonth: 0,
        leadsLimit: 100,
      },
    };

    await createCoach(user.uid, coachData);

    return user;
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw new Error(error.message || 'Failed to sign up');
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if coach document exists, if not create one
    const { getCoach } = await import('./firestore');
    const existingCoach = await getCoach(user.uid);

    if (!existingCoach) {
      const coachData: CreateCoachInput = {
        email: user.email!,
        fullName: user.displayName || 'New Coach',
        businessName: user.displayName || 'My Coaching Business',
        pricing: {
          currency: 'USD',
          amount: 350,
          billingPeriod: 'monthly',
        },
        qualificationCriteria: {
          budgetRequired: true,
          timelineOptions: ['ASAP', 'Within 2 weeks', 'Within a month'],
        },
        widgetSettings: {
          primaryColor: '#3B82F6',
          position: 'bottom-right',
          welcomeMessage: `Hi! I'm your AI assistant. Ready for a few quick questions?`,
        },
        emailSettings: {
          fromName: user.displayName || 'Coach',
          replyToEmail: user.email!,
        },
        subscription: {
          status: 'trialing',
          plan: 'starter',
        },
        usage: {
          leadsThisMonth: 0,
          leadsLimit: 100,
        },
      };

      await createCoach(user.uid, coachData);
    }

    return user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
}

/**
 * Sign out the current user
 */
export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    throw new Error(error.message || 'Failed to send password reset email');
  }
}

/**
 * Resend email verification
 */
export async function resendVerificationEmail(): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently signed in');
    }

    await sendEmailVerification(user);
  } catch (error: any) {
    console.error('Error sending verification email:', error);
    throw new Error(error.message || 'Failed to send verification email');
  }
}

/**
 * Get the current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
