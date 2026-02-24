'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CrosshairCursor({ enabled = true }: { enabled?: boolean }) {
  const [isHovering, setIsHovering] = useState(false);
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

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Crosshair design */}
        <motion.div
          className="relative"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Center dot */}
          <motion.div
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{ left: '-2px', top: '-2px' }}
            animate={{
              boxShadow: isHovering 
                ? '0 0 10px rgba(255, 106, 0, 1)' 
                : '0 0 5px rgba(255, 106, 0, 0.8)',
            }}
          />
          
          {/* Horizontal line */}
          <motion.div
            className="absolute bg-primary"
            style={{
              width: '20px',
              height: '1px',
              left: '-10px',
              top: '-0.5px',
            }}
            animate={{
              width: isHovering ? '30px' : '20px',
              left: isHovering ? '-15px' : '-10px',
            }}
          />
          
          {/* Vertical line */}
          <motion.div
            className="absolute bg-primary"
            style={{
              width: '1px',
              height: '20px',
              left: '-0.5px',
              top: '-10px',
            }}
            animate={{
              height: isHovering ? '30px' : '20px',
              top: isHovering ? '-15px' : '-10px',
            }}
          />
          
          {/* Corner brackets */}
          {[0, 90, 180, 270].map((rotation, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: '8px',
                height: '8px',
                left: '-4px',
                top: '-4px',
                transform: `rotate(${rotation}deg)`,
              }}
              animate={{
                scale: isHovering ? 1.3 : 1,
              }}
            >
              <div className="absolute w-full h-[1px] bg-primary" style={{ top: 0 }} />
              <div className="absolute w-[1px] h-full bg-primary" style={{ left: 0 }} />
            </motion.div>
          ))}
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
