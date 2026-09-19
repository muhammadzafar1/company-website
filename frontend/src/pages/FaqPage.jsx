import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { faqCategories, faqItems } from '../data/siteContent';

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = useMemo(() => {
    return faqItems.filter((item) => {
      const categoryOK = category === 'All' || item.category === category;
      const searchOK = !search || `${item.question} ${item.answer}`.toLowerCase().includes(search.toLowerCase());
      return categoryOK && searchOK;
    });
  }, [search, category]);

  return (
    <>
      <PageMeta title="FAQ" description="Frequently asked questions about AZ MEER services, products, and company information." path="/faq" />

      <main className="mx-auto max-w-5xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="FAQ" title="Answers to common questions" subtitle="A simple, searchable FAQ structure for support and onboarding." align="left" />

        <div className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--dark-surface)] p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-onDarkMuted)]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search FAQ" className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)]">
            <option value="General">General</option>
            <option value="Applications">Applications</option>
            <option value="Client Services">Client Services</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((item, index) => (
            <div key={item.question} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--dark-surface)] p-4">
              <button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left">
                <span className="text-lg font-medium text-[var(--text-onDark)]">{item.question}</span>
                <ChevronDown className={`h-5 w-5 text-[var(--text-onDarkMuted)] transition ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && <p className="mt-4 text-[var(--text-onDarkMuted)]">{item.answer}</p>}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8 text-center">
          <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">Need more help?</h3>
          <p className="mt-3 text-[var(--text-onDarkMuted)]">Contact the team for project, support, or partnership questions.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-[var(--brand)] px-5 py-3 font-medium text-white">Contact support</Link>
        </div>
      </main>
    </>
  );
}
