import React, { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onUse: () => void;
  onRetake: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, onUse, onRetake }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary rounded-2xl shadow-2xl max-w-2xl w-full p-8 pt-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 z-35 right-1 p-2 rounded-full text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-dark-text-primary transition-colors duration-300"
          aria-label="Close Modal"
        >
          <FaTimes size={14} />
        </button>

        {/* Modal Content */}
        <div className="mb-6">{children}</div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={onRetake}
            className="flex-1 px-4 py-2 max-w-40 text-base font-semibold bg-light-primary dark:bg-dark-primary rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary text-dark-text-primary transition duration-200"
          >
            Retake
          </button>
          <button
            onClick={onUse}
            className="flex-1 px-4 py-2 max-w-40 text-base font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Use
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
