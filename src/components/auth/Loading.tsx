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

  const { user } = useAuth();
  console.log('user in loading', user);

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
      className={`py-20 flex items-center justify-center min-h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      } transition-colors duration-300`}
    >
      <div className="container mx-auto flex flex-col items-center">
        <div
          className={`relative w-full max-w-lg flex flex-col items-center rounded-xl shadow-2xl p-10 ${
            isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
          } transition-all duration-500`}
        >
          <div className="flex items-center justify-center mb-8">
            <AiOutlineLoading3Quarters
              className={`text-7xl animate-spin ${isDarkMode ? 'text-dark-primary' : 'text-light-primary'}`}
            />
          </div>
          <h2
            className={`text-3xl font-extrabold mb-6 ${
              isDarkMode
                ? 'bg-gradient-to-r from-dark-primary to-dark-secondary'
                : 'bg-gradient-to-r from-light-primary to-light-secondary'
            } text-transparent bg-clip-text`}
          >
            {dict[selectedLanguage].loading}
          </h2>
          <p className="text-lg text-center">{dict[selectedLanguage].loadingText}</p>
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
