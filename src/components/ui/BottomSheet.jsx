import React from 'react';

export default function BottomSheet({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 2000,
    }}>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
        }}
      />
      
      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderRadius: '20px 20px 0 0',
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '20px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
        zIndex: 2001,
      }}>
        {/* Handle bar */}
        <div style={{
          width: '40px',
          height: '4px',
          background: '#dee2e6',
          borderRadius: '2px',
          margin: '0 auto 20px',
          cursor: 'pointer',
        }} />
        
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6c757d',
            padding: '5px',
            lineHeight: '1',
          }}
        >
          ✕
        </button>
        
        {children}
      </div>
    </div>
  );
}