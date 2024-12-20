import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { dict } from '../../utils/dict';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { RefreshCcw } from 'lucide-react';

interface ErrorScreenProps {
  type?: 'main' | 'fullScreen';
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ type = 'fullScreen' }) => {
  const { currentTheme } = useTheme();
  const language = useLanguage();
  const text = dict[language];
  const isFullScreen = type === 'fullScreen';
  const isDarkMode = currentTheme === 'dark';

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={`relative min-h-screen w-full overflow-hidden ${
          isDarkMode ? 'bg-black' : 'bg-sky-100'
        } p-8 transition-colors duration-300`}
      >
        {/* Space background with stars and nebula effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars */}
          <div className="animate-twinkle absolute inset-0">
            {[...Array(200)].map((_, i) => (
              <div
                key={i}
                className={`absolute h-px w-px ${isDarkMode ? 'bg-white' : 'bg-blue-300'}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: isDarkMode ? Math.random() * 0.7 + 0.3 : Math.random() * 0.4 + 0.1,
                  animation: `twinkle ${Math.random() * 3 + 1}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Nebula effect */}
          {isFullScreen ? (
            <>
              <div
                className={`absolute inset-0 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-transparent'
                    : 'bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-transparent'
                }`}
              />
              <div
                className={`absolute inset-0 ${
                  isDarkMode
                    ? 'bg-gradient-to-tl from-indigo-900/20 via-blue-900/20 to-transparent'
                    : 'bg-gradient-to-tl from-purple-200/20 via-blue-100/10 to-transparent'
                }`}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-light-background dark:bg-dark-background" />
              <div className="absolute inset-0 bg-light-background dark:bg-dark-background" />
            </>
          )}
        </div>

        {/* Error Content */}
        <div className="relative mt-12 flex h-full flex-col items-center justify-center backdrop-blur-sm">
          <div className="mb-8 flex flex-col items-center">
            {/* Logo and Text */}
            <div className="mb-2 flex flex-row items-center justify-center">
              <img src={'/logo.png'} alt="Logo" className="mb-2" width={38} height={38} />
              <span className={`ml-2 text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {text.logo}
              </span>
            </div>
            {/* Slogan */}
            <div className={`text-center text-lg font-normal ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {text.slogan}
            </div>
          </div>

          {/* Error Icon and Retry Button */}
          <div className="container mx-auto flex flex-col items-center">
            <div
              className={`relative flex w-full max-w-lg flex-col items-center rounded-xl p-10 shadow-2xl ${
                isDarkMode
                  ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-transparent'
                  : 'bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-transparent'
              } transition-all duration-500`}
            >
              <div className="mb-4 flex items-center justify-center">
                <AiOutlineExclamationCircle
                  className={`text-7xl ${isDarkMode ? 'text-dark-primary' : 'text-light-primary'}`}
                />
              </div>
              <h2 className={`mb-6 text-3xl font-extrabold text-light-primary dark:text-dark-primary`}>
                {text.errorTitle}
              </h2>
              <div className="flex flex-col items-center">
                <p className="text-center text-lg text-gray-600 dark:text-dark-text-primary">{text.errorMessageP1}</p>
                <p className="mb-4 text-center text-lg text-gray-600 dark:text-dark-text-primary">
                  {text.errorMessageP2}
                </p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className={`transiton bg-light-primary" mt-8 rounded-lg px-6 py-2 text-gray-600 duration-300 hover:bg-light-accentPrimary hover:text-white dark:bg-dark-primary dark:text-dark-text-primary dark:hover:bg-dark-accentPrimary`}
            >
              <span className="row flex">
                <RefreshCcw className="mr-2 mt-0.5 h-5 w-5" />
                {text.retry}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
