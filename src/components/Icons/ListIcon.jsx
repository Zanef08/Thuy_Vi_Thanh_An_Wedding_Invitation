import React from 'react';

const ListIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default ListIcon;
