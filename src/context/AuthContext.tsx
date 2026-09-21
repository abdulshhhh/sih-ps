'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  onIdTokenChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously, 
  signOut,
  User 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setCookie, destroyCookie } from 'nookies';

export type UserPersona = 'BIDDER' | 'CLIENT' | 'ADMIN';

export interface PersonaProfile {
  role: UserPersona;
  name: string;
  title: string;
  organization: string;
  badge: string;
  initials: string;
  defaultPath: string;
}

export const PERSONA_PROFILES: Record<UserPersona, PersonaProfile> = {
  BIDDER: {
    role: 'BIDDER',
    name: 'TechCorp Solutions',
    title: 'Vendor / Bidder',
    organization: 'TechCorp Solutions Pvt Ltd',
    badge: 'Vendor Portal',
    initials: 'T',
    defaultPath: '/bidder/dashboard',
  },
  CLIENT: {
    role: 'CLIENT',
    name: 'P. Sharma (Officer)',
    title: 'Senior Procurement Officer',
    organization: 'Chennai Petroleum Corporation Ltd (CPCL)',
    badge: 'Procurement Desk',
    initials: 'P',
    defaultPath: '/client/dashboard',
  },
  ADMIN: {
    role: 'ADMIN',
    name: 'System Admin',
    title: 'System Administrator',
    organization: 'GeM Central Control Center',
    badge: 'Control Center',
    initials: 'A',
    defaultPath: '/admin/dashboard',
  },
};

interface AuthContextType {
  user: User | null;
  currentPersona: UserPersona | null;
  profile: PersonaProfile | null;
  loading: boolean;
  loginAs: (persona: UserPersona) => void;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentPersona, setCurrentPersona] = useState<UserPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Detect persona from current pathname if already on a sub-route
    if (pathname.startsWith('/bidder')) {
      setCurrentPersona('BIDDER');
    } else if (pathname.startsWith('/client')) {
      setCurrentPersona('CLIENT');
    } else if (pathname.startsWith('/admin')) {
      setCurrentPersona('ADMIN');
    }
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setCookie(null, 'token', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        });
      } else {
        setUser(null);
        destroyCookie(null, 'token', { path: '/' });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAs = (persona: UserPersona) => {
    setCurrentPersona(persona);
    const profile = PERSONA_PROFILES[persona];
    router.push(profile.defaultPath);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginAsGuest = async () => {
    await signInAnonymously(auth);
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentPersona(null);
    router.push('/');
  };

  const profile = currentPersona ? PERSONA_PROFILES[currentPersona] : null;

  return (
    <AuthContext.Provider value={{ user, currentPersona, profile, loading, loginAs, loginWithEmail, signUpWithEmail, loginWithGoogle, loginAsGuest, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
