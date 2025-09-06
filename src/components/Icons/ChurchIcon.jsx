import React from 'react';

const ChurchIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    <path d="M12 2L2 7V10H4V20H10V14H14V20H20V10H22V7L12 2Z" />
    <path d="M9 16H15V18H9V16Z" />
    <path d="M10 12H14V14H10V12Z" />
    <path d="M11 8H13V10H11V8Z" />
  </svg>
);

export default ChurchIcon;
