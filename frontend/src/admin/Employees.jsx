import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api, { unwrapApiData } from '../api/api';

const initialForm = { name: '', role: '', email: '' };

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadEmployees = async () => {
    try {
      const res = await api.get('/employees');
      const items = unwrapApiData(res, 'employees');
      setEmployees(Array.isArray(items) ? items : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch employees');
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/employees', form);
      setForm(initialForm);
      setIsModalOpen(false);
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add employee');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/employees/${employeeId}`);
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove employee');
    }
  };

  const totalAssigned = useMemo(
    () => employees.reduce((total, employee) => total + Number(employee.assignedProjectsCount || 0), 0),
    [employees]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">People</p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text-on-light-heading)]">Employees</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-4 py-2.5 text-sm font-semibold text-[var(--on-accent)] shadow-lg shadow-[var(--shadow-card)]"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light)] p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-on-light-muted)]">Total Employees</div>
          <div className="mt-3 text-3xl font-bold text-[var(--text-on-light-heading)]">{employees.length}</div>
        </div>
        <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--surface-light)] p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-on-light-muted)]">Assigned Work</div>
          <div className="mt-3 text-3xl font-bold text-[var(--text-on-light-heading)]">{totalAssigned}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--border-light)] bg-[var(--surface-light)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[var(--bg-page)] text-xs uppercase tracking-[0.18em] text-[var(--text-on-light-muted)]">
              <tr>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Assigned Projects</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="border-t border-[var(--border-light)] text-sm text-[var(--text-on-light-heading)]">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[var(--text-on-light-heading)]">{employee.name}</div>
                    <div className="text-xs text-[var(--text-on-light-muted)]">{employee.email}</div>
                  </td>
                  <td className="px-5 py-4">{employee.role}</td>
                  <td className="px-5 py-4">{employee.assignedProjectsCount || 0}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(employee._id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--danger-bg)] bg-[var(--danger-bg)] px-3 py-2 text-xs font-semibold text-[var(--danger-text)] transition hover:opacity-90"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {!employees.length && (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-center text-sm text-[var(--text-on-light-muted)]">
                    No employees added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--surface-dark)]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--border-light)] bg-[var(--surface-light)] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">New Employee</p>
                <h3 className="mt-2 text-2xl font-bold text-[var(--text-on-light-heading)]">Add Employee</h3>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-[var(--text-on-light-muted)] hover:text-[var(--text-on-light-heading)]">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[var(--text-on-light-heading)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">Role</label>
                <input
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[var(--text-on-light-heading)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-on-light-heading)]">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[var(--text-on-light-heading)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)]/15"
                />
              </div>

              {error && <div className="rounded-xl border border-[var(--danger-bg)] bg-[var(--danger-bg)] px-3 py-2 text-sm text-[var(--danger-text)]">{error}</div>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-page)] px-4 py-2.5 text-sm font-semibold text-[var(--text-on-light-heading)]">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-4 py-2.5 text-sm font-semibold text-[var(--on-accent)] shadow-lg shadow-[var(--shadow-card)] disabled:opacity-60"
                >
                  {loading ? 'Saving...' : 'Save Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
