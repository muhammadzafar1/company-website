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
    <div className="space-y-6 p-8 text-[var(--text-on-light-heading)]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">People</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--text-on-light-heading)]">Team</h1>
      </div>

      {message && <div className="rounded-xl border border-[var(--border-light)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--text-on-light-heading)]">{message}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-6 md:grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <input name="position" value={form.position} onChange={handleChange} placeholder="Role" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" required />
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, UX, Node" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] md:col-span-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15" />
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-5 py-3 font-medium text-[var(--on-accent)] shadow-lg shadow-[var(--shadow-card)] disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Team Member'}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-[var(--border-light)] bg-[var(--surface-light)] p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-xl font-semibold text-[var(--text-on-light-heading)]">{item.name}</h3>
            <p className="mt-2 text-[var(--accent)]">{item.position}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(item.skills || []).map((skill) => (
                <span key={skill} className="rounded-full border border-[var(--border-light)] bg-[var(--bg-page)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-on-light-body)]">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
