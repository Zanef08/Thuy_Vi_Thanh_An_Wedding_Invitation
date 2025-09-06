import React, { useState, useRef, useEffect } from 'react';
import styles from './ImageSlider.module.scss';
import { getAllImagePaths, preloadImages } from '../../utils/imageUtils';

const ImageSlider = () => {
  // Sử dụng utility function để lấy danh sách hình ảnh
  const images = getAllImagePaths();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const slideRef = useRef(null);
  const modalRef = useRef(null);

  // Preload images for better performance
  useEffect(() => {
    const preloadNextImages = async () => {
      try {
        // Preload first 5 images immediately
        const initialImages = images.slice(0, 5);
        await preloadImages(initialImages);
        setImagesLoaded(true);
        
        // Preload remaining images in background
        const remainingImages = images.slice(5);
        if (remainingImages.length > 0) {
          preloadImages(remainingImages).catch(console.error);
        }
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Still show slider even if preloading fails
      }
    };

    preloadNextImages();
  }, [images]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Touch events for swipe
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum distance to trigger swipe
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }
    
    setIsDragging(false);
  };

  // Mouse events for desktop swipe
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    openModal();
  };

  // Modal swipe events
  const handleModalTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleModalTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleModalTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  };

  const handleModalMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleModalMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleModalMouseUp = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  };

  // Show loading state while images are being preloaded
  if (!imagesLoaded) {
    return (
      <div className={styles.imageSlider}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21,15 16,10 5,21"></polyline>
          </svg>
        </div>
        <h2 className={styles.sliderTitle}>Thư viện ảnh</h2>
        <p className={styles.sliderDescription}>Đang tải hình ảnh...</p>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.imageSlider}>
      <div className={styles.iconContainer}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className={styles.sliderTitle}>Thư viện ảnh</h3>
      <p className={styles.sliderDescription}>
        Những khoảnh khắc đẹp nhất của chúng tôi
      </p>

      <div className={styles.sliderContainer}>
        <button 
          className={`${styles.sliderButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        <div 
          className={styles.slideContainer}
          ref={slideRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img 
            src={images[currentIndex]} 
            alt={`Ảnh ${currentIndex + 1}`}
            className={styles.slideImage}
            draggable={false}
            onClick={handleImageClick}
          />
          <div className={styles.slideInfo}>
            <span className={styles.slideCounter}>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>

        <button 
          className={`${styles.sliderButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
            onTouchEnd={handleModalTouchEnd}
            onMouseDown={handleModalMouseDown}
            onMouseMove={handleModalMouseMove}
            onMouseUp={handleModalMouseUp}
            onMouseLeave={handleModalMouseUp}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img 
              src={images[currentIndex]} 
              alt={`Ảnh ${currentIndex + 1}`}
              className={styles.modalImage}
              draggable={false}
            />
            <div className={styles.modalInfo}>
              <span className={styles.modalCounter}>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
