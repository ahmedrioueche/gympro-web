import { lazy, Suspense, useEffect, useState } from "react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaUserCircle,
  FaBars,
  FaClock,
  FaArrowUp,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext"; 
import { dict } from "../../lib/dict"; 
import MobileSidebar from "./MobileSidebar"; 
import logo from "../../assets/icons/logo.png";
import DropdownProfile from "./DropdownProfile";
import gym_guys from "../../assets/animations/gym_guys.json";
import gym_guy_blue from "../../assets/animations/gym_guy_blue.json";
import ChatbotDropdown from "./ChatBot";
import { Bot } from 'lucide-react';
import PlansDropDown from "./PlansDropDown";
import DropdownNotifs from "./DropdownNotifs";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../../context/LanguageContext';

const LottieAnimation = lazy(() => import('../ui/LottieAnimation'));

const AppNavbar = () => {
  const selectedLanguage = useLanguage();
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); 
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isTrialDropDownOpen, setIsTrialDropDownOpen] = useState(false);
  const [isNotifsDropDownOpen, setIsNotifsDropDownOpen] = useState(false);
  const [isMidSizedScreen, setIsMidSizedScreen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMidSizedScreen((window.innerWidth < 1100 && window.innerWidth > 768));
    };

    // Set initial state and add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    setIsDarkMode(currentTheme === "dark");
  }, [currentTheme]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSettings = () => {
    toggleDropdown("settings");
    console.log("Navigating to settings...");
  };

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const user = {
    settings: {
      renderAnimations: false,
    }
  };

  return (
    <nav className="relative z-10 top-0 left-0 w-full shadow-md bg-light-surface dark:bg-dark-surface">
      <div className="max-w-[2000px] w-full mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between font-f1 relative">
          <div className="flex justify-start">
            <div onClick={openMobileSidebar} className="md:hidden text-light-primary dark:text-dark-primary cursor-pointer">
              <FaBars className="mt-1 mr-4" size={24} />
            </div>
            <div className="flex items-center space-x-3">
              <a href="/main/home" className="relative cursor-pointer flex items-center">
                <img
                  src={logo}
                  alt="GymPro Logo"
                  className="h-8 w-8"
                />
                <span className="text-xl ml-2 mt-1 font-f2 text-light-text-primary dark:text-dark-text-primary">
                  {dict[selectedLanguage].logo}
                </span>
              </a>
            </div>
            <button
              className={`hidden md:flex ${isMidSizedScreen ? 'ml-16' : 'ml-28'} px-4 py-2 md:px-5 md:justify-center rounded-md text-sm bg-light-primary dark:bg-dark-primary text-dark-text-primary hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary transition-colors duration-300 items-center group`}
              onClick={() => setIsTrialDropDownOpen(true)}
            >
              {dict[selectedLanguage].freeTrial}
              <span className={`ml-2 transition-transform duration-300 group-hover:rotate-180`}>
                <FaClock className="text-xl group-hover:hidden" />
                <FaArrowUp className="text-xl hidden group-hover:block" />
              </span>
            </button>
            <PlansDropDown 
              isOpen={isTrialDropDownOpen} 
              onClose={() => setIsTrialDropDownOpen(false)}
            />
            {!isMidSizedScreen && user.settings.renderAnimations && (
              <Suspense fallback={null}>
                <LottieAnimation animationData={gym_guy_blue} className="hidden md:block absolute -mt-4 ml-12 h-16 w-20" />
              </Suspense>
            )}
          </div>

          <div className="relative flex items-center space-x-6">
            {!isMidSizedScreen && user.settings.renderAnimations && (
              <Suspense fallback={null}>
                <LottieAnimation animationData={gym_guys} className="absolute -mt-10 md:-ml-28 -ml-16 h-20 w-20" />
              </Suspense>
            )}
            <button
              className="hidden md:flex px-4 py-2 md:px-5 md:justify-center rounded-md text-sm bg-light-primary dark:bg-dark-primary text-dark-text-primary hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary transition-colors duration-300 items-center group"
              onClick={() => setIsChatbotOpen(true)}
            >
              <Bot className="text-xl mr-2 -mt-1" />
              {dict[selectedLanguage].chatbot}
              <span className={`transition-transform duration-300 group-hover:rotate-180`}></span>
            </button>
          
            <ChatbotDropdown 
              isOpen={isChatbotOpen} 
              onClose={() => setIsChatbotOpen(false)} 
            />

            <div onClick={() => navigate('/main/feedback')} className="hidden md:block text-base dark:text-dark-text-secondary text-light-text-secondary hover:cursor-pointer transition duration-300 px-4 py-2 rounded-lg border border-transparent hover:border-light-text-primary hover:text-light-text-primary dark:hover:text-dark-text-primary dark:hover:border-dark-text-primary">
              {dict[selectedLanguage].feedback}
            </div>

            <button
              onClick={() => setIsNotifsDropDownOpen(true)}
              className="hidden md:inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
            >
              <FaBell size={20} />
            </button>

            <button
              onClick={() => setCurrentTheme(isDarkMode ? 'light' : 'dark')}
              className="p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary transition-colors duration-300"
            >
              {isDarkMode ? (
                <FaSun size={20} title={dict[selectedLanguage].switchToLightMode} />
              ) : (
                <FaMoon size={20} title={dict[selectedLanguage].switchToDarkMode} />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("profile")}
                className="inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
              >
                <FaUserCircle size={20} />
              </button>
              
              <div className="absolute right-0">
                <DropdownProfile
                  isOpen={activeDropdown === "profile"}
                  onClose={() => toggleDropdown("profile")}
                  onOpenChatBotDropDown={() => setIsChatbotOpen(true)}
                  onOpenPlansDropDown={() => setIsTrialDropDownOpen(true)}
                />  
              </div>
            </div>
          </div>
        </div>
      </div>
      <DropdownNotifs 
        isOpen={isNotifsDropDownOpen} 
        onClose={() => setIsNotifsDropDownOpen(false)}
      />
         
      <MobileSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}  
      />
    </nav>
  );
};

export default AppNavbar;
