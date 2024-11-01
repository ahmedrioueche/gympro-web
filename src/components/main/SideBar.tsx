import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaHome, FaTachometerAlt, FaUserPlus, FaUserShield } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { dict } from '../../lib/dict';
import { useLanguage } from '../../context/LanguageContext';

const Sidemenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = (link: string) => {
    setCurrentPage(link);
    navigate(`/main/${link}`)
  }

  useEffect(() => {
    const page: string | undefined = location.pathname.split('/').pop();
    setCurrentPage(page!);
  }, [location]);
  
  const selectedLanguage = useLanguage();

  return (
    <div
      className={`hidden md:block relative lg:relative z-1000 top-0 left-0 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary ${isExpanded ? 'w-60' : 'w-20'} p-4 flex flex-col transition-all duration-300 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className={`absolute top-2 ${isExpanded ? 'right-2' : 'right-6'} dark:text-dark-text-secondary text-light-text-primary hover:text-dark-primary dark:hover:text-dark-primary`}
      >
        {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <ul className="space-y-4 mt-6">
        <li onClick={() => handleLinkClick("home")} 
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === "home" ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
          <FaHome className={`w-6 h-6 mr-2`} />
          {isExpanded && <span className="font-f2">{dict[selectedLanguage].home}</span>}
        </li>
        <li onClick={() => handleLinkClick("authentication")} 
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === "authentication" ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
          <FaUserShield className={`w-6 h-6 mr-2`} />
          {isExpanded && <span className="font-f2">{dict[selectedLanguage].authentication}</span>}
        </li>
        <li onClick={() => handleLinkClick("add-member")} 
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === "add-member" ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
          <FaUserPlus className={`w-6 h-6 mr-2`} />
          {isExpanded && <span className="font-f2">{dict[selectedLanguage].addMember}</span>}
        </li>
        <li onClick={() => handleLinkClick("members")} 
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === "members" ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
          <FaPeopleGroup className="w-6 h-6 mr-2" />
          {isExpanded && <span className="font-f2">{dict[selectedLanguage].members}</span>}
        </li>
        <li onClick={() => handleLinkClick("dashboard")} 
            className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary ${currentPage === "dashboard" ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
          <FaTachometerAlt className="w-6 h-6 mr-2" />
          {isExpanded && <span className="font-f2">{dict[selectedLanguage].dashboard}</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidemenu;
