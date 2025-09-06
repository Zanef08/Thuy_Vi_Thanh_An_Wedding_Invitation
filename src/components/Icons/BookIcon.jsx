import React from 'react';

const BookIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V2.5A2.5 2.5 0 0 1 6.5 2Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default BookIcon;
