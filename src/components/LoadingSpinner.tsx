import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rickBlue"></div>
    </div>
  );
};

export default LoadingSpinner; 