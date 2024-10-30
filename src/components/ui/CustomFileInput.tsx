import React, { useRef, useState } from 'react';

interface CustomFileInputProps {
  onFileChange: (file: File | null) => void;
  className?: string;
  bgColor?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ onFileChange, className = '', bgColor = 'bg-gray-100 dark:bg-gray-700' }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('Select an Image');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Select an Image');
    }
    onFileChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" // Hide the default file input
      />
      <div
        onClick={handleClick}
        className={`p-3 border border-gray-300 rounded-lg ${bgColor} text-light-foreground dark:text-dark-foreground cursor-pointer flex items-center justify-between ${className}`}
      >
        <span className='ml-1'>{fileName}</span>
        <span className="text-light-primary dark:text-dark-primary">📁</span> {/* Optional icon */}
      </div>
    </div>
  );
};

export default CustomFileInput;
