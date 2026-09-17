import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { portfolioCases } from '../data/siteContent';

export default function PortfolioPage() {
  const [search, setSearch] = useState('');

  const filteredCases = useMemo(() => {
    if (!search.trim()) return portfolioCases;
    return portfolioCases.filter((item) => `${item.title} ${item.category} ${item.client}`.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <>
      <PageMeta title="Portfolio" description="Explore AZ MEER portfolio projects and digital transformation work across web, mobile, and operations." path="/portfolio" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Portfolio" title="Selected client work and product stories" subtitle="Case studies and project examples that show how we work across digital strategy, product design, and delivery." align="left" />

        <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search portfolio" className="w-full rounded-full border border-white/10 bg-slate-950/80 py-3 pl-11 pr-4 text-white placeholder:text-slate-500" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCases.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70">
              <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-200">{item.category}</div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-300">{tech}</span>
                  ))}
                </div>
                <Link to={`/portfolio/${item.slug}`} className="mt-5 inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">Case Study</Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
