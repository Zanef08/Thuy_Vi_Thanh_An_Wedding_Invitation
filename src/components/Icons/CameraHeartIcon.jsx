import React from 'react';

const CameraHeartIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    {/* Camera body */}
    <rect x="6" y="8" width="12" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Camera lens */}
    <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Heart inside lens */}
    <path d="M12 10.5C12.5 10 13 10 13.5 10.5C14 11 12 12 12 12C12 12 10 11 10.5 10.5C11 10 11.5 10 12 10.5Z" fill="currentColor"/>
    
    {/* Camera top */}
    <rect x="8" y="6" width="8" height="2" rx="1" fill="currentColor"/>
  </svg>
);

export default CameraHeartIcon;
