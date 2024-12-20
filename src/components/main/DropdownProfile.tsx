import { dict } from '../../utils/dict';
import { useEffect, useRef } from 'react';
import { FaSignOutAlt, FaCog, FaBell, FaExclamationCircle, FaUser, FaCommentAlt, FaRocket } from 'react-icons/fa';
import defaultAvatarUrl from '../../assets/images/bench_guy.png';
import logo from '../../assets/images/bench_guy.png';
import { User } from '../../utils/types';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

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
  const { signOut } = useAuth();

  const handleSettings = () => {
    navigate('/main/settings');
    onClose();
  };

  const handleNotifs = () => {
    onOpenNotifDropdown();
    onClose();
  };

  const { user } = useAuth();
  if (user && !user.logo) {
    user.logo = logo;
  }

  const profileOptions = [
    { id: 2, label: dict[selectedLanguage].settings, onClick: handleSettings },
    { id: 3, label: dict[selectedLanguage].notifications, onClick: handleNotifs },
  ];

  const handleLogout = async () => {
    // await signOut({ callbackUrl: "/api/auth/signout" });
    signOut();
    navigate('/auth/login');
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
        className={`md:w-84 absolute right-0 z-50 mt-6 max-h-[80vh] w-72 origin-top transform overflow-y-hidden rounded-lg border border-gray-300 bg-light-surface text-light-text-primary shadow-lg transition-all duration-300 ease-out scrollbar-hide dark:border-gray-600 dark:bg-dark-surface dark:text-dark-text-primary ${
          isOpen ? 'translate-y-0 scale-y-100 opacity-100' : 'pointer-events-none -translate-y-4 scale-y-0 opacity-0'
        }`}
      >
        <div
          className={`overflow-y-auto overflow-x-hidden transition-all duration-300 ease-out scrollbar-hide ${
            isOpen ? 'max-h-[200vh]' : 'max-h-0'
          }`}
        >
          {/* Header Section */}
          <div className="flex flex-row p-4 transition duration-300">
            <div className="relative">
              <img
                src={user?.logo || defaultAvatarUrl}
                alt={user?.name!}
                className="h-12 w-12 rounded-full border-2 object-cover"
              />
            </div>
            <div className="ml-3 flex flex-col">
              <h2 className="font-f1 text-lg font-semibold">{user?.name}</h2>
              <h3 className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{user?.email}</h3>
            </div>
          </div>

          {/* Separation Line */}
          <hr className="my-2 border-gray-300 dark:border-gray-600" />

          {/* Profile Section */}
          <div
            onClick={handleProfileClick}
            className="cursor-pointer px-4 py-3 font-f2 transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary"
          >
            <div className="flex items-center">
              <FaUser className="text-md mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].profile}</h3>
            </div>
          </div>

          <div className="font-f2 md:hidden">
            {profileOptions.map(option => (
              <div
                key={option.id}
                onClick={option.onClick}
                className="text-md cursor-pointer px-4 py-3 font-normal transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary"
              >
                <div className="flex items-center">
                  {option.id === 2 && <FaCog className="text-md mr-3" />}
                  {option.id === 3 && <FaBell className="text-md mr-3" />}
                  <span>{option.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Settings Section */}
          <div
            onClick={handleSettings}
            className="hidden cursor-pointer px-4 py-3 font-f2 transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary md:block"
          >
            <div className="flex items-center">
              <FaCog className="text-md mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].settings}</h3>
            </div>
          </div>

          {/* Separation Line */}
          <hr className="my-2 border-gray-300 dark:border-gray-600 md:hidden" />

          <div
            onClick={() => handleChatBotClick()}
            className="cursor-pointer px-4 py-3 font-f2 transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary md:hidden"
          >
            <div className="flex items-center">
              <Bot className="text-md mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].chatBot}</h3>
            </div>
          </div>

          <div
            onClick={() => handlePlansClick()}
            className="cursor-pointer px-4 py-3 font-f2 transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary md:hidden"
          >
            <div className="flex items-center">
              <FaRocket className="text-md mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].upgradePlan}</h3>
            </div>
          </div>
          {/* Separation Line */}
          <hr className="my-2 border-gray-300 dark:border-gray-600" />

          <div
            onClick={handleHelpClick}
            className="cursor-pointer px-4 py-3 font-f2 transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary"
          >
            <div className="flex items-center">
              <FaExclamationCircle className="text-md mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].help}</h3>
            </div>
          </div>

          <div
            onClick={handleFeedBackClick}
            className="cursor-pointer px-4 py-3 font-f2 transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary md:hidden"
          >
            <div className="flex items-center">
              <FaCommentAlt className="text-md mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].feedback}</h3>
            </div>
          </div>

          <div
            onClick={handleLogout}
            className="cursor-pointer px-4 py-3 font-f2 transition-colors duration-200 hover:bg-light-primary hover:text-dark-text-primary dark:hover:bg-dark-primary"
          >
            <div className="flex items-center">
              <FaSignOutAlt className="text-md mr-3" />
              <h3 className="text-md font-normal">{dict[selectedLanguage].logout}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownProfile;
