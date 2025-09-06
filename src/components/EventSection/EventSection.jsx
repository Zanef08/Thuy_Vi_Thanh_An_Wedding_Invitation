import React from 'react';
import { Button } from '@mui/material';
import styles from './EventSection.module.scss';

const EventSection = ({ 
  title, 
  time, 
  location, 
  address, 
  icon: Icon, 
     buttonText = "CHỈ ĐƯỜNG",
  onButtonClick 
}) => {
  return (
    <div className={styles.eventSection}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.details}>
        <p className={styles.timeLocation}>{time} - {location}</p>
        <p className={styles.address} dangerouslySetInnerHTML={{ __html: address }}></p>
      </div>
      <Button 
        onClick={onButtonClick}
        variant="outlined"
        size="medium"
        className={styles.button}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default EventSection;
