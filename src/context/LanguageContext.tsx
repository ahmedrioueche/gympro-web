import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { User } from '../utils/types';

const LanguageContext = createContext<string>('en'); // Default value for context

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { user } = useAuth(); // Get user from useAuth hook
  console.log('user in LanguageProvider', user);
  const [language, setLanguage] = useState<string>('en'); // Default to 'en'

  useEffect(() => {
    // Check if user settings language is available
    if (user && (user as User).settings && (user as User).settings?.language) {
      setLanguage((user as User).settings?.language!);
    }
  }, [user]);

  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): string => {
  return useContext(LanguageContext);
};
