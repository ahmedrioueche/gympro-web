import CustomDropdown from '../../ui/SelectDropDown';
import CustomInput from '../../ui/CustomInput';
import CustomButton from '../../ui/CustomButton';
import { Member } from '../../../utils/types';
import React, { useState } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { dict } from '../../../utils/dict';
import { useLanguage } from '../../../context/LanguageContext';

interface EditMemberModalProps {
  member: Member | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<Member>>(member || {});
  const [subscriptionType, setSubscriptionType] = useState<string>('');
  const selectedLanguage = useLanguage();

  const subscriptionOptions = [
    { value: 'monthly', label: dict[selectedLanguage].optionMonthly },
    { value: 'yearly', label: dict[selectedLanguage].optionYearly },
  ];

  const handleSubmit = () => {
    console.log('Updating member:', formData);
    onClose();
  };

  const handleChange = (key: keyof Member, value: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl shadow-2xl w-[90%] max-w-2xl p-8 transform transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-3 mb-4">
          <div className="flex items-center text-light-text dark:text-dark-text">
            <FaEdit className="text-xl text-light-primary dark:text-dark-primary mr-3" />
            <h2 className="text-lg font-semibold">{dict[selectedLanguage].editMemberTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary transition-colors duration-300"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Form Content */}
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{dict[selectedLanguage].labelName}</label>
              <CustomInput
                type="text"
                placeholder={dict[selectedLanguage].labelName}
                value={formData.name}
                onChange={value => handleChange('name', value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{dict[selectedLanguage].labelEmail}</label>
              <CustomInput
                type="email"
                placeholder={dict[selectedLanguage].labelEmail}
                value={formData.email}
                onChange={value => handleChange('email', value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{dict[selectedLanguage].labelPhone}</label>
              <CustomInput
                type="tel"
                placeholder={dict[selectedLanguage].labelPhone}
                value={formData.phone}
                onChange={value => handleChange('phone', value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{dict[selectedLanguage].labelSubscriptionType}</label>
              <CustomDropdown
                options={subscriptionOptions}
                value={subscriptionType}
                onChange={setSubscriptionType}
                placeholder={dict[selectedLanguage].placeholderSubscriptionType}
                className="border border-gray-300 dark:border-gray-600 rounded-md"
                bgColor="bg-gray-100 dark:bg-gray-700"
                borderColor="bg-white"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4 mt-10">
          <CustomButton
            onClick={onClose}
            text={dict[selectedLanguage].buttonCancel}
            type="primary"
            className="flex-1 max-w-40"
          />
          <CustomButton
            onClick={handleSubmit}
            text={dict[selectedLanguage].buttonSave}
            type="secondary"
            className="flex-1 max-w-40"
          />
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
