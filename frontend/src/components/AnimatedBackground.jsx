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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%)]" />
      <motion.div
        className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, -10], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -30, 18], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:80px_80px] opacity-25" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.9))]" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            boxShadow: '0 0 18px rgba(96,165,250,0.3)',
          }}
          animate={{
            opacity: [0.15, 0.7, 0.15],
            y: [0, -18, 0],
            x: [0, 16, 0],
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
          className="absolute text-[10px] font-semibold tracking-[0.24em] text-sky-200/60"
          style={{ left: item.left, top: item.top }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.5] }}
          transition={{ duration: 7, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.text}
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ backgroundPositionX: ['0%', '100%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: 'linear-gradient(120deg, transparent 0%, rgba(96,165,250,0.18) 30%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
