import { useEffect, useState } from 'react';

const initialState = {
  amount: '',
  type: 'income',
  category: '',
  date: '',
  notes: ''
};

export default function RecordModal({ open, onClose, onSubmit, initialValue }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialValue) {
      setForm({
        amount: initialValue.amount,
        type: initialValue.type,
        category: initialValue.category,
        date: initialValue.date?.slice(0, 10),
        notes: initialValue.notes || ''
      });
    } else {
      setForm(initialState);
    }
  }, [initialValue, open]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{initialValue ? 'Edit Record' : 'Add Record'}</h3>
          <button className="text-sm text-slate-500" onClick={onClose}>Close</button>
        </div>

        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Amount
            <input name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Type
            <select name="type" value={form.type} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Category
            <input name="category" value={form.category} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Date
            <input name="date" type="date" value={form.date} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
            Notes
            <textarea name="notes" rows="4" value={form.notes} onChange={handleChange} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </label>
          <div className="sm:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}