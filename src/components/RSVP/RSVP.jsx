import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { rsvpAPI, formatRSVPData } from '../../utils/api';
import styles from './RSVP.module.scss';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    attending: 'yes',
    dietaryRestrictions: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format data for API
      const apiData = formatRSVPData(formData);
      
      // Submit to API
      const response = await rsvpAPI.create(apiData);
      
      console.log('RSVP submitted successfully:', response);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          guests: 1,
          attending: 'yes',
          dietaryRestrictions: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('RSVP submission error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className={styles.rsvp}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={styles.container}
      >
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className={styles.title}>Xác Nhận Tham Dự</h2>
        <p className={styles.subtitle}>
          Vui lòng xác nhận sự có mặt của bạn trong ngày trọng đại của chúng tôi
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Họ và tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email của bạn"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="guests">Số lượng khách</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
              >
                <option value={1}>1 người</option>
                <option value={2}>2 người</option>
                <option value={3}>3 người</option>
                <option value={4}>4 người</option>
                <option value={5}>5 người</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Bạn có tham dự không?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleInputChange}
                  />
                  <span className={styles.radioText}>Có, tôi sẽ tham dự</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleInputChange}
                  />
                  <span className={styles.radioText}>Xin lỗi, tôi không thể tham dự</span>
                </label>
              </div>
            </div>

            <Button type="submit" className={styles.submitButton}>
              Gửi Xác Nhận
            </Button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.successMessage}
          >
            <div className={styles.successIcon}>✓</div>
            <h3>Cảm ơn bạn!</h3>
            <p>Chúng tôi đã nhận được xác nhận tham dự của bạn.</p>
            <p>Hẹn gặp lại trong ngày trọng đại!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RSVP;
