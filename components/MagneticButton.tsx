'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function MagneticButton({ children, href, onClick, variant = 'primary' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const scale = useTransform(xSpring, [-100, 0, 100], [1.05, 1, 1.05]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Magnetic pull effect
      const magneticStrength = 0.4;
      x.set(distanceX * magneticStrength);
      y.set(distanceY * magneticStrength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered, x, y]);

  const buttonContent = (
    <motion.div
      ref={ref}
      className={`relative px-8 py-4 rounded-lg font-bold text-lg overflow-hidden ${
        variant === 'primary'
          ? 'bg-primary text-black'
          : 'bg-transparent border-2 border-primary text-primary'
      }`}
      style={{
        x: xSpring,
        y: ySpring,
        scale,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary to-orange-600 opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          x: isHovered ? ['0%', '200%'] : '0%',
        }}
        transition={{
          opacity: { duration: 0.3 },
          x: { duration: 0.8, repeat: Infinity, repeatDelay: 2 },
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Border glow */}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            boxShadow: isHovered ? '0 0 30px rgba(255, 106, 0, 0.6)' : '0 0 0px rgba(255, 106, 0, 0)',
          }}
          animate={{
            boxShadow: isHovered
              ? '0 0 30px rgba(255, 106, 0, 0.6)'
              : '0 0 0px rgba(255, 106, 0, 0)',
          }}
        />
      )}

      {/* Primary glow */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            boxShadow: isHovered ? '0 0 40px rgba(255, 106, 0, 0.8)' : '0 0 20px rgba(255, 106, 0, 0.4)',
          }}
          animate={{
            boxShadow: isHovered
              ? '0 0 40px rgba(255, 106, 0, 0.8)'
              : '0 0 20px rgba(255, 106, 0, 0.4)',
          }}
        />
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return <button onClick={onClick}>{buttonContent}</button>;
}
