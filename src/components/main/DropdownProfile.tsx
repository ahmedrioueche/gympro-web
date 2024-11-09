import { dict } from '../../utils/dict';
import { useEffect, useRef } from 'react';
import { FaSignOutAlt, FaCog, FaBell, FaExclamationCircle, FaUser, FaCommentAlt, FaRocket } from 'react-icons/fa';
import defaultAvatarUrl from '../../assets/images/bench_guy.png';
import logo from '../../assets/images/bench_guy.png';
import { User } from '../../utils/types';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const DropdownProfile = ({
  isOpen,
  onClose,
  onOpenNotifDropdown,
  onOpenPlansDropDown,
  onOpenChatBotDropDown,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenNotifDropdown: () => void;
  onOpenPlansDropDown: () => void;
  onOpenChatBotDropDown: () => void;
}) => {
  const selectedLanguage = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate('/main/settings');
    onClose();
  };

  const handleNotifs = () => {
    onOpenNotifDropdown();
    onClose();
  };

  const user: User = {
    name: "Ahmed's Gym",
    email: 'adsrahmed@gmail.com',
    logo: logo,
  };

  const profileOptions = [
    { id: 2, label: dict[selectedLanguage].settings, onClick: handleSettings },
    { id: 3, label: dict[selectedLanguage].notifications, onClick: handleNotifs },
  ];

  const handleLogout = async () => {
    // await signOut({ callbackUrl: "/api/auth/signout" });
  };

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

  const handleProfileClick = () => {
    navigate('/main/profile');
    onClose();
  };

  const handlePlansClick = () => {
    onOpenPlansDropDown();
    onClose();
  };

  const handleChatBotClick = () => {
    onOpenChatBotDropDown();
    onClose();
  };

  const handleFeedBackClick = () => {
    navigate('/main/feedback');
    onClose();
  };
  const handleHelpClick = () => {
    navigate('/main/help');
    onClose();
  };

  return (
    <div className="relative">
      <div
        ref={dropdownRef}
        className={`absolute right-0 mt-6 w-72 md:w-84 max-h-[80vh] bg-light-surface dark:bg-dark-surface border border-gray-300 dark:border-gray-600 text-light-text-primary dark:text-dark-text-primary rounded-lg shadow-lg z-50 overflow-y-hidden scrollbar-hide transform transition-all duration-300 ease-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className={`overflow-y-auto scrollbar-hide overflow-x-hidden transition-all duration-300 ease-out ${
            isOpen ? 'max-h-[200vh]' : 'max-h-0'
          }`}
        >
          {/* Header Section */}
          <div className="flex flex-row p-4 transition duration-300">
            <div className="relative">
              <img
                src={user.logo || defaultAvatarUrl}
                alt={user.name!}
                className="w-12 h-12 rounded-full object-cover border-2"
              />
            </div>
            <div className="flex flex-col ml-3">
              <h2 className="text-lg font-f1 font-semibold">{user.name}</h2>
              <h3 className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{user.email}</h3>
            </div>
          </div>

          {/* Separation Line */}
          <hr className="border-gray-300 dark:border-gray-600 my-2" />

          {/* Profile Section */}
          <div
            onClick={handleProfileClick}
            className="px-4 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaUser className="mr-3 text-md" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].profile}</h3>
            </div>
          </div>

          <div className="md:hidden font-f2">
            {profileOptions.map(option => (
              <div
                key={option.id}
                onClick={option.onClick}
                className="px-4 py-3 text-md font-normal hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center">
                  {option.id === 2 && <FaCog className="mr-3 text-md" />}
                  {option.id === 3 && <FaBell className="mr-3 text-md" />}
                  <span>{option.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Settings Section */}
          <div
            onClick={handleSettings}
            className="hidden md:block font-f2 px-4 py-3 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaCog className="mr-3 text-md" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].settings}</h3>
            </div>
          </div>

          {/* Separation Line */}
          <hr className="md:hidden border-gray-300 dark:border-gray-600 my-2" />

          <div
            onClick={() => handleChatBotClick()}
            className="md:hidden px-4 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <Bot className="mr-3 text-md" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].chatBot}</h3>
            </div>
          </div>

          <div
            onClick={() => handlePlansClick()}
            className="md:hidden px-4 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaRocket className="mr-3 text-md" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].upgradePlan}</h3>
            </div>
          </div>
          {/* Separation Line */}
          <hr className="border-gray-300 dark:border-gray-600 my-2" />

          <div
            onClick={handleHelpClick}
            className="px-4 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaExclamationCircle className="mr-3 text-md" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].help}</h3>
            </div>
          </div>

          <div
            onClick={handleFeedBackClick}
            className="md:hidden px-4 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaCommentAlt className="mr-3 text-md" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].feedback}</h3>
            </div>
          </div>

          <div
            onClick={handleLogout}
            className="px-4 py-3 font-f2 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaSignOutAlt className="mr-3 text-md" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].logout}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownProfile;
