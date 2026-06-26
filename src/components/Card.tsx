import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Card = ({ children, className = '', delay = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`
        glass rounded-2xl p-5 
        hover:shadow-[var(--shadow-glow)] 
        hover:border-[var(--accent-primary)]/40
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
