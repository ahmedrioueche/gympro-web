import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  bgColor?: string;
  borderColor?: string;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  className,
  bgColor = 'bg-light-surface dark:bg-dark-surface',
  borderColor = 'border-light-primary dark:border-dark-primary',
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        className={`w-full rounded px-4 py-2 cursor-pointer ${
          isOpen ? `border ${borderColor}` : ''
        } ${bgColor} text-light-text-primary dark:text-dark-text-primary outline-none flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {value ? options.find(option => option.value === value)?.label : placeholder}
        </span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </div>

      {isOpen && (
        <div
          className={`absolute z-20 w-full mt-1 ${bgColor} light-scrollbar dark:dark-scrollbar border ${borderColor} rounded shadow-lg`}
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 text-left cursor-pointer hover:bg-dark-primary text-light-text-primary dark:text-dark-text-primary hover:text-white transition-colors duration-150"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
