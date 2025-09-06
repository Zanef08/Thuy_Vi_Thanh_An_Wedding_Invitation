import React from 'react';

const WeddingRingsIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    {/* Heart above rings */}
    <path d="M12 2C10.5 2 9 3.5 9 5C9 6.5 10.5 8 12 8C13.5 8 15 6.5 15 5C15 3.5 13.5 2 12 2Z" fill="currentColor"/>
    
    {/* Left ring */}
    <circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Right ring */}
    <circle cx="16" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Ring connection */}
    <path d="M11 12L13 12" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default WeddingRingsIcon;
