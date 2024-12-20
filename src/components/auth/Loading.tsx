'use client';

import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { dict } from '../../utils/dict';
import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Loading: React.FC = () => {
  const selectedLanguage = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    handleUserRouting();
  }, []);

  const handleUserRouting = () => {
    const isUserDetailsFilled = true;
    if (isUserDetailsFilled) {
      navigate('/main/home');
    } else {
      navigate('/auth/details');
    }
  };

  useEffect(() => {
    setIsDarkMode(currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <section
      className={`flex min-h-screen items-center justify-center py-20 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      } transition-colors duration-300`}
    >
      <div className="container mx-auto flex flex-col items-center">
        <div
          className={`relative flex w-full max-w-lg flex-col items-center rounded-xl p-10 shadow-2xl ${
            isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
          } transition-all duration-500`}
        >
          <div className="mb-8 flex items-center justify-center">
            <AiOutlineLoading3Quarters
              className={`animate-spin text-7xl ${isDarkMode ? 'text-dark-primary' : 'text-light-primary'}`}
            />
          </div>
          <h2
            className={`mb-6 text-3xl font-extrabold ${
              isDarkMode
                ? 'bg-gradient-to-r from-dark-primary to-dark-secondary'
                : 'bg-gradient-to-r from-light-primary to-light-secondary'
            } bg-clip-text text-transparent`}
          >
            {dict[selectedLanguage].loading}
          </h2>
          <p className="text-center text-lg">{dict[selectedLanguage].loadingText}</p>
        </div>
        <div className="mt-10 flex items-center space-x-2 text-sm text-gray-500">
          <AiOutlineCheckCircle
            className={`${isDarkMode ? 'text-light-secondary' : 'text-dark-secondary'} transition-colors duration-300`}
          />
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{dict[selectedLanguage].thanks}</span>
        </div>
      </div>
    </section>
  );
};

export default Loading;
