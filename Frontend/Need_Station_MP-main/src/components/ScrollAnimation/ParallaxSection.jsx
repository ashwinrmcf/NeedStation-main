import { useEffect, useRef, useState } from 'react';
import styles from './ParallaxSection.module.css';

const ParallaxSection = ({ 
  children, 
  bgColor = "#000", 
  speed = 0.1, 
  textColor = "#fff",
  title,
  subtitle
}) => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is from the middle of the viewport
      const viewportMiddle = windowHeight / 2;
      const sectionMiddle = top + sectionRef.current.offsetHeight / 2;
      const distanceFromMiddle = sectionMiddle - viewportMiddle;
      
      // Apply parallax effect
      setOffset(distanceFromMiddle * speed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section 
      ref={sectionRef} 
      className={styles.parallaxSection}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div 
        className={styles.parallaxContent}
        style={{ transform: `translateY(${offset}px)` }}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.children}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
