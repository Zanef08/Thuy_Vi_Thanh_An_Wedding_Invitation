import React from 'react';

const PlateForkKnifeIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    {/* Plate */}
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Fork */}
    <rect x="6" y="6" width="1" height="12" fill="currentColor"/>
    <rect x="5" y="6" width="3" height="1" fill="currentColor"/>
    <rect x="5" y="8" width="3" height="1" fill="currentColor"/>
    <rect x="5" y="10" width="3" height="1" fill="currentColor"/>
    
    {/* Knife */}
    <rect x="17" y="6" width="1" height="12" fill="currentColor"/>
    <path d="M17 6L19 8L17 10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default PlateForkKnifeIcon;
