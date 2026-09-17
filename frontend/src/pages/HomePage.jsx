import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BriefcaseBusiness, ChevronRight, Code2, Database, Globe, MessageSquareQuote, Smartphone, Sparkles, Star, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { companyProfile, faqItems, productCatalog, serviceHighlights, techStack, testimonials } from '../data/siteContent';

const heroStats = [
  { label: 'Projects', value: '50+' },
  { label: 'Clients', value: '30+' },
  { label: 'Experience', value: '6+ yrs' },
  { label: 'Support', value: '24/7' },
];

const featureIndicators = ['Web products', 'Mobile apps', 'Automation', 'Business systems'];

export default function HomePage() {
  return (
    <>
      <PageMeta title="Home" description="AZ MEER (SMC-PRIVATE) LIMITED builds premium mobile, web, and business technology solutions." path="/" />

      

      <main>
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Mission & Vision" title="Technology built around performance, trust, and measurable results" subtitle="We help businesses evolve with software that supports growth, reliability, and user confidence." align="left" />

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Mission</h3>
              <p className="mt-4 text-slate-300">To deliver practical, secure, and scalable digital solutions that help organizations simplify operations and grow with confidence.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Vision</h3>
              <p className="mt-4 text-slate-300">To become a trusted technology partner for organizations building products, operations, and experiences that matter.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle eyebrow="Featured Products" title="Application solutions designed for business growth" subtitle="A modern portfolio of digital products for mobile, web, and operational workflows." />

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {productCatalog.map((product, index) => (
              <motion.article key={product.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-emerald-400/20 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200">{product.category}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-200"><Star className="h-3 w-3" /> {product.rating}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{product.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-300">{feature}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <Link to={`/products/${product.slug}`} className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">Live Demo</Link>
                    <a href={product.playStore} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100">Play Store</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle eyebrow="Services" title="Full-service digital delivery from strategy to support" subtitle="We help businesses plan, build, optimize, and maintain technology that scales." />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceHighlights.map((service, index) => {
              const Icon = [{ name: 'Smartphone', value: Smartphone }, { name: 'Code2', value: Code2 }, { name: 'Paintbrush2', value: null }, { name: 'Layers3', value: null }, { name: 'Zap', value: Zap }, { name: 'ShieldCheck', value: null }][index].value || Code2;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -8 }} className="rounded-[1.75rem] border border-white/10 bg-slate-900/65 p-6">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-200 ring-1 ring-emerald-400/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">{service.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-200">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle eyebrow="Testimonials" title="Client feedback from product and business partnerships" subtitle="We work closely with clients to turn ideas into scalable digital experiences." />

          <div className="grid gap-6 lg:grid-cols-3">
            {faqItems.slice(0, 3).map((item, index) => (
              <motion.div key={item.question} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
                <div className="mb-4 flex items-center gap-1 text-amber-300">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-lg leading-8 text-slate-200">“{item.answer}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-sm font-semibold text-white">{item.category.slice(0, 1)}</div>
                  <div>
                    <div className="font-semibold text-white">Client</div>
                    <div className="text-sm text-slate-400">{item.category}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle eyebrow="Technology Stack" title="Modern tools for secure, flexible, and maintainable systems" subtitle="We combine practical engineering choices with proven technology to support sustainable delivery." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {techStack.map((group, index) => (
              <motion.div key={group.group} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5">
                <h3 className="text-lg font-semibold text-white">{group.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-100">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle eyebrow="Latest News" title="Announcements, product updates, and insights" subtitle="A simple feed for company updates and technical knowledge sharing." />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: 'Product architecture roadmap', tag: 'Company News', summary: 'How we plan sustainable product growth with maintainable engineering foundations.' },
              { title: 'App delivery checklist', tag: 'Mobile Development', summary: 'The practical delivery steps needed for a high-quality app release.' },
              { title: 'Design systems for product teams', tag: 'UI/UX', summary: 'Why strong system design reduces friction and improves product consistency.' },
            ].map((article, index) => (
              <motion.div key={article.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-200">{article.tag}</div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{article.title}</h3>
                <p className="mt-4 text-slate-300">{article.summary}</p>
                <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-200">Read more <ChevronRight className="h-4 w-4" /></Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 pt-20 md:px-6">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-emerald-950/70 p-8 text-center md:p-12">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">Have a project in mind?</p>
            <h3 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Let’s design the right solution for your next digital product.</h3>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary">Request a Quote</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
