import React from 'react';
import { Member } from '../../../lib/types';
import gym_5 from '../../../assets/images/gym_5.svg';
import { dict } from '../../../lib/dict';
import { useLanguage } from '../../../context/LanguageContext';

interface MemberProfileProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const member: Member = {
  id: '1',
  name: 'Alice Johnson',
  age: '25',
  gender: 'female',
  email: 'alice.j@example.com',
  phone: '123-456-7890',
  icon: `/female.png`,
  joinDate: new Date('2023-01-01'),
  subscriptionType: 'premium',
  isSubscriptionActive: true,
  lastSubscriptionDate: new Date('2023-12-31'),
  lastPaymentValue: 100,
};

const MemberProfile: React.FC<MemberProfileProps> = ({ onEdit, onDelete }) => {
  const selectedLanguage = useLanguage();

  return (
    <div className="min-h-screen p-8 relative">
      {/* Background container with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${gym_5})` }}
      />

      {/* Content container */}
      <div className="relative z-0 opacity-95">
        <div className="max-w-lg mx-auto mt-4">
          <div className="relative rounded-lg shadow-lg p-6 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm overflow-hidden">
            {/* Content with relative positioning to appear above background */}
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                {member.icon ? (
                  <img src={member.icon} alt={member.name} className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <div className="h-24 w-24 flex items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{member.name}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{member.email}</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span className="font-medium">{dict[selectedLanguage].age}:</span>
                  <span>{member.age || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{dict[selectedLanguage].gender}:</span>
                  <span>{member.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{dict[selectedLanguage].phone}:</span>
                  <span>{member.phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{dict[selectedLanguage].joinDate}:</span>
                  <span>{new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{dict[selectedLanguage].subscriptionType}:</span>
                  <span className={member.subscriptionType === 'premium' ? 'text-red-600' : 'text-gray-600'}>
                    {member.subscriptionType.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{dict[selectedLanguage].status}:</span>
                  <span className={member.isSubscriptionActive ? 'text-green-600' : 'text-red-600'}>
                    {member.isSubscriptionActive ? dict[selectedLanguage].activeStatus : dict[selectedLanguage].inactiveStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{dict[selectedLanguage].lastSubscriptionDate}:</span>
                  <span>{new Date(member.lastSubscriptionDate).toLocaleDateString()}</span>
                </div>
                {member.lastPaymentValue && (
                  <div className="flex justify-between">
                    <span className="font-medium">{dict[selectedLanguage].lastPayment}:</span>
                    <span>${member.lastPaymentValue.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex mt-6 space-x-4">
                {onEdit && member.id && (
                  <button
                    onClick={() => onEdit(member.id!)}
                    className="flex-1 rounded-md bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600"
                  >
                    {dict[selectedLanguage].editButton}
                  </button>
                )}
                {onDelete && member.id && (
                  <button
                    onClick={() => onDelete(member.id!)}
                    className="flex-1 rounded-md bg-red-500 text-white px-4 py-2 font-medium hover:bg-red-600"
                  >
                    {dict[selectedLanguage].deleteButton}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
