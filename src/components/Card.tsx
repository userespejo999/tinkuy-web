import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};