import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) => {
  const baseClasses = 'px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'glass text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30',
    ghost: 'text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5',
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
