import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const defaultForm = {
  email: '',
  password: '',
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    try {
      const response = await api.post('/auth/login', payload);
      const { token, admin } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-[2rem] border border-[var(--border-light)] bg-[var(--surface-light)]/90 p-8 shadow-[0_30px_80px_rgba(43,26,16,0.12)] backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-xl font-bold text-[var(--on-accent)] shadow-lg shadow-[var(--accent-hover)]/30">
            SH
          </div>
          <h2 className="mt-5 text-3xl font-bold text-[var(--text-on-light-heading)]">Admin Login</h2>
          <p className="mt-2 text-sm text-[var(--text-on-light-muted)]">Sign in to continue to the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light-hover)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">Password</label>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light-hover)] px-4 py-3 text-[var(--text-on-light-heading)] placeholder:text-[var(--text-on-light-muted)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
              placeholder="Enter your password"
              type="password"
              required
            />
          </div>

          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-4 py-3 font-semibold text-[var(--on-accent)] shadow-lg shadow-[var(--accent-hover)]/25 disabled:opacity-60">
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
