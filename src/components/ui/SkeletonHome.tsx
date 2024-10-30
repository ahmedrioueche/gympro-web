// Skeleton.tsx
import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col h-screen p-2 py-4 md:p-6 space-y-6 bg-light-background dark:bg-dark-background">
      {/* Quick Stats Section Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-6 bg-gray-200 dark:bg-dark-surface rounded-lg flex flex-col space-y-2">
            <div className="w-1/3 h-4 bg-gray-300 dark:bg-dark-surface rounded"></div>
            <div className="w-2/3 h-8 bg-gray-300 dark:bg-dark-surface rounded"></div>
          </div>
        ))}
      </div>

      {/* Live Data Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Chart Skeleton */}
        <div className="p-4 bg-gray-200 dark:bg-dark-surface rounded-lg">
          <div className="h-[300px] bg-gray-300 dark:bg-dark-surface rounded-md"></div>
        </div>

        {/* New Members Skeleton */}
        <div className="p-4 bg-gray-200 dark:bg-dark-surface rounded-lg space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 dark:bg-dark-surface rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-1/2 h-4 bg-gray-300 dark:bg-dark-surface rounded"></div>
                <div className="w-1/3 h-4 bg-gray-300 dark:bg-dark-surface rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
