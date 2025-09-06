import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCountdown } from '../../store/uiSlice';
import styles from './Countdown.module.scss';

const Countdown = () => {
  const dispatch = useDispatch();
  const countdown = useSelector((state) => state.ui.countdown);
  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
         const targetDate = new Date('2025-10-11T21:30:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const newCountdown = { days, hours, minutes, seconds };
        setTimeLeft(newCountdown);
        dispatch(updateCountdown(newCountdown));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className={styles.countdown}>
             <h2 className={styles.title}>CÒN LẠI:</h2>
      <div className={styles.timer}>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{timeLeft.days}</span>
                     <span className={styles.label}>Ngày</span>
         </div>
         <div className={styles.timeUnit}>
           <span className={styles.number}>{timeLeft.hours.toString().padStart(2, '0')}</span>
           <span className={styles.label}>Giờ</span>
         </div>
         <div className={styles.timeUnit}>
           <span className={styles.number}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
           <span className={styles.label}>Phút</span>
         </div>
         <div className={styles.timeUnit}>
           <span className={styles.number}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
           <span className={styles.label}>Giây</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
