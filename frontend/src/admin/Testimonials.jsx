import { useEffect, useState } from 'react';
import api, { unwrapApiData } from '../api/api';

const initialForm = {
  name: '',
  company: '',
  role: '',
  review: '',
  rating: 5,
  image: '',
};

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    try {
      const res = await api.get('/testimonials');
      setItems(unwrapApiData(res, 'testimonials'));
    } catch (error) {
      console.error(error);
      setMessage('Unable to load testimonials');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await api.post('/testimonials', {
        ...form,
        rating: Number(form.rating) || 5,
      });
      setForm(initialForm);
      await loadItems();
      setMessage('Testimonial saved successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not save testimonial');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-8 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Social proof</p>
        <h1 className="mt-2 text-3xl font-semibold">Testimonials</h1>
      </div>

      {message && <div className="rounded-xl border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">{message}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6 md:grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Client name" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" required />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" required />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" />
        <input name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} placeholder="Rating" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" />
        <textarea name="review" value={form.review} onChange={handleChange} placeholder="Feedback" className="min-h-[120px] rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 md:col-span-2" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 md:col-span-2" />
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 font-medium text-white disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Testimonial'}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
            <div className="text-lg font-semibold text-white">{item.name}</div>
            <div className="text-sm text-sky-200">{item.company}</div>
            <p className="mt-3 text-sm text-slate-300">“{item.review}”</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-amber-300">{item.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
}
