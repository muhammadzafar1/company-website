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
    <div className="space-y-6 p-8 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Inbox</p>
        <h1 className="mt-2 text-3xl font-semibold">Messages</h1>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item._id} className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-white">{item.name}</div>
                <div className="text-sm text-sky-200">{item.email}</div>
              </div>
              {item.phone && <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{item.phone}</span>}
            </div>
            <p className="mt-4 text-sm text-slate-300">{item.message}</p>
            {(item.service || item.budget) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.service && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200">{item.service}</span>}
                {item.budget && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200">Budget: {item.budget}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
