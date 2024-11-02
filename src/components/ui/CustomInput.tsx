// CustomInput.tsx
import React from 'react';

interface CustomInputProps {
  type?: string;
  placeholder: string;
  value: string | undefined; // Keep value as string | undefined
  onChange: (value: string | undefined) => void; // Allow onChange to accept string or undefined
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ type = 'text', placeholder, value, onChange, error }) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        value={value || ''} // Ensure value is always a string
        onChange={e => {
          const newValue = type === 'number' ? (e.target.value ? e.target.value : undefined) : e.target.value;
          onChange(newValue); // Pass the value directly
        }}
        className="w-full p-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-dark-text-primary text-light-text-primary outline-none focus:ring-1 focus:ring-light-primary dark:focus:ring-white border border-gray-300 dark:border-gray-600 no-spinner"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default CustomInput;
