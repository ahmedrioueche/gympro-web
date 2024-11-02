import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface CustomButtonProps {
  onClick: () => void;
  text: string;
  type?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  text,
  type = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  icon,
}) => {
  const baseStyles =
    'flex items-center justify-center px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-200';
  const typeStyles = {
    primary:
      'bg-light-primary dark:bg-dark-primary text-dark-text-primary hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary',
    secondary:
      'bg-light-secondary dark:bg-dark-secondary text-white hover:bg-light-accentSecondary dark:hover:bg-dark-accentSecondary',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${typeStyles[type]} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <>
          {icon && <span className={`${text !== '' ? 'mr-2' : ''} `}>{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default CustomButton;
