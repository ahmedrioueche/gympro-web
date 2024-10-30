import { dict } from '@/lib/dict';
import { formatDateTime } from '@/lib/formater';
import { Notif } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { FaBell, FaEnvelope } from 'react-icons/fa';

const DropdownNotifs = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sortedNotifs, setSortedNotifs] = useState<any[]>([]);
  const selectedLanguage = "english";
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

  return isOpen ? (
    <div className="relative mt-10">
    
      {isOpen && (
        <div  ref={dropdownRef} 
        className="absolute right-[-50px] mt-3 w-72 h-[32rem] bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-y-scroll scrollbar-hide">
        <div className="py-2">
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
      )}
    </div>
  ) : null;
};

export default DropdownNotifs;
