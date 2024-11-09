import { useLanguage } from '../../../context/LanguageContext';
import { dict } from '../../../utils/dict';
import { Member } from '../../../utils/types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MemberCardProps {
  member: Member;
  onEdit?: (member: Member) => void;
  onDelete?: (id: string) => void;
}

const getMembershipStyle = (type: string) => {
  return type === 'Premium' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800';
};

const getStatusStyle = (isActive: boolean) => {
  return isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
};

const MemberCard: React.FC<MemberCardProps> = ({ member, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const selectedLanguage = useLanguage();

  const handleCardClick = () => {
    navigate(`/main/profile/${member.id}`);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-light-surface dark:bg-dark-surface shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 ">
      {/* Header */}
      <div onClick={handleCardClick} className="flex items-center justify-between p-4 cursor-pointer">
        <div className="flex items-center space-x-4">
          {member.icon ? (
            <img
              src={member.icon}
              alt={member.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl text-white border-2 border-blue-400">
              {member.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getMembershipStyle(member.subscriptionType)}`}
            >
              {member.subscriptionType.toUpperCase()}
            </span>
          </div>
        </div>
        {member.id && (
          <button
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => onEdit?.(member)}
          >
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-3">
          {member.email && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>
                {dict[selectedLanguage].email}: {member.email}
              </span>
            </div>
          )}

          {member.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>
                {dict[selectedLanguage].phone}: {member.phone}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {dict[selectedLanguage].joined} {new Date(member.joinDate).toLocaleDateString()}
            </span>
          </div>

          <div className="pt-4">
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(member.isSubscriptionActive)}`}
            >
              {member.isSubscriptionActive ? dict[selectedLanguage].active : dict[selectedLanguage].inactive}
            </span>
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              onClick={() => member.id && onEdit?.(member)}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary transition duration-300"
            >
              {dict[selectedLanguage].edit}
            </button>
            <button
              onClick={() => member.id && onDelete?.(member.id)}
              className="flex-1 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-700 bg-red-500 hover:bg-red-600"
            >
              {dict[selectedLanguage].delete}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
