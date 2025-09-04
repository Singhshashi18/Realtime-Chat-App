import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = '', className = '' }) => {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-8',
    lg: 'size-12',
    xl: 'size-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader className={`animate-spin text-primary ${sizeClasses[size]}`} />
      {text && (
        <p className="text-base-content/70 text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
