import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import api, { unwrapApiData } from '../api/api';

export default function PortfolioPage() {
  const [search, setSearch] = useState('');
  const [portfolioCases, setPortfolioCases] = useState([]);

  useEffect(() => {
    api.get('/portfolio')
      .then((response) => setPortfolioCases(unwrapApiData(response, 'portfolio')))
      .catch((error) => console.error('Unable to load portfolio', error));
  }, []);

  const filteredCases = useMemo(() => {
    if (!search.trim()) return portfolioCases;
    return portfolioCases.filter((item) => `${item.title} ${item.category} ${item.client}`.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <>
      <PageMeta title="Portfolio" description="Explore AZ MEER portfolio projects and digital transformation work across web, mobile, and operations." path="/portfolio" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Portfolio" title="Selected client work and product stories" subtitle="Case studies and project examples that show how we work across digital strategy, product design, and delivery." align="left" />

        <div className="light-card mb-8 rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-on-dark-muted)]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search portfolio" className="w-full rounded-full border border-[var(--border-light)] bg-[var(--surface-darker)] py-3 pl-11 pr-4 text-[var(--text-on-dark-heading)] placeholder:text-[var(--text-on-dark-muted)]" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCases.map((item) => (
            <article key={item.slug} className="light-card overflow-hidden rounded-[1.75rem] border border-[var(--border-light)] bg-[var(--surface-light)]">
              <img src={item.image} alt={item.title} width="640" height="427" loading="lazy" decoding="async" className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">{item.category}</div>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--text-on-dark-heading)]">{item.title}</h3>
                <p className="mt-3 text-sm text-[var(--text-on-dark-body)]">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="skill-pill rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.12em]">{tech}</span>
                  ))}
                </div>
                <Link to={`/portfolio/${item.slug}`} className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-4 py-2 text-sm font-medium text-[var(--on-accent)]">Case Study</Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
