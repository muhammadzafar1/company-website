import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300';
  const variants = {
    primary: 'bg-gradient-to-r from-[#0A84FF] to-[#2563EB] text-white shadow-glow hover:shadow-[0_20px_40px_rgba(37,99,235,0.35)]',
    secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
    ghost: 'text-sky-200 hover:bg-white/5',
  };

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}
