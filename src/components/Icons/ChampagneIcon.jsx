import React from 'react';

const ChampagneIcon = ({ className = '', ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    <path d="M7 2V4H9V6H7V8H9V10H7V12H9V14H7V16H9V18H7V20H9V22H7" />
    <path d="M15 2V4H17V6H15V8H17V10H15V12H17V14H15V16H17V18H15V20H17V22H15" />
    <path d="M11 6H13V8H11V6Z" />
    <path d="M11 10H13V12H11V10Z" />
    <path d="M11 14H13V16H11V14Z" />
    <path d="M11 18H13V20H11V18Z" />
  </svg>
);

export default ChampagneIcon;
