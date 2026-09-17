import { useEffect, useState } from 'react';
import api, { unwrapApiData } from '../api/api';

const initialForm = {
  name: '',
  position: '',
  skills: 'React, MongoDB, UX',
  image: '',
};

export default function Team() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    try {
      const res = await api.get('/team');
      setItems(unwrapApiData(res, 'team'));
    } catch (error) {
      console.error(error);
      setMessage('Unable to load team members');
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
      await api.post('/team', {
        ...form,
        skills: form.skills
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setForm(initialForm);
      await loadItems();
      setMessage('Team member saved successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not save team member');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-8 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-200">People</p>
        <h1 className="mt-2 text-3xl font-semibold">Team</h1>
      </div>

      {message && <div className="rounded-xl border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">{message}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6 md:grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" required />
        <input name="position" value={form.position} onChange={handleChange} placeholder="Role" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3" required />
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, UX, Node" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 md:col-span-2" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 md:col-span-2" />
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 font-medium text-white disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Team Member'}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
            <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            <p className="mt-2 text-sky-200">{item.position}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(item.skills || []).map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
