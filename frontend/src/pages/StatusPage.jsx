import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { statusCards } from '../data/siteContent';

export default function StatusPage() {
  return (
    <>
      <PageMeta title="System Status" description="Current demo status for AZ MEER website systems and services." path="/status" />

      <main className="mx-auto max-w-5xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="System Status" title="Service health overview" subtitle="Values shown here are configurable and intended as a demo-ready service status page." align="left" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {statusCards.map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 text-center">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
              <div className={`mt-4 text-lg font-semibold ${item.tone === 'good' ? 'text-emerald-300' : 'text-amber-300'}`}>{item.value}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
