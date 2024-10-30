// Skeleton.tsx
import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col p-4 bg-light-background dark:bg-dark-background rounded-lg shadow-md">
      {/* Title Skeleton */}
      <div className="w-1/3 h-8 dark:bg-dark-surface bg-gray-200 rounded-md mb-4"></div>
      {/* Topic Selector Skeleton */}
      <div className="w-full h-10 dark:bg-dark-surface bg-gray-200 rounded-md mb-4"></div>
      {/* Filter Buttons Skeleton */}
      <div className="flex space-x-4 mb-4">
        <div className="w-16 h-10 dark:bg-dark-surface bg-gray-200 rounded-md"></div>
        <div className="w-16 h-10 dark:bg-dark-surface bg-gray-200 rounded-md"></div>
        <div className="w-16 h-10 dark:bg-dark-surface bg-gray-200 rounded-md"></div>
      </div>
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center dark:bg-dark-surface bg-gray-200 rounded-lg p-4">
            <div className="w-full h-48 dark:bg-dark-surface bg-gray-200 rounded-md mb-4"></div>
            <div className="w-full h-6 dark:bg-dark-surface bg-gray-200 rounded-md mb-2"></div>
            <div className="w-full h-4 dark:bg-dark-surface bg-gray-200 rounded-md mb-1"></div>
            <div className="w-1/2 h-4 dark:bg-dark-surface bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
