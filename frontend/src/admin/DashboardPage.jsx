import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, BriefcaseBusiness, FolderKanban, CalendarClock, ArrowUpRight } from 'lucide-react';
import api, { unwrapApiData } from '../api/api';

const statusMeta = {
  ongoing: { label: 'Ongoing', className: 'bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--accent)]' },
  completed: { label: 'Completed', className: 'bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-text)]/20' },
  upcoming: { label: 'Upcoming', className: 'bg-[var(--surface-light)] text-[var(--text-on-light-body)] border border-[var(--border-light)]' },
};

const filters = ['All', 'ongoing', 'completed', 'upcoming'];

const initialForm = {
  name: '',
  client: '',
  status: 'ongoing',
  startDate: '',
  deadline: '',
  assignedEmployees: [],
};

const formatDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
};

const getInitials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() || '').join('') || 'A';

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalEmployees: 0, totalProjects: 0, ongoingProjects: 0, upcomingProjects: 0 });
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      const [statsRes, projectsRes, employeesRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/projects'),
        api.get('/employees'),
      ]);

      setStats(unwrapApiData(statsRes, 'data') || { totalEmployees: 0, totalProjects: 0, ongoingProjects: 0, upcomingProjects: 0 });
      const projectList = unwrapApiData(projectsRes, 'projects') || [];
      const employeeList = unwrapApiData(employeesRes, 'employees') || [];
      setProjects(Array.isArray(projectList) ? projectList : []);
      setEmployees(Array.isArray(employeeList) ? employeeList : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load dashboard');
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.status === filter);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingId(project._id);
    setForm({
      name: project.name,
      client: project.client,
      status: project.status,
      startDate: project.startDate ? new Date(project.startDate).toISOString().slice(0, 10) : '',
      deadline: project.deadline ? new Date(project.deadline).toISOString().slice(0, 10) : '',
      assignedEmployees: project.assignedEmployees?.map((employee) => employee._id || employee) || [],
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (form.startDate && form.deadline && new Date(form.startDate) > new Date(form.deadline)) {
        setError('Start date cannot be after deadline.');
        return;
      }

      const payload = {
        ...form,
        assignedEmployees: form.assignedEmployees.filter(Boolean),
      };

      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post('/projects', payload);
      }

      setIsModalOpen(false);
      setForm(initialForm);
      setEditingId(null);
      await loadDashboard();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      await loadDashboard();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Employees', value: stats.totalEmployees, icon: BriefcaseBusiness },
          { label: 'Total Projects', value: stats.totalProjects, icon: FolderKanban },
          { label: 'Ongoing Projects', value: stats.ongoingProjects, icon: ArrowUpRight },
          { label: 'Upcoming Projects', value: stats.upcomingProjects, icon: CalendarClock },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted">{label}</div>
                <div className="mt-4 text-3xl font-bold text-text-primary">{value}</div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  filter === tab
                    ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                    : 'border border-[var(--border-light)] bg-[var(--surface-light)] text-[var(--text-on-light-heading)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25"
          >
            <Plus className="h-4 w-4" />
            Add New Project
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-surface text-xs uppercase tracking-[0.18em] text-text-muted">
              <tr>
                <th className="px-5 py-4 font-semibold">Project Name</th>
                <th className="px-5 py-4 font-semibold">Client</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Start Date</th>
                <th className="px-5 py-4 font-semibold">Deadline</th>
                <th className="px-5 py-4 font-semibold">Employees Working</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => {
                const assignedEmployees = Array.isArray(project.assignedEmployees) ? project.assignedEmployees : [];
                const visibleEmployees = assignedEmployees.slice(0, 2);
                const hiddenCount = assignedEmployees.length - visibleEmployees.length;

                return (
                  <tr key={project._id} className="border-t border-border text-sm text-text-primary">
                    <td className="px-5 py-4 font-semibold text-text-primary">{project.name}</td>
                    <td className="px-5 py-4">{project.client}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusMeta[project.status]?.className || 'bg-slate-100 text-slate-700'}`}>
                        {statusMeta[project.status]?.label || project.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">{formatDate(project.startDate)}</td>
                    <td className="px-5 py-4">{formatDate(project.deadline)}</td>
                    <td className="px-5 py-4">
                      {assignedEmployees.length ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {visibleEmployees.map((employee) => {
                            const name = employee?.name || 'Employee';
                            return (
                              <span key={employee?._id || name} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white">
                                  {getInitials(name)}
                                </span>
                                {name}
                              </span>
                            );
                          })}
                          {hiddenCount > 0 && (
                            <span className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-1 text-xs font-medium text-text-primary">
                              +{hiddenCount}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">Not assigned yet</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => openEditModal(project)} className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-light)] bg-[var(--accent-soft)] px-2.5 py-2 text-xs font-semibold text-[var(--link-on-light)] hover:bg-[var(--surface-light-hover)]">
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(project._id)} className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-light)] bg-[var(--bg-page)] px-2.5 py-2 text-xs font-semibold text-[var(--text-on-light-muted)] hover:bg-[var(--surface-light-hover)]">
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!filteredProjects.length && (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-sm text-text-muted">
                    No projects found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-[var(--border)] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">{editingId ? 'Update' : 'Create'}</p>
                <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Project Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Client</label>
                  <input
                    required
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Start Date</label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Deadline</label>
                  <input
                    type="date"
                    required
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Assigned Employees</label>
                <div className="max-h-44 space-y-2 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                  {employees.length ? (
                    employees.map((employee) => {
                      const checked = form.assignedEmployees.includes(employee._id);

                      return (
                        <label key={employee._id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text-primary)] hover:border-[var(--brand)]/20 hover:bg-[var(--brand)]/5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              setForm((prev) => ({
                                ...prev,
                                assignedEmployees: checked
                                  ? prev.assignedEmployees.filter((id) => id !== employee._id)
                                  : [...prev.assignedEmployees, employee._id],
                              }));
                            }}
                            className="h-4 w-4 rounded border-[var(--border)] text-[var(--brand)] focus:ring-[var(--brand)]"
                          />
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand)] text-[10px] font-bold text-white">
                            {getInitials(employee.name)}
                          </span>
                          <span className="font-medium">{employee.name}</span>
                          <span className="text-[var(--text-muted)]">({employee.role})</span>
                        </label>
                      );
                    })
                  ) : (
                    <p className="text-sm text-[var(--text-muted)]">No employees available.</p>
                  )}
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)]">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--brand)]/25 disabled:opacity-60"
                >
                  {loading ? 'Saving...' : editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
