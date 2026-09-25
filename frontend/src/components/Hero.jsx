import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Layers3, MonitorSmartphone, ShieldCheck, Sparkles } from 'lucide-react';
import Button from './Button';

const indicators = ['Full Stack Development', 'Modern Technologies', 'On-Time Delivery', '24/7 Support'];

const techBadges = [
  { label: 'React', color: 'bg-surface text-text-primary border-border' },
  { label: 'Node', color: 'bg-surface text-text-primary border-border' },
  { label: 'Mongo', color: 'bg-surface text-text-primary border-border' },
  { label: 'UI/UX', color: 'bg-surface text-text-primary border-border' },
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate mx-auto flex min-h-[100vh] max-w-7xl items-center px-4 pb-12 pt-28 md:px-6 lg:pt-32">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-on-light-muted)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
            Your Vision → Our Code
          </div>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.08em] text-[var(--text-on-light-heading)] md:text-6xl xl:text-[5rem]">
            We Build Digital
            <span className="block">Solutions That Grow</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]">Your Business</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[var(--text-on-light-muted)] md:text-lg">
            Step by Step is a modern software house specializing in web, mobile and custom software development. We transform ideas into powerful digital products that make a real impact.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button>
              Get a Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary">View Our Work</Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 md:grid-cols-4">
            {indicators.map((item) => (
              <div key={item} className="rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] px-3 py-3 text-center text-xs font-medium text-[var(--text-on-light-heading)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-0 rounded-2xl bg-[rgba(224,169,109,0.15)] blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light)] p-4 shadow-[var(--shadow-card)]">
            <div className="rounded-xl border border-[var(--border-light)] bg-[var(--surface-light)] p-4">
              <div className="mb-4 flex items-center justify-between rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <MonitorSmartphone className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                  team workspace
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
                <div className="rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-on-light-muted)]">Sprint 24</div>
                      <div className="mt-2 text-xl font-semibold text-[var(--text-on-light-heading)]">Product Launch</div>
                    </div>
                    <div className="rounded-md border border-[var(--accent)] bg-[var(--accent)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--on-accent)]">Live</div>
                  </div>

                  <div className="space-y-3">
                    {[60, 82, 68, 90].map((width, index) => (
                      <div key={index}>
                        <div className="mb-1 flex justify-between text-[10px] uppercase tracking-[0.16em] text-[var(--text-on-light-muted)]">
                          <span>Module {index + 1}</span>
                          <span>{width}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-[var(--surface-light-hover)]">
                          <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-on-light-muted)]">
                      <Cpu className="h-3.5 w-3.5 text-[var(--text-on-light-muted)]" />
                      Build
                    </div>
                    <div className="text-3xl font-semibold text-[var(--text-on-light-heading)]">12k</div>
                    <div className="mt-1 text-xs text-[var(--text-on-light-muted)]">Lines shipped</div>
                  </div>
                  <div className="rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-on-light-muted)]">
                      <Layers3 className="h-3.5 w-3.5 text-[var(--text-on-light-muted)]" />
                      Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {techBadges.map((badge) => (
                        <span key={badge.label} className={`rounded-full border px-2 py-1 text-[10px] font-medium ${badge.color}`}> 
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-on-light-muted)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--text-on-light-muted)]" />
                    Security
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[var(--text-on-light-heading)]">Enterprise</div>
                </div>
                <div className="rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-on-light-muted)]">
                    <Code2 className="h-3.5 w-3.5 text-[var(--text-on-light-muted)]" />
                    QA
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[var(--text-on-light-heading)]">99.9%</div>
                </div>
                <div className="rounded-md border border-[var(--border-light)] bg-[var(--surface-light)] p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-on-light-muted)]">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--text-on-light-muted)]" />
                    UX
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[var(--text-on-light-heading)]">Conversion</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-6 top-16 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-3 py-3 text-sm font-medium text-[var(--on-accent)]">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[var(--on-accent)]/80">Design</span>
            3D Product UI
          </motion.div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-4 bottom-10 rounded-md border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-3 text-sm font-medium text-[var(--text-on-light-heading)]">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[var(--text-on-light-muted)]">Launch</span>
            Growth Focused
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
