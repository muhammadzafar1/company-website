import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Clock3 } from 'lucide-react';
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
          <div className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-emerald-200" /><span className="text-slate-300">{contactDetails.email}</span></div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-emerald-200" /><span className="text-slate-300">{contactDetails.phone}</span></div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-emerald-200" /><span className="text-slate-300">{contactDetails.location}</span></div>
            <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-emerald-200" /><span className="text-slate-300">{contactDetails.hours}</span></div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 md:grid-cols-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500" required />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500" />
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500" required />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="min-h-[150px] rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 md:col-span-2" required />
            <div className="md:col-span-2 flex items-center gap-4">
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-medium text-white disabled:opacity-60">
                <Send className="h-4 w-4" /> {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {message && <div className="md:col-span-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{message}</div>}
          </form>
        </div>
      </main>
    </>
  );
}
