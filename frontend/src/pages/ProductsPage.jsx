import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import api, { unwrapApiData } from '../api/api';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';

const initialProducts = [
  {
    _id: 'sample-1',
    slug: 'mezzy-mobile-app',
    title: 'Mezzy Mobile App',
    description: 'A customer-focused mobile experience built for booking, engagement, and secure access.',
    category: 'Mobile App',
    platforms: 'Android / iOS / Web',
    technologies: ['Flutter', 'Node.js', 'APIs'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    link: '#',
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get('/products');
        const list = unwrapApiData(response, 'projects') || unwrapApiData(response, 'products') || [];
        if (list.length) setProducts(list);
      } catch (error) {
        console.error('Unable to load products', error);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = !search || [product.title, product.description, product.category].join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = platformFilter === 'All' || product.platform === platformFilter || product.platforms === platformFilter || (Array.isArray(product.platforms) && product.platforms.includes(platformFilter));
      return matchesSearch && matchesPlatform;
    });
  }, [products, search, platformFilter]);

  const platformOptions = ['All', 'Web', 'Android', 'iOS', 'Android / iOS / Web'];

  return (
    <>
      <PageMeta title="Products" description="Explore AZ MEER products and applications for mobile, web, and business workflows." path="/products" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Products & Applications" title="Application portfolio built for customer and business impact" subtitle="Browse digital products designed for mobile experiences, operational tools, and scalable web systems." align="left" />

        <div className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="w-full rounded-full border border-white/10 bg-slate-950/80 py-3 pl-11 pr-4 text-white placeholder:text-slate-500" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select value={platformFilter} onChange={(event) => setPlatformFilter(event.target.value)} className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-white">
              {platformOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article key={product._id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70">
              <div className="relative overflow-hidden">
                <img src={product.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'} alt={product.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute left-4 top-4 rounded-full border border-emerald-400/20 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-200">{product.category}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-white">{product.title}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-200"><Star className="h-3 w-3" /> 4.8</span>
                </div>
                <p className="mt-3 text-slate-300">{product.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(product.technologies || ['React', 'Node']).map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">{tech}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{product.platform || product.platforms || 'Web'}</span>
                  <Link to={`/products/${product.slug || product._id}`} className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">View Details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
