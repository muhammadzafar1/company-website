import { useEffect, useState } from 'react';
import api, { unwrapApiData } from '../api/api';

const initialForm = {
  title: '',
  description: '',
  category: 'Web',
  technologies: 'React, Node, MongoDB',
  link: '',
};

export default function Projects() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    try {
      const res = await api.get('/projects');
      setItems(unwrapApiData(res, 'projects'));
    } catch (error) {
      console.error(error);
      setMessage('Unable to load projects');
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
      await api.post('/projects', {
        ...form,
        technologies: form.technologies
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setForm(initialForm);
      await loadItems();
      setMessage('Project saved successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-8 text-[var(--text-on-light-heading)]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Portfolio</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--text-on-light-heading)]">Projects</h1>
      </div>

      {message && <div className="rounded-xl border border-[var(--border-light)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--text-on-light-heading)]">{message}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-6 md:grid-cols-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Project title" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="min-h-[120px] rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node, MongoDB" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Live link or project URL" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" />
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-5 py-3 font-medium text-[var(--on-accent)] shadow-lg shadow-[var(--shadow-card)] disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-5 shadow-[var(--shadow-card)]">
            <div className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">{item.category}</div>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text-on-light-heading)]">{item.title}</h3>
            <p className="mt-3 text-sm text-[var(--text-on-light-body)]">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(item.technologies || []).map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--border-light)] bg-[var(--bg-page)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-on-light-body)]">{tech}</span>
              ))}
            </div>
            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm text-[var(--link-on-light)] hover:text-[var(--link-on-light-hover)]">Open project</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
