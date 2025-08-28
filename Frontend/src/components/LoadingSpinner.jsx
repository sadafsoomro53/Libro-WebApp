import React from 'react';

const LoadingSpinner = ({ size = 'sm', className = '' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'spinner-border-sm';
      case 'lg':
        return 'spinner-border-lg';
      default:
        return '';
    }
  };

  return (
    <div className={`spinner-border ${getSizeClass()} ${className}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
