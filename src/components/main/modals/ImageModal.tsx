import CustomButton from '../../ui/CustomButton';
import { useLanguage } from '../../../context/LanguageContext';
import { dict } from '../../../lib/dict';
import React, { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onUse: () => void;
  onRetake: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, onUse, onRetake }) => {
  const selectedLanguage = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 z-35 rounded-full text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-dark-text-primary transition-colors duration-300"
        aria-label="Close Modal"
      >
        <FaTimes size={14} />
      </button>
      <div className="bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary rounded-2xl shadow-2xl max-w-2xl w-full p-2 relative">

        {/* Modal Content */}
        <div className="mb-3">{children}</div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <CustomButton 
            text={dict[selectedLanguage].retake} 
            className='flex-1'
            onClick={()=>onRetake()} 
          />
         
         <CustomButton 
            type='secondary'
            className='flex-1'
            text={dict[selectedLanguage].use} 
            onClick={()=>onUse()} 
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
