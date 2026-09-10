import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Cloud, Code2, Database, Paintbrush2, ShoppingCart, Smartphone, Sparkles, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../api/api';
import SectionTitle from '../components/SectionTitle';
import Hero from '../components/Hero';
import Button from '../components/Button';

const serviceCards = [
  { title: 'Web Development', description: 'High-performance websites and web apps built around growth and reliability.', icon: Code2, tags: ['React', 'Next.js', 'Tailwind'] },
  { title: 'Mobile App Development', description: 'Native-like mobile experiences for iOS, Android, and cross-platform rollouts.', icon: Smartphone, tags: ['Flutter', 'React Native', 'iOS'] },
  { title: 'Custom Software', description: 'Tailored business systems and internal tools designed to optimize workflows.', icon: Zap, tags: ['ERP', 'Automation', 'Dashboards'] },
  { title: 'UI/UX Design', description: 'Conversion-first product design rooted in strategy, UX research, and testing.', icon: Paintbrush2, tags: ['Figma', 'Design Systems', 'Prototyping'] },
  { title: 'E-Commerce Development', description: 'Sales-ready storefronts engineered for conversion, speed, and trust.', icon: ShoppingCart, tags: ['Shopify', 'Stripe', 'SEO'] },
  { title: 'API Development', description: 'Secure integrations and custom APIs that unlock application interoperability.', icon: Database, tags: ['REST', 'GraphQL', 'JWT'] },
  { title: 'SaaS Development', description: 'Scalable SaaS platforms built to onboard, retain, and expand customers.', icon: BarChart3, tags: ['B2B', 'Subscriptions', 'Analytics'] },
  { title: 'Cloud Solutions', description: 'Modern infrastructure and deployment strategies that reduce operational friction.', icon: Cloud, tags: ['AWS', 'Docker', 'CI/CD'] },
  { title: 'Maintenance & Support', description: 'Ongoing optimization, monitoring, and support to keep products thriving.', icon: Sparkles, tags: ['Monitoring', 'Support', 'Optimization'] },
];

