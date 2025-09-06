import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TextField, Box } from '@mui/material';
import { guestbookAPI, createGuestBookEntryWithSignature } from '../../utils/api';
import styles from './GuestBook.module.scss';

const GuestBook = () => {
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [guestEntries, setGuestEntries] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 120;
    canvas.style.width = '100%';
    canvas.style.height = '120px';

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = '#333333';
    context.lineWidth = 2;
    contextRef.current = context;

    // Load existing guestbook entries from API
    loadGuestbookEntries();
  }, []);

  const loadGuestbookEntries = async () => {
    try {
      const entries = await guestbookAPI.getAll();
      // Transform API data to match component format
      const transformedEntries = entries.map(entry => ({
        id: entry.id,
        name: entry.author,
        message: entry.message,
        signature: entry.photoUrl,
        date: new Date(entry.timestamp).toISOString().split('T')[0],
        time: new Date(entry.timestamp).toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
      setGuestEntries(transformedEntries);
    } catch (error) {
      console.error('Error loading guestbook entries:', error);
      // Fallback to empty array if API fails
      setGuestEntries([]);
    }
  };

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (event.touches && event.touches[0]) {
      // Touch event
      const touch = event.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      // Mouse event
      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (event) => {
    event.preventDefault();
    setIsDrawing(true);
    const coords = getCoordinates(event);
    contextRef.current.beginPath();
    contextRef.current.moveTo(coords.x, coords.y);
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing) return;
    const coords = getCoordinates(event);
    contextRef.current.lineTo(coords.x, coords.y);
    contextRef.current.stroke();
  };

  const stopDrawing = (event) => {
    event.preventDefault();
    setIsDrawing(false);
    contextRef.current.closePath();
    // Convert canvas to data URL for signature
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setSignature('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsUploading(true);

    try {
      // Create entry with signature upload
      const result = await createGuestBookEntryWithSignature(guestName, message, signature);
      
      if (result.success) {
        // Create new entry for local state
        const newEntry = {
          id: result.data.id,
          name: guestName,
          message: message,
          signature: result.signatureUrl, // Use Supabase URL instead of base64
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        // Update state
        setGuestEntries([newEntry, ...guestEntries]);
        setGuestName('');
        setMessage('');
        setSignature('');
        clearSignature();
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to create entry');
      }
      
    } catch (error) {
      console.error('Guestbook submission error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.guestBook}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={styles.container}
      >
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17ZM17 21V10H12V5H7V19H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className={styles.title}>Sổ Lưu Niệm</h2>
        <p className={styles.subtitle}>
          Để lại lời chúc mừng và ký tên trong sổ lưu niệm của chúng tôi
        </p>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Viết lời chúc</h3>
            <Box component="form" onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Chữ ký của bạn</label>
                <div className={styles.signatureContainer}>
                  <canvas
                    ref={canvasRef}
                    className={styles.signatureCanvas}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  <div className={styles.signatureActions}>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className={styles.clearButton}
                    >
                      Xóa chữ ký
                    </button>
                  </div>
                </div>
              </div>
              
              <TextField
                fullWidth
                required
                id="guestName"
                label="Tên của bạn"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Nhập tên của bạn"
                margin="normal"
                variant="outlined"
              />

              <TextField
                fullWidth
                required
                id="message"
                label="Lời chúc"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Viết lời chúc mừng của bạn..."
                margin="normal"
                variant="outlined"
              />

              <Button 
                type="submit" 
                variant="contained"
                size="large"
                className={styles.submitButton}
                disabled={isUploading}
                sx={{ mt: 2 }}
              >
                {isUploading ? 'Đang tải lên...' : 'Gửi Lời Chúc'}
              </Button>
            </Box>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={styles.successMessage}
                >
                  <div className={styles.successIcon}>✨</div>
                  <p>Cảm ơn bạn đã để lại lời chúc!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.entriesSection}>
            <h3 className={styles.sectionTitle}>Lời chúc từ khách mời</h3>
            <div className={styles.entriesList}>
              <AnimatePresence>
                {guestEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className={styles.entry}
                  >
                    <div className={styles.entryHeader}>
                      <div className={styles.entryInfo}>
                        <h4 className={styles.entryName}>{entry.name}</h4>
                        <span className={styles.entryDate}>
                          {entry.date} lúc {entry.time}
                        </span>
                      </div>
                      <div className={styles.entryAvatar}>
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <p className={styles.entryMessage}>{entry.message}</p>
                    {entry.signature && (
                      <div className={styles.entrySignature}>
                        <img
                          src={entry.signature}
                          alt="Chữ ký"
                          className={styles.signatureImage}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GuestBook;
