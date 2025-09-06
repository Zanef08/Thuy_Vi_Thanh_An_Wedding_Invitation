import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ClockIcon, 
  CalendarIcon, 
  ChurchIcon, 
  ChampagneIcon, 
  ListIcon, 
  MailIcon, 
  GiftIcon, 
  BookIcon, 
  CameraHeartIcon 
} from '../Icons';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', label: 'Trang chủ', icon: HomeIcon },
    { id: 'countdown', label: 'Đếm ngược', icon: ClockIcon },
    { id: 'date', label: 'Ngày cưới', icon: CalendarIcon },
    { id: 'ceremony', label: 'Lễ cưới', icon: ChurchIcon },
    { id: 'party', label: 'Tiệc cưới', icon: ChampagneIcon },
    { id: 'timeline', label: 'Lịch trình', icon: ListIcon },
    { id: 'rsvp', label: 'RSVP', icon: MailIcon },
    { id: 'gift', label: 'Quà cưới', icon: GiftIcon },
    { id: 'guestbook', label: 'Sổ lưu bút', icon: BookIcon },
    { id: 'gallery', label: 'Thư viện ảnh', icon: CameraHeartIcon }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      // Check which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }

      // Show navigation after scrolling down a bit (only on desktop/tablet)
      const isMobile = window.innerWidth < 768;
      setIsVisible(!isMobile && window.scrollY > 300);
    };

    // Set initial visibility based on screen size
    const isMobile = window.innerWidth < 768;
    setIsVisible(!isMobile);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add smooth scrolling behavior
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active section immediately for better UX
      setActiveSection(sectionId);
      
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setActiveSection(sectionId);
      }, 100);
    }
  };

  return (
    <motion.div 
      className={styles.navigation}
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={styles.timelineContainer}>
        {/* Main vertical line */}
        <motion.div 
          className={styles.timelineLine}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Navigation items */}
        <nav className={styles.timelineNav}>
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.8 }}
            >
              {/* Timeline dot */}
              <motion.div 
                className={`${styles.timelineDot} ${activeSection === section.id ? styles.active : ''}`}
                animate={{
                  scale: activeSection === section.id ? 1.2 : 1,
                  backgroundColor: activeSection === section.id ? '#000' : 'rgba(0, 0, 0, 0.3)'
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Horizontal branch line */}
              <motion.div 
                className={`${styles.branchLine} ${activeSection === section.id ? styles.active : ''}`}
                animate={{
                  width: activeSection === section.id ? '25px' : '20px',
                  backgroundColor: activeSection === section.id ? '#000' : 'rgba(0, 0, 0, 0.4)'
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Navigation button */}
              <motion.button
                className={`${styles.navButton} ${activeSection === section.id ? styles.active : ''}`}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ 
                  scale: 1.05,
                  x: 5
                }}
                whileTap={{ scale: 0.95 }}
                title={section.label}
                animate={{
                  x: activeSection === section.id ? 8 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className={styles.navIcon}
                  animate={{
                    scale: activeSection === section.id ? 1.2 : 1,
                    opacity: activeSection === section.id ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <section.icon />
                </motion.span>
                <motion.span 
                  className={styles.navLabel}
                  animate={{
                    color: activeSection === section.id ? '#000' : '#666',
                    fontWeight: activeSection === section.id ? 'bold' : 'medium'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {section.label}
                </motion.span>
              </motion.button>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Navigation;
