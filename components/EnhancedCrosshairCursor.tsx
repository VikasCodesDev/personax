'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function EnhancedCrosshairCursor({ enabled = true }: { enabled?: boolean }) {
  const [isTargeting, setIsTargeting] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkTargeting = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.role === 'button';

      setIsTargeting(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkTargeting);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkTargeting);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Crosshair design with target-lock */}
        <motion.div
          className="relative"
          animate={{
            scale: isTargeting ? 1.8 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Center dot */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-primary rounded-full"
            style={{ left: '-3px', top: '-3px' }}
            animate={{
              scale: isTargeting ? 1.3 : 1,
              boxShadow: isTargeting
                ? '0 0 15px rgba(255, 106, 0, 1)'
                : '0 0 6px rgba(255, 106, 0, 0.8)',
            }}
          />

          {/* Horizontal line */}
          <motion.div
            className="absolute bg-primary"
            style={{
              width: '24px',
              height: '1.5px',
              left: '-12px',
              top: '-0.75px',
            }}
            animate={{
              width: isTargeting ? '36px' : '24px',
              left: isTargeting ? '-18px' : '-12px',
              opacity: isTargeting ? 1 : 0.8,
            }}
          />

          {/* Vertical line */}
          <motion.div
            className="absolute bg-primary"
            style={{
              width: '1.5px',
              height: '24px',
              left: '-0.75px',
              top: '-12px',
            }}
            animate={{
              height: isTargeting ? '36px' : '24px',
              top: isTargeting ? '-18px' : '-12px',
              opacity: isTargeting ? 1 : 0.8,
            }}
          />

          {/* Corner brackets with target-lock animation */}
          {[0, 90, 180, 270].map((rotation, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: '10px',
                height: '10px',
                left: '-5px',
                top: '-5px',
                transform: `rotate(${rotation}deg)`,
              }}
              animate={{
                scale: isTargeting ? 1.5 : 1,
                opacity: isTargeting ? 1 : 0.6,
              }}
            >
              <div
                className="absolute w-full h-[1.5px] bg-primary"
                style={{ top: 0 }}
              />
              <div
                className="absolute w-[1.5px] h-full bg-primary"
                style={{ left: 0 }}
              />
            </motion.div>
          ))}

          {/* Outer ring for target-lock effect */}
          {isTargeting && (
            <motion.div
              className="absolute w-16 h-16 border border-primary rounded-full"
              style={{ left: '-32px', top: '-32px' }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      </motion.div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
