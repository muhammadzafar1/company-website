import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300';
  const variants = {
    primary: 'bg-[#0A84FF] text-white rounded-md shadow-subtle hover:brightness-95',
    secondary: 'border border-gray-200 bg-white text-[#0f172a] rounded-md hover:bg-gray-50',
    ghost: 'text-[#0f172a] hover:bg-gray-50',
  };

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}
