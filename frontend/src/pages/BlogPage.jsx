import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { blogPosts } from '../data/siteContent';

export default function BlogPage() {
  const [search, setSearch] = useState('');

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return blogPosts;
    return blogPosts.filter((post) => `${post.title} ${post.category} ${post.excerpt}`.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <>
      <PageMeta title="Blog" description="Read insights, product updates, and technical articles from AZ MEER." path="/blog" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Blog & Insights" title="Thoughtful updates on product, engineering, and digital growth" subtitle="Content designed for business leaders, product teams, and technical stakeholders." align="left" />

        <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search articles" className="w-full rounded-full border border-white/10 bg-slate-950/80 py-3 pl-11 pr-4 text-white placeholder:text-slate-500" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-200">{post.category}</div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{post.title}</h3>
              <p className="mt-4 text-slate-300">{post.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-300">{tag}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                <span>{post.author}</span>
                <span>{post.readingTime}</span>
              </div>
              <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">Read article</Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
