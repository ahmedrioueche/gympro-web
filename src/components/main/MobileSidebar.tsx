import { dict } from '../../utils/dict';
import React, { useEffect, useRef, useState } from 'react';
import { FaTachometerAlt, FaHome, FaUserPlus, FaArrowLeft, FaUserShield } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import logo from '../../assets/icons/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const MobileSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState('stream');
  const selectedLanguage = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle closing sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (link: string) => {
    setCurrentPage(link);
    navigate(`/main/${link}`);
    onClose();
  };

  useEffect(() => {
    const page: string | undefined = location.pathname.split('/').pop();
    setCurrentPage(page!);
  }, [location]);

  return (
    <div
      className={`fixed left-0 top-0 z-200 w-64 h-full bg-light-surface dark:bg-dark-surface shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 overflow-y-scroll scrollbar-hide`}
    >
      <div ref={dropdownRef} className="p-4 text-light-text-primary dark:text-dark-text-primary">
        <div className="flex flex-row justify-start items-center space-x-3">
          <div onClick={onClose} className="text-light-primary dark:text-dark-primary mr-1 cursor-pointer">
            <FaArrowLeft size={24} />
          </div>
          <a href="/main/home" className="relative cursor-pointer flex items-center">
            <img src={logo} alt={dict[selectedLanguage].altLogo} className="h-8 w-8" />
            <span className="text-xl ml-2 mt-1 font-f2 text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].logo}
            </span>
          </a>
        </div>
        <div className="h-0.5 bg-gray-200 dark:bg-gray-800 mt-5" />
        <ul className="space-y-4 mt-4">
          <li
            onClick={() => handleLinkClick('home')}
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === 'home' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <FaHome className={`w-6 h-6 mr-2`} />
            <span className="font-f2">{dict[selectedLanguage].menuHome}</span>
          </li>
          <li
            onClick={() => handleLinkClick('authentication')}
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === 'authentication' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <FaUserShield className={`w-6 h-6 mr-2`} />
            <span className="font-f2">{dict[selectedLanguage].menuAuthentication}</span>
          </li>
          <li
            onClick={() => handleLinkClick('add-member')}
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === 'add-member' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <FaUserPlus className="w-6 h-6 mr-2" />
            <span className="font-f2">{dict[selectedLanguage].menuAddMember}</span>
          </li>
          <li
            onClick={() => handleLinkClick('members')}
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === 'members' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <FaPeopleGroup className="w-6 h-6 mr-2" />
            <span className="font-f2">{dict[selectedLanguage].menuMembers}</span>
          </li>
          <li
            onClick={() => handleLinkClick('dashboard')}
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === 'dashboard' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <FaTachometerAlt className="w-6 h-6 mr-2" />
            <span className="font-f2">{dict[selectedLanguage].menuDashboard}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileSidebar;
