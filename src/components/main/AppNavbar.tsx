import { lazy, Suspense, useEffect, useState } from 'react';
import { FaMoon, FaSun, FaBell, FaUserCircle, FaBars, FaClock, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { dict } from '../../utils/dict';
import MobileSidebar from './MobileSidebar';
import logo from '../../assets/icons/logo.png';
import DropdownProfile from './DropdownProfile';
import gym_guys from '../../assets/animations/gym_guys.json';
import ChatbotDropdown from './ChatBot';
import { Bot } from 'lucide-react';
import PlansDropDown from './PlansDropDown';
import DropdownNotifs from './DropdownNotifs';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getRandomNumber } from '../../utils/helper';

const LottieAnimation = lazy(() => import('../ui/LottieAnimation'));

const AppNavbar = () => {
  const selectedLanguage = useLanguage();
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isTrialDropDownOpen, setIsTrialDropDownOpen] = useState(false);
  const [isNotifsDropDownOpen, setIsNotifsDropDownOpen] = useState(false);
  const [isMidSizedScreen, setIsMidSizedScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMidSizedScreen(window.innerWidth < 1100 && window.innerWidth > 768);
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Set initial state and add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    setIsDarkMode(currentTheme === 'dark');
  }, [currentTheme]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSettings = () => {
    toggleDropdown('settings');
    console.log('Navigating to settings...');
  };

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const user = {
    settings: {
      renderAnimations: true,
    },
  };

  return (
    <nav className="relative left-0 top-0 z-10 w-full bg-light-surface shadow-md dark:bg-dark-surface">
      <div className="mx-auto w-full max-w-[2000px] px-4 py-4 md:px-6">
        <div className="relative flex items-center justify-between font-f1">
          <div className="flex justify-start">
            <div
              onClick={openMobileSidebar}
              className="cursor-pointer text-light-primary dark:text-dark-primary md:hidden"
            >
              <FaBars className="mr-4 mt-1" size={24} />
            </div>
            <div className="flex items-center space-x-3">
              <a href="/main/home" className="relative flex cursor-pointer items-center">
                <img src={logo} alt="GymPro Logo" className="h-8 w-8" />
                <span className="ml-2 mt-1 font-f2 text-xl text-light-text-primary dark:text-dark-text-primary">
                  {dict[selectedLanguage].logo}
                </span>
              </a>
            </div>
            <button
              className={`hidden md:flex ${isMidSizedScreen ? 'ml-16' : 'ml-28'} group items-center rounded-md bg-light-primary px-4 py-2 text-sm text-dark-text-primary transition-colors duration-300 hover:bg-light-accentPrimary dark:bg-dark-primary dark:hover:bg-dark-accentPrimary md:justify-center md:px-5`}
              onClick={() => setIsTrialDropDownOpen(true)}
            >
              {dict[selectedLanguage].freeTrial}
              <span className={`ml-2 transition-transform duration-300 group-hover:rotate-180`}>
                <FaClock className="text-xl group-hover:hidden" />
                <FaArrowUp className="hidden text-xl group-hover:block" />
              </span>
            </button>
            <PlansDropDown isOpen={isTrialDropDownOpen} onClose={() => setIsTrialDropDownOpen(false)} />
          </div>

          <div className="relative flex items-center space-x-6">
            {user.settings.renderAnimations && !isMidSizedScreen && (
              <Suspense fallback={null}>
                <LottieAnimation animationData={gym_guys} className="absolute -ml-16 -mt-10 h-20 w-20 md:-ml-28" />
              </Suspense>
            )}
            <button
              className="group hidden items-center rounded-md bg-light-primary px-4 py-2 text-sm text-dark-text-primary transition-colors duration-300 hover:bg-light-accentPrimary dark:bg-dark-primary dark:hover:bg-dark-accentPrimary md:flex md:justify-center md:px-5"
              onClick={() => setIsChatbotOpen(true)}
            >
              <Bot className="-mt-1 mr-2 text-xl" />
              {dict[selectedLanguage].chatbot}
              <span className={`transition-transform duration-300 group-hover:rotate-180`}></span>
            </button>

            <ChatbotDropdown isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

            <div
              onClick={() => navigate('/main/feedback')}
              className="hidden rounded-lg border border-transparent px-4 py-2 text-base text-light-text-secondary transition duration-300 hover:cursor-pointer hover:border-light-text-primary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:border-dark-text-primary dark:hover:text-dark-text-primary md:block"
            >
              {dict[selectedLanguage].feedback}
            </div>

            <button
              onClick={() => setIsNotifsDropDownOpen(true)}
              className="hidden rounded-md bg-light-surface p-2 text-light-text-primary transition-colors duration-300 hover:bg-light-primary hover:text-dark-text-primary dark:bg-dark-surface dark:text-dark-text-primary dark:hover:bg-dark-primary md:inline-block"
            >
              <FaBell size={20} />
            </button>

            <button
              onClick={() => setCurrentTheme(isDarkMode ? 'light' : 'dark')}
              className="rounded-md bg-light-surface p-2 text-light-text-primary transition-colors duration-300 hover:bg-light-primary hover:text-dark-text-primary dark:bg-dark-surface dark:text-dark-text-primary dark:hover:bg-dark-primary"
            >
              {isDarkMode ? (
                <FaSun size={20} title={dict[selectedLanguage].switchToLightMode} />
              ) : (
                <FaMoon size={20} title={dict[selectedLanguage].switchToDarkMode} />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('profile')}
                className="inline-block rounded-md bg-light-surface p-2 text-light-text-primary transition-colors duration-300 hover:bg-light-primary hover:text-dark-text-primary dark:bg-dark-surface dark:text-dark-text-primary dark:hover:bg-dark-primary"
              >
                <FaUserCircle size={20} />
              </button>

              <div className="absolute right-0">
                <DropdownProfile
                  isOpen={activeDropdown === 'profile'}
                  onClose={() => toggleDropdown('profile')}
                  onOpenChatBotDropDown={() => setIsChatbotOpen(true)}
                  onOpenPlansDropDown={() => setIsTrialDropDownOpen(true)}
                  onOpenNotifDropdown={() => setIsNotifsDropDownOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DropdownNotifs isOpen={isNotifsDropDownOpen} onClose={() => setIsNotifsDropDownOpen(false)} />

      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </nav>
  );
};

export default AppNavbar;
