import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Countdown from '../../components/Countdown';
import EventSection from '../../components/EventSection';
import Timeline from '../../components/Timeline';
import ImageSlider from '../../components/ImageSlider';
import RSVP from '../../components/RSVP';
import WeddingGift from '../../components/WeddingGift';
import GuestBook from '../../components/GuestBook';
import { ChurchIcon, ChampagneIcon } from '../../components/Icons';
import { getImagePath } from '../../utils/imageUtils';
import useResponsive from '../../hooks/useResponsive';
import { responsiveImages } from '../../config/responsiveImages';
import styles from './Home.module.scss';

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Responsive images - different images for different screen sizes
  const getHeroImage = () => {
    if (isMobile) return getImagePath(responsiveImages.hero.mobile);
    if (isTablet) return getImagePath(responsiveImages.hero.tablet);
    return getImagePath(responsiveImages.hero.desktop);
  };

  const getBottomImage = () => {
    if (isMobile) return getImagePath(responsiveImages.bottom.mobile);
    if (isTablet) return getImagePath(responsiveImages.bottom.tablet);
    return getImagePath(responsiveImages.bottom.desktop);
  };

  const heroImage = getHeroImage();
  const bottomImage = getBottomImage();

  const sections = [
    { id: 'hero', label: 'Trang chủ' },
    { id: 'countdown', label: 'Đếm ngược' },
    { id: 'date', label: 'Ngày cưới' },
    { id: 'ceremony', label: 'Lễ cưới' },
    { id: 'party', label: 'Tiệc cưới' },
    { id: 'timeline', label: 'Lịch trình' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'gift', label: 'Quà cưới' },
    { id: 'guestbook', label: 'Sổ lưu bút' },
    { id: 'gallery', label: 'Thư viện ảnh' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);

      // Update active section
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleLocationClick = (location) => {
    // Mock function - in real app would open maps
    console.log(`Opening location: ${location}`);
    window.open(`https://maps.google.com/?q=${encodeURIComponent(location)}`, '_blank');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={styles.home}>
      {/* Scroll Progress Indicator */}
      <div className={styles.scrollProgress}>
        <motion.div
          className={styles.scrollProgressBar}
          style={{
            width: `${scrollProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #333, #666)',
            transition: 'width 0.1s ease'
          }}
        />
      </div>

      {/* Section Indicators */}
      <div className={styles.sectionIndicator}>
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className={`${styles.indicatorDot} ${activeSection === section.id ? styles.active : ''}`}
            onClick={() => scrollToSection(section.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={section.label}
          />
        ))}
      </div>
      
      {/* Hero Section with Couple Photo */}
      <section id="hero" className={styles.hero}>
        <div className={`${styles.heroImage} bottom-blur`} style={{ backgroundImage: `url(${heroImage})` }}>
          <div className={styles.heroOverlay}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.heroContent}
            >
              <motion.h1 
                className={styles.announcement}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                LỄ CƯỚI
              </motion.h1>
              <motion.h2 
                className={styles.coupleNames}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Thanh An - Thuy Vi
              </motion.h2>
              <motion.p 
                className={styles.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                11.10.2025
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className={styles.countdownSection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Countdown />
        </motion.div>
      </section>

      {/* Wedding Date Section */}
      <section id="date" className={styles.dateSection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.dateContent}
        >
          <motion.p 
            className={styles.invitationText}
            variants={sectionVariants}
          >
            Chúng tôi mời bạn đến<br />
            dự lễ cưới của chúng tôi
          </motion.p>
          <motion.div 
            className={styles.dateDisplay}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.dateLine} variants={sectionVariants}></motion.div>
            <motion.span className={styles.dayName} variants={sectionVariants}>THỨ BẢY</motion.span>
            <motion.div className={styles.dateLine} variants={sectionVariants}></motion.div>
            <motion.span className={styles.dayNumber} variants={sectionVariants}>11</motion.span>
            <motion.div className={styles.dateLine} variants={sectionVariants}></motion.div>
            <motion.span className={styles.monthName} variants={sectionVariants}>THÁNG 10</motion.span>
            <motion.div className={styles.dateLine} variants={sectionVariants}></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Ceremony Section */}
      {/* <section id="ceremony" className={styles.ceremonySection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <EventSection
            title="Lễ Cưới"
            time="5:00 giờ"
            location="Nhà thờ Vũng Tàu"
            address="6 Thống Nhất, Vũng Tàu, Bà Rịa - Vũng Tàu"
            icon={ChurchIcon}
            onButtonClick={() => handleLocationClick("6 Thống Nhất, Vũng Tàu, Bà Rịa - Vũng Tàu")}
          />
        </motion.div>
      </section> */}

      {/* Party Section */}
      <section id="party" className={styles.partySection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <EventSection
            title="Tiệc Cưới"
            time="Cả ngày"
            location="Tư Gia"
            address="Tạp hóa Thành Đạt, Thi xa Cai Lay, Tien Giang, Vietnam"
            icon={ChampagneIcon}
            onButtonClick={() => handleLocationClick("95X6+59 Thi xa Cai Lay, Tien Giang, Vietnam")}
          />
        </motion.div>
      </section>

      {/* Timeline Section */}
      {/* <section id="timeline" className={styles.timelineSection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Timeline />
        </motion.div>
      </section> */}

      {/* RSVP Section */}
      <section id="rsvp" className={styles.rsvpSection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <RSVP />
        </motion.div>
      </section>

      {/* Wedding Gift Section */}
      <section id="gift" className={styles.giftSection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <WeddingGift />
        </motion.div>
      </section>

      {/* Guest Book Section */}
      <section id="guestbook" className={styles.guestBookSection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <GuestBook />
        </motion.div>
      </section>

      {/* Bottom Couple Photo */}
      <section className={styles.bottomPhoto}>
        <motion.div 
          className={styles.bottomImage} 
          style={{ backgroundImage: `url(${bottomImage})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        />
      </section>

      {/* Image Slider Section */}
      <section id="gallery" className={styles.imageSliderSection}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ImageSlider />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
