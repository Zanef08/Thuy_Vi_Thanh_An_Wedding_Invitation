import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box,
  Typography
} from '@mui/material';
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
          <Box component="form" onSubmit={handleSubmit} className={styles.form}>
            <TextField
              fullWidth
              required
              id="name"
              name="name"
              label="Họ và tên"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên của bạn"
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email của bạn"
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Số điện thoại"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              margin="normal"
              variant="outlined"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="guests-label">Số lượng khách</InputLabel>
              <Select
                labelId="guests-label"
                id="guests"
                name="guests"
                value={formData.guests}
                label="Số lượng khách"
                onChange={handleInputChange}
              >
                <MenuItem value={1}>1 người</MenuItem>
                <MenuItem value={2}>2 người</MenuItem>
                <MenuItem value={3}>3 người</MenuItem>
                <MenuItem value={4}>4 người</MenuItem>
                <MenuItem value={5}>5 người</MenuItem>
              </Select>
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                Bạn có tham dự không?
              </Typography>
              <RadioGroup
                name="attending"
                value={formData.attending}
                onChange={handleInputChange}
              >
                <FormControlLabel 
                  value="yes" 
                  control={<Radio />} 
                  label="Có, tôi sẽ tham dự" 
                />
                <FormControlLabel 
                  value="no" 
                  control={<Radio />} 
                  label="Xin lỗi, tôi không thể tham dự" 
                />
              </RadioGroup>
            </FormControl>

            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              className={styles.submitButton}
              sx={{ mt: 3, minWidth: 200 }}
            >
              Gửi Xác Nhận
            </Button>
          </Box>
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
