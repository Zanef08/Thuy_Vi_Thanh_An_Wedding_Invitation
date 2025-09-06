import { useState, useEffect } from 'react';

// Utility functions for image management

// All available images from the assets folder
export const WEDDING_IMAGES = [
  'FTW00366.jpg',
  'FTW00582.jpg',
  'FTW00605.jpg',
  'FTW00796.jpg',
  'FTW00803.jpg',
  'FTW00837.jpg',
  'FTW00904.jpg',
  'FTW01067.jpg',
  'FTW01089.jpg',
  'FTW01213.jpg',
  'FTW01220.jpg',
  'FTW01290.jpg',
  'FTW01306.jpg',
  'FTW01368.jpg',
  'FTW01414.jpg',
  'FTW01480.jpg',
  'FTW01493.jpg',
  'FTW01542.jpg',
  'FTW01603.jpg',
  'FTW01716.jpg',
  'FTW01732.jpg',
  'FTW01769.jpg',
  'FTW01782.jpg',
  'FTW01934.jpg',
  'FTW01955.jpg',
  'FTW02061.jpg',
  'FTW02205.jpg',
  'FTW02243.jpg',
  'FTW02291.jpg',
  'FTW02606.jpg',
  'FTW02697.jpg',
  'FTW02724.jpg'
];

// Get full image path
export const getImagePath = (imageName) => `/assets/${imageName}`;

// Get all image paths
export const getAllImagePaths = () => WEDDING_IMAGES.map(getImagePath);

// Get random images for hero/bottom sections
export const getRandomImages = (count = 2) => {
  const shuffled = [...WEDDING_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(getImagePath);
};

// Preload images for better performance
export const preloadImages = (imagePaths) => {
  return Promise.all(
    imagePaths.map(path => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = path;
      });
    })
  );
};

// Lazy load images with intersection observer
export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  useEffect(() => {
    if (!imageRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(imageRef);
        }
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(imageRef);

    return () => {
      if (imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src, options]);

  return [imageSrc, setImageRef];
};
