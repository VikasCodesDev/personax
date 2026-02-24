'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function Typewriter({ text, className = '', speed = 100 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
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
      }, 500);

      return () => clearInterval(caretInterval);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={className}>
      {displayedText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          style={{
            textShadow: '0 0 20px rgba(255, 106, 0, 0.8)',
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-1 h-16 bg-primary ml-2 align-middle"
        animate={{ opacity: showCaret && currentIndex >= text.length ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        style={{
          boxShadow: '0 0 10px rgba(255, 106, 0, 1)',
        }}
      />
    </div>
  );
}
