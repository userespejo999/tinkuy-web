import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      className={`bg-gradient-to-r from-orange-200/30 via-orange-300/40 to-orange-200/30 dark:from-orange-900/30 dark:via-orange-800/40 dark:to-orange-900/30 rounded-lg ${className}`}
    />
  );
};
