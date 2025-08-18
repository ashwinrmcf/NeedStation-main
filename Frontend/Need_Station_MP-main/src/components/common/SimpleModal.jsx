import React, { useEffect } from 'react';

const SimpleModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  // Apply styles directly to ensure it's on top of everything
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        zIndex: 9999999,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      {/* Modal content */}
      <div 
        className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 mx-4 max-w-md"
        style={{ zIndex: 10000000, position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        
        {/* Body */}
        <div className="mb-6">
          <p className="text-gray-300">{message}</p>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
          >
            {cancelText || 'Cancel'}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: '#00E0B8' }}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
