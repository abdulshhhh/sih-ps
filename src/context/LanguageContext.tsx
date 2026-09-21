'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import ta from '../locales/ta.json';
import te from '../locales/te.json';
import kn from '../locales/kn.json';
import ml from '../locales/ml.json';
import bn from '../locales/bn.json';
import mr from '../locales/mr.json';

const dictionaries: Record<string, any> = { en, hi, ta, te, kn, ml, bn, mr };

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('language');
    if (stored && dictionaries[stored]) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (newLocale: string) => {
    if (dictionaries[newLocale]) {
      setLocaleState(newLocale);
      localStorage.setItem('language', newLocale);
    }
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value = dictionaries[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (value === undefined) {
      // Fallback to English
      value = dictionaries['en'];
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }
    }

    if (value === undefined) {
      return key; // return key if not found in both
    }

    let str = String(value);
    if (variables) {
      Object.keys(variables).forEach((varKey) => {
        str = str.replace(new RegExp(`{${varKey}}`, 'g'), String(variables[varKey]));
      });
    }

    return str;
  };

  if (!mounted) {
    // Avoid hydration mismatch by rendering default immediately
    return (
      <LanguageContext.Provider value={{ locale: 'en', setLocale, t: (k) => k }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
