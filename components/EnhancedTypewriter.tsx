'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnhancedTypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export default function EnhancedTypewriter({
  text,
  className = '',
  speed = 80,
  delay = 300,
}: EnhancedTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaret, setShowCaret] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Start after delay
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Blink caret after completion
      const caretInterval = setInterval(() => {
        setShowCaret((prev) => !prev);
      }, 530);

      return () => clearInterval(caretInterval);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <div className={className}>
      {displayedText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
          className="inline-block"
          style={{
            textShadow: '0 0 20px rgba(255, 106, 0, 0.6)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {currentIndex >= text.length && (
        <motion.span
          className="inline-block w-0.5 h-[0.8em] bg-primary ml-1 align-middle"
          animate={{ opacity: showCaret ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          style={{
            boxShadow: '0 0 8px rgba(255, 106, 0, 0.8)',
          }}
        />
      )}
    </div>
  );
}
