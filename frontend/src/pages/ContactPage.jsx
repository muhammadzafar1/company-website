import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send, Clock3 } from 'lucide-react';
import api from '../api/api';
import PageMeta from '../components/PageMeta';
import SectionTitle from '../components/SectionTitle';
import { contactDetails } from '../data/siteContent';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await api.post('/contact', form);
      setMessage('Your message was sent successfully. The team will be in touch soon.');
      setForm(initialForm);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to send message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta title="Contact" description="Contact AZ MEER for service inquiries, product discussions, or partnership opportunities." path="/contact" />

      <main className="mx-auto max-w-7xl px-4 py-28 md:px-6">
        <SectionTitle eyebrow="Contact" title="Let’s plan your next digital move" subtitle="Reach out to discuss a project, product, or technology partnership." align="left" />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5 rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-[var(--brand-light)]" /><span className="text-[var(--text-onDarkMuted)]">{contactDetails.email}</span></div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-[var(--brand-light)]" /><span className="text-[var(--text-onDarkMuted)]">{contactDetails.phone}</span></div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[var(--brand-light)]" /><span className="text-[var(--text-onDarkMuted)]">{contactDetails.location}</span></div>
            <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-[var(--brand-light)]" /><span className="text-[var(--text-onDarkMuted)]">{contactDetails.hours}</span></div>
            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <a href="https://wa.me/923328657885" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href="mailto:azmeer.smc.pvt.ltd@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand)] bg-[var(--brand)]/10 px-4 py-3 text-sm font-semibold text-[var(--brand-dark)] transition hover:bg-[var(--brand)]/20">
                <Mail className="h-4 w-4" /> Email us
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--dark-surface)] p-8 md:grid-cols-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" required />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" required />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="min-h-[150px] rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] md:col-span-2" required />
            <div className="md:col-span-2 flex items-center gap-4">
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 font-medium text-white disabled:opacity-60">
                <Send className="h-4 w-4" /> {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {message && <div className="md:col-span-2 rounded-xl border border-[var(--brand)]/25 bg-[var(--brand)]/10 px-4 py-3 text-sm text-[var(--text-onDark)]">{message}</div>}
          </form>
        </div>
      </main>
    </>
  );
}
