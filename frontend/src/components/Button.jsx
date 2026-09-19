import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300';
  const variants = {
    primary: 'bg-[var(--accent)] text-[var(--on-accent)] rounded-md shadow-[var(--shadow-card)] hover:bg-[var(--accent-hover)]',
    secondary: 'border border-[var(--border-light)] bg-[var(--surface-light)] text-[var(--text-on-light-heading)] rounded-md hover:bg-[var(--surface-light-hover)] hover:text-[var(--link-on-light-hover)]',
    ghost: 'text-[var(--text-on-light-heading)] hover:bg-[var(--surface-light)]',
  };

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}
