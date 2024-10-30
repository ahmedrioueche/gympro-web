import CustomDropdown from '../../ui/SelectDropDown';
import { Member } from '../../../lib/types';
import React, { useState } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

interface EditMemberModalProps {
  member: Member | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<Member>>(member || {});
  const [subscriptionType, setSubscriptionType] = useState<string>('');

  const subscriptionOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const handleSubmit = () => {
    console.log("Updating member:", formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
            <h2 className="text-lg font-semibold">Edit Member</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-dark-text-primary transition-colors duration-300"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Form Content */}
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none focus:ring-1 focus:ring-light-primary dark:focus:ring-dark-primary border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none focus:ring-1 focus:ring-light-primary dark:focus:ring-dark-primary border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none focus:ring-1 focus:ring-light-primary dark:focus:ring-dark-primary border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subscription Type</label>
              <CustomDropdown
                options={subscriptionOptions}
                value={subscriptionType}
                onChange={setSubscriptionType}
                placeholder="Subscription Type"
                className={`border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md`}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4 mt-10">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 max-w-40 text-base font-semibold bg-light-primary dark:bg-dark-primary rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary text-dark-text-primary transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 max-w-40 text-base font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;