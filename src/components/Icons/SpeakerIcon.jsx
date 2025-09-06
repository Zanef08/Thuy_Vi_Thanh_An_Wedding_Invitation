import React from 'react';

const SpeakerIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    {/* Speaker body */}
    <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor"/>
    
    {/* Speaker cone */}
    <circle cx="12" cy="12" r="2" fill="none" stroke="white" strokeWidth="1"/>
    
    {/* Sound waves */}
    <path d="M16 10C17 10 18 11 18 12C18 13 17 14 16 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M18 8C20 8 22 10 22 12C22 14 20 16 18 16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M20 6C23 6 26 9 26 12C26 15 23 18 20 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

export default SpeakerIcon;
