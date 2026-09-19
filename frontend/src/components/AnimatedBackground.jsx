import { motion } from 'framer-motion';

const floatingItems = [
  { text: '</>', left: '14%', top: '18%', delay: 0 },
  { text: 'React', left: '72%', top: '18%', delay: 1.2 },
  { text: 'Node', left: '80%', top: '58%', delay: 2.5 },
  { text: 'Mongo', left: '18%', top: '72%', delay: 0.9 },
  { text: 'API', left: '64%', top: '74%', delay: 1.7 },
  { text: 'JS', left: '42%', top: '16%', delay: 2.1 },
];

const particles = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  size: 8 + (i % 6) * 4,
  left: `${(i * 13) % 100}%`,
  top: `${(i * 17) % 100}%`,
  duration: 8 + (i % 8),
  delay: (i % 7) * 0.8,
}));

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(205,133,63,0.12),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(168,103,47,0.08),transparent_24%)]" />
      <motion.div
        className="absolute -left-24 top-14 h-72 w-72 rounded-full bg-[var(--accent)]/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 24, -8], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[var(--accent-hover)]/20 blur-3xl"
        animate={{ x: [0, -48, 0], y: [0, -24, 14], scale: [1, 1.12, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:80px_80px] opacity-15" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-slate-300/40"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            opacity: [0.12, 0.6, 0.12],
            y: [0, -8, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {floatingItems.map((item) => (
        <motion.div
          key={item.text}
          className="absolute text-[10px] font-semibold tracking-[0.18em] text-slate-500/80"
          style={{ left: item.left, top: item.top }}
          animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.4] }}
          transition={{ duration: 7, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.text}
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 opacity-25"
        animate={{ backgroundPositionX: ['0%', '100%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: 'linear-gradient(120deg, transparent 0%, rgba(205,133,63,0.08) 30%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
