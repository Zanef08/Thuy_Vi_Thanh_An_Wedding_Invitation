import React from 'react';

const ClockIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default ClockIcon;
