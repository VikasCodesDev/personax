'use client';

import { motion } from 'framer-motion';
import EnhancedTypewriter from './EnhancedTypewriter';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  delay?: number;
}

export default function PageHeader({ title, subtitle, delay = 0 }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-center mb-12"
    >
      <EnhancedTypewriter
        text={title}
        className="text-5xl font-bold heading-font text-white mb-4"
        speed={80}
        delay={delay * 1000 + 200}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + title.length * 0.08 + 0.5 }}
        className="text-xl text-gray-400"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
