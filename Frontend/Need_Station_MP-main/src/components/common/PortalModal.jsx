import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const PortalModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  // Handle creating the portal root element
  useEffect(() => {
    if (!document.getElementById('modal-portal-root')) {
      const portalRoot = document.createElement('div');
      portalRoot.id = 'modal-portal-root';
      document.body.appendChild(portalRoot);
    }
    
    // Prevent background scrolling when modal is open
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
  
  // Modal component to be rendered via portal
  const modalContent = (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 7, 26, 0.8)',
        backdropFilter: 'blur(4px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Modal card with shadow and border */}
      <div 
        className="relative rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        style={{ 
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          boxShadow: '0 25px 50px -12px rgba(0, 224, 184, 0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with title and close button */}
        <div className="relative p-5 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
              style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-6">
          <p className="text-gray-300 text-base mb-6">{message}</p>
          
          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              {cancelText || 'Cancel'}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-gray-900 font-medium transition-colors"
              style={{ 
                backgroundColor: '#00E0B8',
                boxShadow: '0 0 15px rgba(0, 224, 184, 0.3)'
              }}
            >
              {confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render using portal to ensure it's not affected by parent component styles
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-portal-root') || document.body
  );
};

export default PortalModal;
