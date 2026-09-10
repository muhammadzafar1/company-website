import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Layers3, MonitorSmartphone, ShieldCheck, Sparkles } from 'lucide-react';
import Button from './Button';

const indicators = ['Full Stack Development', 'Modern Technologies', 'On-Time Delivery', '24/7 Support'];

const techBadges = [
  { label: 'React', color: 'bg-sky-500/15 text-sky-200 border-sky-400/30' },
  { label: 'Node', color: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30' },
  { label: 'Mongo', color: 'bg-amber-500/15 text-amber-200 border-amber-400/30' },
  { label: 'UI/UX', color: 'bg-violet-500/15 text-violet-200 border-violet-400/30' },
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate mx-auto flex min-h-[100vh] max-w-7xl items-center px-4 pb-12 pt-28 md:px-6 lg:pt-32">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200">
            <Sparkles className="h-3.5 w-3.5" />
            Your Vision → Our Code
          </div>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.08em] text-white md:text-6xl xl:text-[5rem]">
            We Build Digital
            <span className="block">Solutions That Grow</span>
            <span className="bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#60a5fa] bg-clip-text text-transparent">Your Business</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
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
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center text-xs font-medium text-slate-200 backdrop-blur-md">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.8)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  <MonitorSmartphone className="h-3.5 w-3.5" />
                  team workspace
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
                <div className="rounded-2xl border border-sky-400/20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Sprint 24</div>
                      <div className="mt-2 text-xl font-semibold text-white">Product Launch</div>
                    </div>
                    <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Live</div>
                  </div>

                  <div className="space-y-3">
                    {[60, 82, 68, 90].map((width, index) => (
                      <div key={index}>
                        <div className="mb-1 flex justify-between text-[10px] uppercase tracking-[0.16em] text-slate-400">
                          <span>Module {index + 1}</span>
                          <span>{width}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                      <Cpu className="h-3.5 w-3.5 text-sky-300" />
                      Build
                    </div>
                    <div className="text-3xl font-semibold text-white">12k</div>
                    <div className="mt-1 text-xs text-slate-400">Lines shipped</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                      <Layers3 className="h-3.5 w-3.5 text-sky-300" />
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
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                    Security
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">Enterprise</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    <Code2 className="h-3.5 w-3.5 text-sky-300" />
                    QA
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">99.9%</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                    UX
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">Conversion</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-6 top-16 rounded-2xl border border-sky-400/20 bg-slate-900/80 px-3 py-3 text-sm font-medium text-sky-200 backdrop-blur-md">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400">Design</span>
            3D Product UI
          </motion.div>

          <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-4 bottom-10 rounded-2xl border border-cyan-400/20 bg-slate-900/80 px-3 py-3 text-sm font-medium text-cyan-200 backdrop-blur-md">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400">Launch</span>
            Growth Focused
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
