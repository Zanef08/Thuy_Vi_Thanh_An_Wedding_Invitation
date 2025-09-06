import React from 'react';

const MailIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default MailIcon;
