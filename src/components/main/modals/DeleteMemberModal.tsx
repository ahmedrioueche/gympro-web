import { FaTimes, FaTrash } from 'react-icons/fa';
import React from 'react';
import { dict } from '../../../lib/dict';
import { useLanguage } from '../../../context/LanguageContext';

interface DeleteMemberModalProps {
  memberId: number | string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({ memberId, isOpen, onClose }) => {
  const selectedLanguage = useLanguage();

  const handleDelete = () => {
    console.log("Deleting member with ID:", memberId);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary rounded-2xl shadow-2xl p-8 pt-6 w-full max-w-md transform transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-4 mb-6">
          <div className="flex items-center text-red-500">
            <FaTrash className="text-base mr-3" />
            <h2 className="text-lg font-semibold">{dict[selectedLanguage].deleteMemberHeader}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text-primary transition-colors duration-300"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="text-center text-gray-700 dark:text-gray-300 mb-6">
          <p className="text-base">{dict[selectedLanguage].deleteMemberConfirmation}</p>
          <p className="text-sm text-gray-500 mt-2">{dict[selectedLanguage].deleteMemberWarning}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-20">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-base font-semibold bg-light-primary dark:bg-dark-primary rounded-lg hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary text-dark-text-primary transition duration-200"
          >
            {dict[selectedLanguage].cancel}
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            {dict[selectedLanguage].delete}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;
