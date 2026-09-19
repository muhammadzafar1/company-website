import { useEffect, useState } from 'react';
import api, { unwrapApiData } from '../api/api';

export default function Messages() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const res = await api.get('/contact');
      setItems(unwrapApiData(res, 'contacts'));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="space-y-6 p-8 text-[var(--text-primary)]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-light)]">Inbox</p>
        <h1 className="mt-2 text-3xl font-semibold">Messages</h1>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--dark-surface)] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-[var(--text-onDark)]">{item.name}</div>
                <div className="text-sm text-[var(--brand-light)]">{item.email}</div>
              </div>
              {item.phone && <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-onDarkMuted)]">{item.phone}</span>}
            </div>
            <p className="mt-4 text-sm text-[var(--text-onDarkMuted)]">{item.message}</p>
            {(item.service || item.budget) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.service && <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-onDarkMuted)]">{item.service}</span>}
                {item.budget && <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-onDarkMuted)]">Budget: {item.budget}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
