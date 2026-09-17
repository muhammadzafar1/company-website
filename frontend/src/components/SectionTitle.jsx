import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className={align === 'left' ? 'mb-10 text-left' : 'mb-10 text-center'}
    >
      <span className="mb-4 inline-flex rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-dark)]">
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-[var(--text-primary)] md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-[var(--text-muted)] md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
