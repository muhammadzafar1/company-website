import { useEffect, useState } from 'react';
import api from '../api/api';

const defaultProfile = { name: '', email: '', password: '' };

export default function Settings() {
  const [profile, setProfile] = useState(defaultProfile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin') || '{}');
    setProfile((prev) => ({
      ...prev,
      name: admin.name || '',
      email: admin.email || '',
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (profile.name) {
        await api.put('/auth/update-profile', { name: profile.name, email: profile.email });
      }

      if (profile.password) {
        await api.put('/auth/update-password', { newPassword: profile.password });
      }

      const adminPayload = { name: profile.name, email: profile.email };
      localStorage.setItem('admin', JSON.stringify(adminPayload));
      setSuccess('Admin details saved successfully.');
      setProfile((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save admin settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Configuration</p>
        <h2 className="mt-2 text-2xl font-bold text-[var(--text-on-light-heading)]">Admin Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[var(--border-light)] bg-[var(--surface-light)] p-6 shadow-sm">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">Admin Name</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[var(--text-on-light-heading)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">Admin Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[var(--text-on-light-heading)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">New Password</label>
          <input
            type="password"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="Leave blank to keep existing password"
            className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[var(--text-on-light-heading)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15"
          />
        </div>

        {error && <div className="rounded-xl border border-[var(--danger-bg)] bg-[var(--danger-bg)] px-3 py-2 text-sm text-[var(--danger-text)]">{error}</div>}
        {success && <div className="rounded-xl border border-[var(--border-light)] bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--text-on-light-heading)]">{success}</div>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)] shadow-lg shadow-[var(--shadow-card)] disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
