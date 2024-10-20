import { useEffect, useRef, useState } from "react";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaHome,
  FaPhone,
  FaAppStore,
  FaSignInAlt,
  FaUserPlus,
  FaSpinner,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/icons/logo.png"; 
import { dict } from "../../lib/dict";

const Navbar = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const selectedLanguage = "english";

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link);
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    setIsDarkMode(currentTheme === "dark");
  }, [currentTheme])

  useEffect(() => {
    const handleClickOutside = (event : any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevOpen) => !prevOpen);
  };

  const handleLogin = () => {
    setIsLoginLoading(true);
    // Replace with the appropriate navigation logic for your React app
    window.location.href = "/auth/login";
  };

  const handleSignup = () => {
    setIsSignupLoading(true);
    // Replace with the appropriate navigation logic for your React app
    window.location.href = "/auth/signup";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed z-50 top-0 left-0 w-full py-4 px-6 ${isScrolled? 'bg-light-background dark:bg-dark-background' : 'bg-opacity-60'}`}>
      <div className="container mx-auto flex items-center justify-between font-f1">
        <div className="text-3xl font-bold">
          <a href="/" className="relative cursor-pointer flex flex-row items-center">
            <img src={logo} alt={dict[selectedLanguage].logoAlt} className="h-8" />
            <span className={`text-xl ml-2 mt-1 font-f2 text-light-text-primary dark:text-dark-text-primary ${!isScrolled? 'text-white' : ''}`}>
              {dict[selectedLanguage].logo}
            </span>
          </a>
        </div>

        {/* Large screens navigation */}
        <ul className="hidden md:flex space-x-6 flex-1 justify-center">
          {["Home", "Features", "Contact"].map((item, index) => {
            const sectionId = item.toLowerCase().replace(/\s+/g, "-");
            return (
              <li key={index}>
                <a
                  href={`#${sectionId}`}
                  className="relative cursor-pointer text-sm sm:text-lg font-medium group"
                  onClick={() => handleSetActiveLink(sectionId)}
                >
                  <span
                    className={`relative transition-colors duration-300 ${
                      activeLink === sectionId
                        ? `${!isScrolled? 'text-white' : 'text-light-text-primary dark:text-dark-text-primary'} `
                        : `${!isScrolled? 'text-dark-text-secondary' : 'text-light-text-secondary dark:text-dark-text-secondary group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' }`
                    }`}
                  >
                    {dict[selectedLanguage][item.toLowerCase()]}
                  </span>
                  <span
                    className={`block h-[2px] w-0 bg-light-primary dark:bg-dark-primary absolute left-0 bottom-[-2px] transition-all duration-300 ${
                      activeLink === sectionId ? "w-full" : "group-hover:w-full"
                    }`}
                  ></span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="hidden md:block px-4 py-2 rounded-md bg-light-primary dark:bg-dark-primary text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
          >
            {isLoginLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].login}
          </button>
          <button
            onClick={handleSignup}
            className="hidden md:block px-4 py-2 rounded-md bg-light-primary dark:bg-dark-primary text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
          >
            {isSignupLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].signup}
          </button>
          <button
            onClick={() => setCurrentTheme(isDarkMode? 'light' : 'dark')}
            className={`p-2 rounded-md ${!isScrolled? 'text-white' : ''} text-light-text-primary dark:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-white transition-colors duration-300`}
          >
            {isDarkMode ? <FaSun size={20} title={dict[selectedLanguage].darkModeOn} /> : <FaMoon size={20} title={dict[selectedLanguage].darkModeOff} />}
          </button>
          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-md ${!isScrolled? 'text-white' : ''} text-light-text-primary dark:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300`}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden overflow-y-auto mt-5 z-50 absolute top-[2.8rem] right-[1.4rem] w-[15.6rem] bg-light-background dark:bg-dark-background border border-transparent dark:border-gray-600 rounded-lg shadow-lg flex flex-col p-2 space-y-4"
          ref={dropdownRef}
        >
          {Object.entries(dict[selectedLanguage].mobileMenu).map(([key, value], index) => (
            <a
              key={index}
              href={`#${key.toLowerCase()}`}
              className="flex items-center px-4 py-2 w-full text-lg font-medium font-f1 text-light-text-primary dark:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
              onClick={() => {
                handleSetActiveLink(key.toLowerCase());
                setIsMenuOpen(false);
              }}
            >
              {key === "home" && <FaHome className="mr-3 text-lg" />}
              {key === "features" && <FaAppStore className="mr-3 text-lg" />}
              {key === "contact" && <FaPhone className="mr-3 text-lg" />}
              {typeof value === "string" ? value : "Menu"} {/* Cast value to string */}
            </a>
          ))}

          <hr className="w-full border-t border-transparent dark:border-gray-600 my-2" />
          <a
            href="/auth/login"
            className="flex items-center px-4 py-2 w-full text-lg font-medium font-f1 text-light-text-primary dark:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaSignInAlt className="mr-3 text-lg" />
            {dict[selectedLanguage].login}
          </a>
          <a
            href="/auth/signup"
            className="flex items-center px-4 py-2 w-full text-lg font-medium font-f1 text-light-text-primary dark:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaUserPlus className="mr-3 text-lg" />
            {dict[selectedLanguage].signup}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
