import React from 'react';
import styles from './Timeline.module.scss';

const Timeline = () => {
  const events = [
    {
      number: 1,
      title: 'LỄ CƯỚI',
      time: '5:00',
      description: 'Buổi lễ trang trọng tại nhà thờ, nơi chúng tôi trao nhau lời hứa yêu thương và gắn bó trọn đời.',
      position: 'left'
    },
    {
      number: 2,
      title: 'TIỆC COCKTAIL',
      time: '16:30',
      description: 'Thời gian giao lưu, chúc mừng và thưởng thức những ly cocktail thơm ngon cùng bạn bè, người thân.',
      position: 'right'
    },
    {
      number: 3,
      title: 'CHỤP ẢNH',
      time: '17:00',
      description: 'Lưu giữ những khoảnh khắc đẹp nhất của ngày trọng đại với những bức ảnh kỷ niệm đáng nhớ.',
      position: 'left'
    },
    {
      number: 4,
      title: 'TIỆC CƯỚI NHÀ NAM',
      time: '18:30',
      description: 'Bữa tiệc tối thịnh soạn tại nhà chú rể với những món ăn ngon và không khí vui vẻ, ấm cúng cùng gia đình.',
      position: 'right'
    },
    {
      number: 5,
      title: 'TIỆC CƯỚI NHÀ NỮ',
      time: '19:00',
      description: 'Bữa tiệc tối tại nhà cô dâu với những món ăn truyền thống và không khí gia đình đầy ấm áp.',
      position: 'left'
    },
    {
      number: 6,
      title: 'TIỆC TÙNG CHUNG',
      time: '20:00',
      description: 'Bữa tiệc tối chung với tất cả khách mời tại nhà hàng, nơi mọi người cùng nhau chúc mừng và chia sẻ niềm vui.',
      position: 'right'
    }
  ];

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineLine}>
        {events.map((event, index) => (
          <div key={index} className={`${styles.timelineItem} ${styles[event.position]}`}>
                         <div className={styles.timelineNode}>
               <span className={styles.nodeNumber}>{event.time}</span>
             </div>
            
                         <div className={styles.eventContent}>
               <h3 className={styles.eventTitle}>{event.title}</h3>
               <p className={styles.eventDescription}>{event.description}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
