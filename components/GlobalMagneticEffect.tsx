'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GlobalMagneticEffect() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    let buttons: HTMLElement[] = [];
    let animationFrameId: number;

    const updateButtons = () => {
      // Get all buttons, links, and interactive elements
      buttons = Array.from(
        document.querySelectorAll(
          'button:not([data-no-magnetic]), a:not([data-no-magnetic]), [role="button"]:not([data-no-magnetic])'
        )
      ) as HTMLElement[];
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      animationFrameId = requestAnimationFrame(() => {
        buttons.forEach((button) => {
          const rect = button.getBoundingClientRect();
          const buttonCenterX = rect.left + rect.width / 2;
          const buttonCenterY = rect.top + rect.height / 2;

          const distanceX = e.clientX - buttonCenterX;
          const distanceY = e.clientY - buttonCenterY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          // Magnetic range (pixels)
          const magneticRange = 100;

          if (distance < magneticRange && distance > 0) {
            const strength = (magneticRange - distance) / magneticRange;
            const pullX = distanceX * strength * 0.3;
            const pullY = distanceY * strength * 0.3;

            button.style.transform = `translate(${pullX}px, ${pullY}px)`;
            button.style.transition = 'transform 0.1s ease-out';
          } else {
            button.style.transform = 'translate(0px, 0px)';
            button.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
          }
        });
      });
    };

    const handleMouseLeave = () => {
      buttons.forEach((button) => {
        button.style.transform = 'translate(0px, 0px)';
        button.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    };

    // Initialize
    updateButtons();
    
    // Update buttons list when DOM changes
    const observer = new MutationObserver(updateButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      
      // Reset all transforms
      buttons.forEach((button) => {
        button.style.transform = '';
        button.style.transition = '';
      });
    };
  }, [mouseX, mouseY]);

  return null;
}
