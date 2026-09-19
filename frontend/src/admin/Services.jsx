import { useEffect, useState } from 'react';
import api, { unwrapApiData } from '../api/api';

const initialForm = {
  title: '',
  description: '',
  category: 'Web Development',
  price: 0,
  image: '',
};

export default function Services() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    try {
      const res = await api.get('/services');
      setItems(unwrapApiData(res, 'services'));
    } catch (error) {
      console.error(error);
      setMessage('Unable to load services');
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
      await api.post('/services', {
        ...form,
        price: Number(form.price) || 0,
      });
      setForm(initialForm);
      await loadItems();
      setMessage('Service saved successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not save service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-8 text-[var(--text-on-light-heading)]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--text-on-light-heading)]">Services</h1>
      </div>

      {message && <div className="rounded-xl border border-[var(--border-light)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--text-on-light-heading)]">{message}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-6 md:grid-cols-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Service title" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Starting price" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" min="0" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="min-h-[120px] rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" />
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-5 py-3 font-medium text-[var(--on-accent)] shadow-lg shadow-[var(--shadow-card)] disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-5 shadow-[var(--shadow-card)]">
            <div className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">{item.category}</div>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text-on-light-heading)]">{item.title}</h3>
            <p className="mt-3 text-sm text-[var(--text-on-light-body)]">{item.description}</p>
            <p className="mt-4 text-lg font-semibold text-[var(--accent)]">${Number(item.price || 0).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