const techGroups = [
  { label: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express.js'] },
  { label: 'Database', items: ['MongoDB', 'MongoDB Atlas'] },
  { label: 'Other', items: ['Git', 'GitHub', 'Docker', 'REST API', 'JWT'] },
];

const portfolioItems = [
  { title: 'Nova Commerce', description: 'A luxury retail platform that increased conversion rates and customer retention.', category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80', technologies: ['React', 'Node', 'Stripe'] },
  { title: 'FlowDesk', description: 'Finance workflow SaaS delivering real-time reporting and collaboration features.', category: 'SaaS', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80', technologies: ['React', 'MongoDB', 'Express'] },
  { title: 'Atlas Health', description: 'Healthcare booking app built for speed, trust, and appointment efficiency.', category: 'Mobile', image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80', technologies: ['React Native', 'Node', 'API'] },
  { title: 'Vision Labs', description: 'B2B analytics dashboard with custom automations and real-time decision support.', category: 'Web', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', technologies: ['React', 'D3', 'MongoDB'] },
];

const teamMembers = [
  { name: 'Ayesha Khan', position: 'Full Stack Developer', skills: ['React', 'Node', 'MongoDB'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { name: 'Musa Ali', position: 'Frontend Developer', skills: ['UI Systems', 'UX', 'Animations'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sara Malik', position: 'Backend Developer', skills: ['APIs', 'Security', 'Scaling'], image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Zain Ahmed', position: 'UI/UX Designer', skills: ['Design', 'Research', 'Prototyping'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Nadia Hassan', position: 'Project Manager', skills: ['Roadmaps', 'Planning', 'Delivery'], image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Usman Farooq', position: 'QA Engineer', skills: ['Testing', 'Automation', 'QA'], image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80' },
];

const processSteps = [
  'Idea & Requirement',
  'Planning',
  'UI/UX Design',
  'Development',
  'Testing',
  'Deployment',
  'Maintenance',
];

const pricingPlans = [
  { name: 'STARTER', price: '$499+', features: ['Landing page design', 'Basic branding', 'Responsive dev', 'Email support'], cta: 'Choose Starter' },
  { name: 'BUSINESS', price: '$999+', features: ['Custom web app', 'Advanced integrations', 'Priority support', 'Team onboarding'], cta: 'Choose Business', recommended: true },
  { name: 'ENTERPRISE', price: 'Custom', features: ['Dedicated team', 'Full product strategy', 'Enterprise security', 'Long-term partnership'], cta: 'Book a Call' },
];

const testimonials = [
  { name: 'Emily Brooks', company: 'Northstar Labs', review: 'Their team transformed our product vision into a smooth, scalable platform that our customers love.', rating: 5, image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=500&q=80' },
  { name: 'Daniel Smith', company: 'Apex Studio', review: 'Professional, strategic, and incredibly responsive. We launched faster than expected with better results.', rating: 5, image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=500&q=80' },
  { name: 'Sarah Ali', company: 'Luma Commerce', review: 'From UI direction to technical delivery, the quality was exceptional throughout the full journey.', rating: 5, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80' },
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState(serviceCards);
  const [team, setTeam] = useState(teamMembers);
  const [testimonialsData, setTestimonialsData] = useState(testimonials);
  const [activeFilter, setActiveFilter] = useState('All');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsRes, servicesRes, teamRes, testimonialsRes] = await Promise.all([
          api.get('/projects'),
          api.get('/services'),
          api.get('/team'),
          api.get('/testimonials'),
        ]);

        if (projectsRes.data?.length) setProjects(projectsRes.data);
        if (servicesRes.data?.length) setServices(servicesRes.data);
        if (teamRes.data?.length) setTeam(teamRes.data);
        if (testimonialsRes.data?.length) setTestimonialsData(testimonialsRes.data);
      } catch (error) {
        console.error('Failed to load content', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonialsData.length]);

  const filters = ['All', 'Web', 'Mobile', 'E-Commerce', 'SaaS'];
  const visibleProjects = activeFilter === 'All' ? projects.length ? projects : portfolioItems : (projects.length ? projects : portfolioItems).filter((item) => item.category === activeFilter);

  return (
    <div>
      <Hero />

      <main>
        <section id="about" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="About us" title="Building Technology That Moves Businesses Forward" subtitle="We design and engineer digital systems that help ambitious organizations launch, scale, and stay competitive." />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
              <div className="space-y-6 text-slate-300">
                <p><span className="font-semibold text-white">Our mission:</span> Build digital experiences that simplify operations, delight users, and accelerate growth.</p>
                <p><span className="font-semibold text-white">Our vision:</span> Become the trusted software partner for businesses ready to lead through technology.</p>
                <p><span className="font-semibold text-white">Why choose us:</span> Strategy-first planning, transparent delivery, and engineering quality that scales with your goals.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { value: '100+', label: 'Projects' },
                { value: '50+', label: 'Happy Clients' },
                { value: '10+', label: 'Developers' },
                { value: '99%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.1 }} className="rounded-[1.5rem] border border-sky-400/20 bg-gradient-to-br from-sky-500/8 to-slate-900 p-6">
                  <div className="text-4xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Services" title="Solutions That Turn Ideas Into Powerful Products" subtitle="From strategy to product launch and support, we build software designed for growth." />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(services || serviceCards).map((service, index) => {
              const Icon = service.icon || Code2;
              return (
                <motion.div key={service.title || index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: index * 0.06 }} whileHover={{ y: -8 }} className="group rounded-[1.75rem] border border-white/10 bg-slate-900/65 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.45)] transition-all hover:border-sky-400/40 hover:bg-slate-900/80">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 text-sky-200 ring-1 ring-sky-400/20 transition-all group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">{service.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(service.tags || []).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-200">
                    Explore <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Technology" title="Modern stacks for modern businesses" subtitle="We combine proven technology and sharp execution to create products teams trust." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {techGroups.map((group, idx) => (
              <motion.div key={group.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: idx * 0.08 }} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
                <h3 className="text-lg font-semibold text-white">{group.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-100">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Portfolio" title="Selected work built for measurable impact" subtitle="A snapshot of digital products designed to create clarity, traction, and business outcomes." />

          <div className="mb-8 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeFilter === filter ? 'bg-gradient-to-r from-[#0A84FF] to-[#2563EB] text-white' : 'border border-white/10 bg-slate-900/60 text-slate-200 hover:bg-white/5'}`}>
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <motion.article key={project.title || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70">
                <div className="relative overflow-hidden">
                  <img src={project.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'} alt={project.title} className="h-68 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-sky-400/20 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-sky-200">{project.category}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-slate-300">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(project.technologies || ['React', 'Node']).map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{tech}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a href={project.liveDemo || '#'} className="inline-flex items-center rounded-full bg-gradient-to-r from-[#0A84FF] to-[#2563EB] px-4 py-2 text-sm font-medium text-white">Live Demo</a>
                    <a href={project.github || '#'} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">GitHub</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Team" title="The specialists behind every digital success" subtitle="A multidisciplinary team bringing strategy, engineering, design, and delivery together." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => (
              <motion.div key={member.name || index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.07 }} whileHover={{ y: -8 }} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70">
                <div className="relative h-72 overflow-hidden">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
                  <p className="mt-2 text-sky-200">{member.position}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(member.skills || []).map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Process" title="A transparent, results-driven delivery flow" subtitle="From concept to delivery, each step is designed to keep your product moving efficiently." />

          <div className="relative">
            <div className="absolute left-5 top-0 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-sky-500/80 to-transparent md:block" />
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div key={step} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} className="relative grid gap-4 md:grid-cols-[80px_1fr] md:items-center">
                  <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 text-sm font-semibold text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.2)] md:ml-0">{String(index + 1).padStart(2, '0')}</div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 md:ml-8">
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">0{index + 1}</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{step}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Pricing" title="Flexible plans for growing businesses" subtitle="Choose the right engagement model based on your goals, traction, and roadmap." />
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} className={`rounded-[1.75rem] border p-7 ${plan.recommended ? 'border-sky-400/40 bg-gradient-to-b from-sky-500/10 to-slate-900 shadow-glow' : 'border-white/10 bg-slate-900/70'}`}>
                {plan.recommended && <div className="mb-4 inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-sky-200">Recommended</div>}
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400">{plan.name}</div>
                <div className="mt-6 text-4xl font-semibold text-white">{plan.price}</div>
                <ul className="mt-6 space-y-3 text-slate-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-sky-400" />{feature}</li>
                  ))}
                </ul>
                <Button className="mt-8 w-full justify-center" variant={plan.recommended ? 'primary' : 'secondary'}>{plan.cta}</Button>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <SectionTitle eyebrow="Testimonials" title="Our clients trust us to build with confidence" subtitle="The experience, quality, and partnerships we create consistently stand out." />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 md:p-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={testimonialsData[testimonialIndex].image} alt={testimonialsData[testimonialIndex].name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <div className="text-xl font-semibold text-white">{testimonialsData[testimonialIndex].name}</div>
                  <div className="text-sm text-slate-400">{testimonialsData[testimonialIndex].company}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonialsData.length) % testimonialsData.length)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white">←</button>
                <button onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonialsData.length)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white">→</button>
              </div>
            </div>

            <motion.div key={testimonialIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }} className="mt-8">
              <div className="mb-4 flex gap-1 text-yellow-400">
                {Array.from({ length: testimonialsData[testimonialIndex].rating || 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="max-w-3xl text-lg leading-8 text-slate-200 md:text-2xl">“{testimonialsData[testimonialIndex].review}”</p>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionTitle eyebrow="Contact" title="Let’s Build Something Amazing Together" subtitle="Tell us about your vision. We’ll shape the roadmap and help you build the right product for market momentum." align="left" />
              <div className="mt-8 space-y-4 text-slate-300">
                <p>Email: hello@stepbystep.dev</p>
                <p>Phone: +92 300 1234567</p>
                <p>Location: Lahore, Pakistan</p>
                <p>Working Hours: Mon–Sat, 9:00 AM – 8:00 PM</p>
              </div>
            </div>

            <form className="grid gap-5 md:grid-cols-2">
              <input className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500" placeholder="Name" />
              <input className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" placeholder="Email" />
              <input className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" placeholder="Phone" />
              <input className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500" placeholder="Service" />
              <input className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 md:col-span-2" placeholder="Budget" />
              <textarea rows="5" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 md:col-span-2" placeholder="Message" />
              <div className="md:col-span-2">
                <Button type="submit" className="w-full justify-center">Send Message</Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
