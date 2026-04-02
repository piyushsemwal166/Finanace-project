export default function RecordsTable({ records, onEdit, onDelete, canEdit }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-soft">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Notes</th>
            {canEdit ? <th className="px-4 py-3 font-medium">Actions</th> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((record) => (
            <tr key={record._id}>
              <td className="px-4 py-3 text-slate-700">{new Date(record.date).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${record.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {record.type}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-700">{record.category}</td>
              <td className="px-4 py-3 font-medium text-slate-900">${Number(record.amount).toLocaleString()}</td>
              <td className="px-4 py-3 text-slate-600">{record.notes || '—'}</td>
              {canEdit ? (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => onEdit(record)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium">
                      Edit
                    </button>
                    <button type="button" onClick={() => onDelete(record)} className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-medium text-rose-600">
                      Delete
                    </button>
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}