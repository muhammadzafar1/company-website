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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#CD853F]">Configuration</p>
        <h2 className="mt-2 text-2xl font-bold text-[#3A2A1A]">Admin Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[#EADDC9] bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#3A2A1A]">Admin Name</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full rounded-2xl border border-[#EADDC9] bg-[#FFFDFB] px-3.5 py-2.5 text-[#3A2A1A] outline-none transition focus:border-[#CD853F] focus:ring-2 focus:ring-[#CD853F]/15"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#3A2A1A]">Admin Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full rounded-2xl border border-[#EADDC9] bg-[#FFFDFB] px-3.5 py-2.5 text-[#3A2A1A] outline-none transition focus:border-[#CD853F] focus:ring-2 focus:ring-[#CD853F]/15"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#3A2A1A]">New Password</label>
          <input
            type="password"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="Leave blank to keep existing password"
            className="w-full rounded-2xl border border-[#EADDC9] bg-[#FFFDFB] px-3.5 py-2.5 text-[#3A2A1A] outline-none transition focus:border-[#CD853F] focus:ring-2 focus:ring-[#CD853F]/15"
          />
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
        {success && <div className="rounded-xl border border-[#EADDC9] bg-[#FFF9F3] px-3 py-2 text-sm text-[#3A2A1A]">{success}</div>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-2xl bg-gradient-to-r from-[#CD853F] to-[#A8672F] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#A8672F]/25 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
