import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Layers3, MonitorSmartphone, Paintbrush2, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import api, { unwrapApiData } from '../api/api';

const serviceDetails = [
  { title: 'Mobile App Development', icon: MonitorSmartphone, points: ['Flutter', 'Android', 'iOS', 'Cross-platform', 'API integration', 'Push notifications', 'Authentication', 'Deployment'] },
  { title: 'Full-Stack Web Development', icon: Code2, points: ['React', 'Next.js', 'Node.js', 'Express', 'REST APIs', 'MongoDB', 'SQL', 'Authentication', 'Admin dashboards'] },
  { title: 'UI/UX Design', icon: Paintbrush2, points: ['Wireframes', 'Prototypes', 'Responsive design', 'Design systems', 'User research', 'Usability'] },
  { title: 'Software Architecture', icon: Layers3, points: ['Scalable architecture', 'API architecture', 'Database architecture', 'Security', 'Performance'] },
  { title: 'Maintenance & Technical Support', icon: ShieldCheck, points: ['Bug fixing', 'Security updates', 'Performance monitoring', 'Server maintenance', 'Feature updates'] },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'Mobile App Development',
  budget: '',
  description: '',
  deadline: '',
};

export default function ServicesPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [services, setServices] = useState(serviceDetails);

  useEffect(() => {
    api.get('/services')
      .then((response) => {
        const databaseServices = unwrapApiData(response, 'services');
        if (databaseServices.length) {
          setServices(databaseServices.map((service, index) => ({
            ...serviceDetails[index % serviceDetails.length],
            ...service,
            points: serviceDetails[index % serviceDetails.length].points,
          })));
        }
      })
      .catch((error) => console.error('Unable to load services', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
      await api.post('/quote', payload);
      setStatus({ type: 'success', message: 'Your quote request was submitted successfully.' });
      setForm(initialForm);
    } catch (error) {
      const validationMessage = error.response?.data?.data?.errors?.[0]?.msg;
      setStatus({ type: 'error', message: validationMessage || error.response?.data?.message || 'Unable to submit your request right now.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta title="Services" description="AZ MEER offers custom web, mobile, architecture, UX, optimization, and maintenance services." path="/services" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Services" title="Digital services built to solve real business problems" subtitle="From mobile apps to full-stack systems, our work is shaped around product quality and operational efficiency." align="left" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--dark-surface)] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand-light)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-onDark)]">{service.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <span key={point} className="skill-pill rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]">{point}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <section className="mt-20 rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--brand)]/25 bg-[var(--brand)]/10 text-[var(--brand-light)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-3xl font-semibold text-[var(--text-onDark)]">Request a quote</h3>
              <p className="mt-4 text-[var(--text-onDarkMuted)]">Tell us about your idea, timeline, and technical goals, and we will help define a practical next step.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" required />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
              <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
              <select name="service" value={form.service} onChange={handleChange} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] md:col-span-2">
                {services.map((service) => (
                  <option key={service.title} value={service.title}>{service.title}</option>
                ))}
              </select>
              <input name="budget" value={form.budget} onChange={handleChange} placeholder="Budget" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
              <input name="deadline" value={form.deadline} onChange={handleChange} placeholder="Deadline" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Project description" className="min-h-[120px] rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] md:col-span-2" required />
              <div className="md:col-span-2 flex items-center gap-4">
                <button type="submit" disabled={submitting} className="rounded-full bg-[var(--brand)] px-5 py-3 font-medium text-white disabled:opacity-60">
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-light)]">Contact team <ArrowRight className="h-4 w-4" /></Link>
              </div>
              {status.message && <div role="status" aria-live="polite" className={`md:col-span-2 rounded-xl border px-4 py-3 text-sm ${status.type === 'error' ? 'border-red-300 bg-red-50 text-red-700' : 'border-green-300 bg-green-50 text-green-700'}`}>{status.message}</div>}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
