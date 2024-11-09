'use client';
import { themes } from '../utils/themeConfig';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('light');
  const [loading, setLoading] = useState(true); // Loading state to prevent theme flickering

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme); // Set the theme from localStorage
    }
    setLoading(false); // Once the theme is set, loading is complete
  }, []);

  useEffect(() => {
    if (!loading) {
      // Remove all themes first
      Object.keys(themes).forEach(theme => {
        document.documentElement.classList.remove(theme);
      });

      // Add the current theme
      document.documentElement.classList.add(currentTheme);
      localStorage.setItem('theme', currentTheme);
    }
  }, [currentTheme, loading]);

  // Don't render anything until loading is complete
  if (loading) return null;

  return <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
