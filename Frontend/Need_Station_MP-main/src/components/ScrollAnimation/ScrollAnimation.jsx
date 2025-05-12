import React, { useEffect, useRef } from 'react';
import styles from './ScrollAnimation.module.css';

const ScrollAnimation = ({ children, type = 'fade', delay = 0, threshold = 0.2 }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            ref.current.classList.add(styles.visible);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);
  
  return (
    <div 
      ref={ref} 
      className={`${styles.animated} ${styles[type]}`} 
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
