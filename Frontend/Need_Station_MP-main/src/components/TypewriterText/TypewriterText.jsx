import React, { useState, useEffect, useRef } from 'react';
import styles from './TypewriterText.module.css';

const TypewriterText = ({ words, delay = 2000, typingSpeed = 150, deletingSpeed = 80 }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typeSpeed, setTypeSpeed] = useState(typingSpeed);
  const typingRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );
      
      setTypeSpeed(isDeleting ? deletingSpeed : typingSpeed);

      // If completed typing the full word
      if (!isDeleting && text === fullText) {
        // Wait before starting to delete
        setTimeout(() => setIsDeleting(true), delay);
      } 
      // If done deleting
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    typingRef.current = setTimeout(handleTyping, typeSpeed);
    
    // Clean up timeout
    return () => clearTimeout(typingRef.current);
  }, [text, isDeleting, loopNum, words, delay, typingSpeed, deletingSpeed, typeSpeed]);

  return (
    <span className={styles.typewriterText}>
      {text}
      <span className={styles.cursor}></span>
    </span>
  );
};

export default TypewriterText;
