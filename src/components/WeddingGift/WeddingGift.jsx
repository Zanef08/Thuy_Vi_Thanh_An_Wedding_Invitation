import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './WeddingGift.module.scss';

const WeddingGift = () => {
  const [selectedRecipient, setSelectedRecipient] = useState('bride');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bankInfo = {
    bride: {
      title: 'Mừng cưới đến cô dâu',
      bank: 'VPBANK',
      accountName: 'PHAM HUYNH THUY VI',
      accountNumber: '335835905',
      qrCode: '/qrbride.png' 
    },
    groom: {
      title: 'Mừng cưới đến chú rể',
      bank: 'TECHCOMBANK',
      accountName: 'TRAN THANH AN',
      accountNumber: '6688 2909 1998',
      qrCode: '/qrgroom.png' 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Gift submitted:', {
      recipient: selectedRecipient
    });
    
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const currentInfo = bankInfo[selectedRecipient];

  return (
    <div className={styles.weddingGift}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={styles.container}
      >
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12V22H4V12M22 7H2V12H22V7ZM12 22V7M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7ZM12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className={styles.title}>Mừng Cưới</h2>
        <p className={styles.subtitle}>
          Lời chúc mừng của bạn là món quà quý giá nhất đối với chúng tôi
        </p>

        {!isSubmitted ? (
          <div className={styles.content}>
            <div className={styles.recipientSelector}>
              <h3 className={styles.sectionTitle}>Chọn người nhận</h3>
              <div className={styles.recipientOptions}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${styles.recipientOption} ${selectedRecipient === 'bride' ? styles.selected : ''}`}
                  onClick={() => setSelectedRecipient('bride')}
                >
                  <div className={styles.recipientIcon}>
                    <img src="/bride.png" alt="Cô dâu" />
                  </div>
                  <span>Cô dâu</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${styles.recipientOption} ${selectedRecipient === 'groom' ? styles.selected : ''}`}
                  onClick={() => setSelectedRecipient('groom')}
                >
                  <div className={styles.recipientIcon}>
                    <img src="/groom.png" alt="Chú rể" />
                  </div>
                  <span>Chú rể</span>
                </motion.button>
              </div>
            </div>

            <div className={styles.giftCard}>
              <h3 className={styles.cardTitle}>{currentInfo.title}</h3>
              
              <div className={styles.qrSection}>
                <div className={styles.qrCode}>
                  <img 
                    src={currentInfo.qrCode} 
                    alt={`QR Code ${currentInfo.bank}`}
                    className={styles.qrImage}
                  />
                </div>
              </div>

              <div className={styles.bankDetails}>
                <div className={styles.bankItem}>
                  <span className={styles.label}>Ngân hàng:</span>
                  <span className={styles.value}>{currentInfo.bank}</span>
                </div>
                <div className={styles.bankItem}>
                  <span className={styles.label}>Tên tài khoản:</span>
                  <span className={styles.value}>{currentInfo.accountName}</span>
                </div>
                <div className={styles.bankItem}>
                  <span className={styles.label}>Số tài khoản:</span>
                  <span className={styles.value}>{currentInfo.accountNumber}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.successMessage}
          >
            <div className={styles.successIcon}>💝</div>
            <h3>Cảm ơn bạn!</h3>
            <p>Lời chúc mừng của bạn đã được gửi thành công.</p>
            <p>Chúng tôi rất trân trọng tình cảm của bạn!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WeddingGift;
