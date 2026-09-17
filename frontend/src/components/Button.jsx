import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300';
  const variants = {
    primary: 'bg-[var(--brand)] text-white rounded-md shadow-subtle hover:bg-[var(--brand-dark)]',
    secondary: 'border border-[var(--border)] bg-[var(--panel)] text-[var(--text-primary)] rounded-md hover:bg-[var(--surface)]',
    ghost: 'text-[var(--text-primary)] hover:bg-[var(--surface)]',
  };

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}
