import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  text = '',
  fullScreen = false,
  className = ''
}) => {
  const sizes = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={`${containerClasses} ${className}`}>
      <Loader 
        className="animate-spin text-indigo-600 dark:text-indigo-400" 
        size={sizes[size]} 
      />
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
