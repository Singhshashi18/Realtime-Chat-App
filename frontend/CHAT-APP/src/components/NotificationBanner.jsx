import React from 'react';
import { Bell, X } from 'lucide-react';

const NotificationBanner = ({ message, onClose, type = 'info' }) => {
  const typeStyles = {
    info: 'bg-info text-info-content',
    success: 'bg-success text-success-content',
    warning: 'bg-warning text-warning-content',
    error: 'bg-error text-error-content'
  };

  return (
    <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm animate-slide-up ${typeStyles[type]}`}>
      <div className="flex items-start gap-3">
        <Bell className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/10 rounded-full transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
