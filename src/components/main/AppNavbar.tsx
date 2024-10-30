import { useEffect, useState } from "react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaCog,
  FaUserCircle,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext"; 
import { dict } from "../../lib/dict"; 
import MobileSidebar from "./MobileSidebar"; 
import logo from "../../assets/icons/logo.png";

const AppNavbar = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); 
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const selectedLanguage = "english";

  useEffect(() => {
    setIsDarkMode(currentTheme === "dark");
  }, [currentTheme])

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

  return (
    <nav className="relative z-10 top-0 left-0 w-full shadow-md bg-light-surface dark:bg-dark-surface">
      <div className="max-w-[2000px] w-full mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between font-f1">
          <div className="flex justify-start">
            <div onClick={openMobileSidebar} className="md:hidden text-light-primary dark:text-dark-primary cursor-pointer">
             <FaBars className="mt-1 mr-4" size={24}/>
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
          </div>

            <div className="flex items-center space-x-6">            
              <button
                onClick={() => toggleDropdown("notifications")}
                className="hidden md:inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
              >
                <FaBell size={20}/>
              </button>

              <button
                onClick={handleSettings}
                className="hidden md:inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
              >
                <FaCog size={20}/>
              </button> 

              <button
                onClick={() => setCurrentTheme(isDarkMode? 'light' : 'dark')}
                className="p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary transition-colors duration-300"
              >
                {isDarkMode ? (
                  <FaSun size={20} title="Switch to Light Mode" />
                ) : (
                  <FaMoon size={20} title="Switch to Dark Mode" />
                )}
              </button>
              <button
                onClick={() => toggleDropdown("profile")}
                className="hidden md:inline-block p-2 rounded-md bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary transition-colors duration-300"
              >
                <FaUserCircle size={20}/>
              </button>         
            </div>
        </div>
      </div>
      <MobileSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}  
      />
    </nav>
  );
};

export default AppNavbar;