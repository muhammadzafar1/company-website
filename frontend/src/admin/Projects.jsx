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
    <div className="space-y-6 p-8 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Portfolio</p>
        <h1 className="mt-2 text-3xl font-semibold">Projects</h1>
      </div>

      {message && <div className="rounded-xl border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">{message}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6 md:grid-cols-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Project title" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 md:col-span-2" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="min-h-[120px] rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 md:col-span-2" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" required />
        <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node, MongoDB" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Live link or project URL" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 md:col-span-2" />
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 font-medium text-white disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
            <div className="text-sm uppercase tracking-[0.18em] text-sky-200">{item.category}</div>
            <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(item.technologies || []).map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200">{tech}</span>
              ))}
            </div>
            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm text-sky-300">Open project</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
