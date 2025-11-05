'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Coach } from '@/lib/types/database';
import { getCoach } from '@/lib/firebase/firestore';

interface AuthContextType {
  user: User | null;
  coach: Coach | null;
  loading: boolean;
  error: string | null;
  refreshCoach: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  coach: null,
  loading: true,
  error: null,
  refreshCoach: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCoach = async () => {
    if (user) {
      try {
        const coachData = await getCoach(user.uid);
        setCoach(coachData);
      } catch (err) {
        console.error('Error fetching coach data:', err);
        setError('Failed to load coach data');
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          try {
            // Fetch coach data from Firestore
            const coachData = await getCoach(firebaseUser.uid);
            setCoach(coachData);
            setError(null);
          } catch (err) {
            console.error('Error fetching coach data:', err);
            setError('Failed to load coach data');
          }
        } else {
          setCoach(null);
        }

        setLoading(false);
      },
      (err) => {
        console.error('Auth state change error:', err);
        setError('Authentication error');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, coach, loading, error, refreshCoach }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
