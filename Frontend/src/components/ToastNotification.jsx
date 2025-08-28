import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastNotification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-success" />;
      case 'error':
        return <FaExclamationCircle className="text-danger" />;
      case 'warning':
        return <FaExclamationCircle className="text-warning" />;
      default:
        return <FaInfoCircle className="text-info" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success-subtle border-success';
      case 'error':
        return 'bg-danger-subtle border-danger';
      case 'warning':
        return 'bg-warning-subtle border-warning';
      default:
        return 'bg-info-subtle border-info';
    }
  };

  return (
    <div
      className={`toast-notification ${getBgColor()} border-start border-4 p-3 mb-2 rounded shadow-sm d-flex align-items-center ${
        isVisible ? 'show' : 'hide'
      }`}
      style={{
        transition: 'all 0.3s ease',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <div className="me-2">{getIcon()}</div>
      <div className="flex-grow-1">{message}</div>
      <button
        className="btn btn-link p-0 ms-2"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(), 300);
        }}
        style={{ color: 'inherit' }}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ToastNotification;
