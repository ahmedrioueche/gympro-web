import { useLanguage } from '../../../context/LanguageContext';
import { dict } from '../../../lib/dict';
import { Member } from '../../../lib/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MemberCardHoriProps {
  member: Member;
}



const MemberCardHori: React.FC<MemberCardHoriProps> = ({ member }) => {
  const navigate = useNavigate();
  const selectedLanguage = useLanguage();

  const handleProfileClick = () => {
    navigate(`/main/profile/${member.id}`);
  };

  const getMembershipStyle = (type: string) => {
    return type === dict[selectedLanguage].premiumMembership ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800';
  };
  
  const getStatusStyle = (isActive: boolean) => {
    return isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  };

  return (
    <div className="w-full px-2 overflow-hidden rounded-lg border border-gray-200 bg-light-surface dark:bg-dark-surface dark:border-gray-700 shadow-sm hover:shadow-lg dark:hover:shadow-xl transiton duration-300">
      <div className="flex items-center h-20">
        {/* Icon Section */}
        <div className="w-1/6 flex justify-center">
          {member.icon ? (
            <img
              src={member.icon}
              alt={member.name}
              className="h-14 w-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl text-white border-2 border-blue-400">
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Name and Join Date Section */}
        <div className="w-2/6 flex flex-col justify-center">
          <h3
            onClick={handleProfileClick}
            className="font-semibold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors"
          >
            {member.name}
          </h3>
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{`${dict[selectedLanguage].joinDate} ${new Date(member.joinDate).toLocaleDateString()}`}</span>
          </div>
        </div>

        {/* Subscription Status Section */}
        <div className="w-3/6 flex flex-row justify-center items-start space-x-2">
          <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getMembershipStyle(member.subscriptionType)}`}>
            {member.subscriptionType.toUpperCase()}
          </span>
          <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(member.isSubscriptionActive)}`}>
            {member.isSubscriptionActive ? dict[selectedLanguage].activeStatus : dict[selectedLanguage].inactiveStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberCardHori;
