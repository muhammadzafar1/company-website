import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const adminCredentials = {
  email: 'muhammadzafar3939@gamil.com',
  password: 'Zafar@123',
};

export default function AdminLogin() {
  const [form, setForm] = useState(adminCredentials);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', form);
      const { token } = response.data.data;
      localStorage.setItem('token', token);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#0A84FF] to-[#2563EB] text-xl font-semibold text-white">S</div>
          <h2 className="mt-5 text-3xl font-semibold text-white">Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-500" placeholder="Email" type="email" required />
          <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-500" placeholder="Password" type="password" required />
          {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>}
          <button disabled={loading} className="w-full rounded-full bg-gradient-to-r from-[#0A84FF] to-[#2563EB] px-4 py-3 font-medium text-white disabled:opacity-60">
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
