import { dict } from '../../lib/dict';
import { formatDateTime } from '../../lib/formater';
import { Notif } from '../../lib/types';
import { useEffect, useRef, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const DropdownNotifs = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const selectedLanguage = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sortedNotifs, setSortedNotifs] = useState<any[]>([]);
  const notifications = [
    { id: 1, label: 'New comment on your post', onClick: () => alert('Clicked notification 1') },
    { id: 2, label: 'New follower', onClick: () => alert('Clicked notification 2') },
    { id: 3, label: 'Update available', onClick: () => alert('Clicked notification 3') },
  ];

  // Close dropdown on outside click
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

  const toggleDropdown = () => {
  
  };

  const handleNotifClick = (notif : Notif) => {
  }

  function capitalizeFirstLetter(arg0: any): import("react").ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="relative">
      <div
        ref={dropdownRef}
        className={`absolute right-2 mt-2 w-72 md:w-84 h-52 py-4 max-h-[80vh] bg-light-surface dark:bg-dark-surface border border-gray-300 dark:border-gray-600 text-light-text-primary dark:text-dark-text-primary rounded-lg shadow-lg z-50 overflow-y-hidden scrollbar-hide transform transition-all duration-300 ease-out origin-top ${
          isOpen 
            ? 'opacity-100 scale-y-100 translate-y-0' 
            : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className={`overflow-y-auto scrollbar-hide overflow-x-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-[200vh]' : 'max-h-0'
        }`}>
            {sortedNotifs.length === 0 ? (
              <p className="text-center text-light-text-primary dark:text-dark-text-primary">{dict[selectedLanguage].noNotification}</p>
            ) : (
              sortedNotifs.map((notif: any) => (
                <div onClick={() => {handleNotifClick(notif)}}
                  key={notif.id}
                  className="flex items-start p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-light-accent dark:hover:bg-dark-accent text-light-text dark:text-dark-text hover:text-dark-text  transition-colors duration-300 cursor-pointer"
                >
                  <div className="mr-3 text-xl text-light-primary dark:text-dark-primary">
                    {notif.icon ? notif.icon : <FaEnvelope />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{capitalizeFirstLetter(notif.title)}</p>
                    <div className="flex flex-row mb-1">
                      <p className="text-base mr-1">{capitalizeFirstLetter(notif.content)}</p>
                      {notif.description && notif.description !== null && notif.description !== undefined && notif.description !== "undefined" 
                      && notif.description !== "null" && notif.description.trim() !== '' 
                      && <p className="text-base">: {notif.description}</p>}
                    </div>
                    <p className="text-xs">
                      {capitalizeFirstLetter(formatDateTime(new Date(notif.createdAt)))}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
    </div>
  );
};

export default DropdownNotifs;
