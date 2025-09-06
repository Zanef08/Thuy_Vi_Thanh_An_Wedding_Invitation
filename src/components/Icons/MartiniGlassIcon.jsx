import React from 'react';

const MartiniGlassIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    {/* Glass stem */}
    <rect x="11" y="16" width="2" height="4" fill="currentColor"/>
    
    {/* Glass bowl */}
    <path d="M6 12L12 6L18 12L16 16H8L6 12Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Olive */}
    <circle cx="12" cy="10" r="1" fill="currentColor"/>
  </svg>
);

export default MartiniGlassIcon;
