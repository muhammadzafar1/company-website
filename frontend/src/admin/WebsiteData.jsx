import { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/api';

const emptyValue = (field) => {
  if (field.type === 'checkbox') return false;
  if (field.array) return '[]';
  if (field.type === 'json') return '{}';
  return '';
};

const displayValue = (value, field) => {
  if (value === undefined || value === null || value === '') return '—';
  if (field?.type === 'checkbox') return value ? 'Yes' : 'No';
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return JSON.stringify(value);
  if (field?.type === 'date') return new Date(value).toLocaleDateString();
  return String(value);
};

const formValue = (value, field) => {
  if (field.type === 'checkbox') return Boolean(value);
  if (field.array || field.type === 'json') return value === undefined ? emptyValue(field) : JSON.stringify(value);
  if (field.type === 'date' && value) return new Date(value).toISOString().slice(0, 10);
  return value ?? '';
};

const singularLabel = (label) => {
  if (label === 'Team' || label === 'Teams') return 'Team';
  if (label === 'FAQs') return 'FAQ';
  return label.endsWith('s') ? label.slice(0, -1) : label;
};

export default function WebsiteData() {
  const [searchParams] = useSearchParams();
  const requestedResource = searchParams.get('resource');
  const [resources, setResources] = useState([]);
  const [resourceKey, setResourceKey] = useState(requestedResource || '');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const resource = resources.find((entry) => entry.key === resourceKey);

  const loadItems = async (key = resourceKey) => {
    if (!key) return;
    try {
      const response = await api.get(`/admin/content/${key}`);
      setItems(response.data?.data?.items || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load website data');
    }
  };

  useEffect(() => {
    const loadMeta = async () => {
      try {
        const response = await api.get('/admin/content/meta');
        const entries = response.data?.data?.resources || [];
        setResources(entries);
        setResourceKey(entries.find((entry) => entry.key === requestedResource)?.key || entries[0]?.key || '');
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load content controls');
      } finally {
        setLoading(false);
      }
    };
    loadMeta();
  }, [requestedResource]);

  useEffect(() => {
    loadItems();
  }, [resourceKey]);

  const openCreate = () => {
    setEditingId(null);
    setForm(Object.fromEntries(resource.fields.map((field) => [field.name, emptyValue(field)])));
    setMessage('');
    setError('');
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm(Object.fromEntries(resource.fields.map((field) => [field.name, formValue(item[field.name], field)])));
    setMessage('');
    setError('');
    setIsModalOpen(true);
  };

  const handleChange = (field, value) => setForm((current) => ({ ...current, [field.name]: value }));

  const getPayload = () => resource.fields.reduce((payload, field) => {
    let value = form[field.name];
    if (field.array || field.type === 'json') {
      try {
        value = JSON.parse(value || (field.array ? '[]' : '{}'));
      } catch {
        throw new Error(`${field.label} must contain valid JSON.`);
      }
    }
    if (field.type === 'number' && value !== '') value = Number(value);
    payload[field.name] = value;
    return payload;
  }, {});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const payload = getPayload();
      if (editingId) await api.put(`/admin/content/${resourceKey}/${editingId}`, payload);
      else await api.post(`/admin/content/${resourceKey}`, payload);
      setIsModalOpen(false);
      setMessage(`${resource.label} saved successfully.`);
      await loadItems();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Could not save item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item permanently?')) return;
    try {
      await api.delete(`/admin/content/${resourceKey}/${id}`);
      setMessage('Item deleted successfully.');
      await loadItems();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not delete item');
    }
  };

  if (loading) return <div className="rounded-3xl border border-border bg-white p-8 text-text-muted">Loading content controls...</div>;
  if (!resource) return <div className="rounded-3xl border border-border bg-white p-8 text-text-muted">No content resources are available.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Server content</p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text-on-light-heading)]">Website Data</h2>
          <p className="mt-2 text-sm text-[var(--text-on-light-muted)]">Manage every public collection from the database.</p>
        </div>
        <button type="button" onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25">
          <Plus className="h-4 w-4" /> Add {singularLabel(resource.label)}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-border pb-2">
        {resources.map((entry) => (
          <button key={entry.key} type="button" onClick={() => { setResourceKey(entry.key); setMessage(''); setError(''); }} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold ${entry.key === resourceKey ? 'bg-brand text-white' : 'bg-surface text-text-muted hover:text-text-primary'}`}>
            {entry.label}
          </button>
        ))}
      </div>

      {(message || error) && <div className={`rounded-xl border px-4 py-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>{error || message}</div>}

      <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-surface text-xs uppercase tracking-[0.16em] text-text-muted">
              <tr>{resource.fields.slice(0, 4).map((field) => <th key={field.name} className="px-5 py-4 font-semibold">{field.label}</th>)}<th className="px-5 py-4 font-semibold">Actions</th></tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-border text-sm text-text-primary">
                  {resource.fields.slice(0, 4).map((field) => <td key={field.name} className="max-w-[240px] truncate px-5 py-4">{displayValue(item[field.name], field)}</td>)}
                  <td className="px-5 py-4"><div className="flex gap-2"><button type="button" onClick={() => openEdit(item)} className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface px-2.5 py-2 text-xs font-semibold text-text-primary"><Pencil className="h-3.5 w-3.5" /> Edit</button><button type="button" onClick={() => handleDelete(item._id)} className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700"><Trash2 className="h-3.5 w-3.5" /> Delete</button></div></td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-text-muted">No records in this collection.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">{editingId ? 'Edit record' : 'New record'}</p><h3 className="mt-2 text-2xl font-bold text-text-primary">{editingId ? `Edit ${resource.label}` : `Add ${resource.label}`}</h3></div><button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close"><X className="h-5 w-5 text-text-muted" /></button></div>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              {resource.fields.map((field) => {
                const isRequired = field.required || (field.requiredOnCreate && !editingId);
                return <label key={field.name} className={`text-sm font-medium text-text-primary ${field.type === 'textarea' || field.type === 'json' ? 'md:col-span-2' : ''}`}>{field.label}{isRequired ? ' *' : ''}{field.type === 'select' ? <select required={isRequired} value={form[field.name]} onChange={(event) => handleChange(field, event.target.value)} className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2.5"><option value="">Select...</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === 'checkbox' ? <input type="checkbox" checked={Boolean(form[field.name])} onChange={(event) => handleChange(field, event.target.checked)} className="ml-3 h-4 w-4 align-middle" /> : field.type === 'textarea' || field.type === 'json' ? <textarea required={isRequired} value={form[field.name]} onChange={(event) => handleChange(field, event.target.value)} rows={field.type === 'json' ? 3 : 5} className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2.5 font-normal" /> : <input required={isRequired} type={field.type} value={form[field.name]} onChange={(event) => handleChange(field, event.target.value)} className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2.5 font-normal" />}</label>;
              })}
              <div className="flex justify-end gap-3 pt-2 md:col-span-2"><button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text-primary">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save record'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
