import React from 'react';
import styles from './InstagramGallery.module.scss';

const InstagramGallery = () => {
  // Sử dụng hình ảnh thật từ folder assets
  const photos = [
    { id: 1, src: '/assets/FTW00404.JPG', caption: 'Khoảnh khắc đẹp ❤️' },
    { id: 2, src: '/assets/FTW01085.JPG', caption: 'Chuẩn bị cho ngày trọng đại 💍' },
    { id: 3, src: '/assets/FTW01578.JPG', caption: 'Những khoảnh khắc đáng nhớ 📸' },
    { id: 4, src: '/assets/FTW01086.JPG', caption: 'Tình yêu và hạnh phúc 💕' },
    { id: 5, src: '/assets/FTW01576.JPG', caption: 'Chuẩn bị cho tương lai 🌟' },
    { id: 6, src: '/assets/FTW01560.JPG', caption: 'Những khoảnh khắc ngọt ngào 🍯' },
    { id: 7, src: '/assets/FTW01575.JPG', caption: 'Kỷ niệm đáng nhớ 💫' },
    { id: 8, src: '/assets/FTW01582.JPG', caption: 'Tình yêu vĩnh cửu 💑' },
    { id: 9, src: '/assets/FTW01579.JPG', caption: 'Hạnh phúc trọn vẹn 🌸' },
    { id: 10, src: '/assets/FTW01087.JPG', caption: 'Những khoảnh khắc ngọt ngào 🥰' },
    { id: 11, src: '/assets/FTW01089.JPG', caption: 'Tình yêu và niềm vui ✨' },
    { id: 12, src: '/assets/FTW01577.JPG', caption: 'Kỷ niệm đẹp nhất 💖' },
  ];

  return (
    <div className={styles.instagramGallery}>
      <div className={styles.galleryHeader}>
        <div className={styles.instagramIcon}>📸</div>
        <h3 className={styles.galleryTitle}>Instagram</h3>
        <p className={styles.galleryDescription}>
          Chúng tôi không muốn bỏ lỡ khoảnh khắc nào, hãy theo dõi và gắn thẻ Instagram của đám cưới để chúng tôi có thể lưu giữ những kỷ niệm đẹp
        </p>
      </div>
      
      <div className={styles.galleryGrid}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.photoItem}>
            <div className={styles.photoContainer}>
              <img src={photo.src} alt={photo.caption} className={styles.photo} />
              <div className={styles.photoOverlay}>
                <div className={styles.photoActions}>
                  <span className={styles.likeIcon}>❤️</span>
                  <span className={styles.commentIcon}>💬</span>
                </div>
              </div>
            </div>
            <div className={styles.photoCaption}>
              <p>{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.followButton}>
        <a href="https://instagram.com/thanhan_thuyvi" target="_blank" rel="noopener noreferrer">
          @THANHAN_THUYVI
        </a>
      </div>
    </div>
  );
};

export default InstagramGallery;
