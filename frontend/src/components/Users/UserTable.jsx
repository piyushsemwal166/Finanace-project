export default function UserTable({ users, onChange }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-soft">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
              <td className="px-4 py-3 text-slate-600">{user.email}</td>
              <td className="px-4 py-3">
                <select value={user.role} onChange={(event) => onChange(user, { role: event.target.value, status: user.status })} className="rounded-lg border border-slate-200 px-3 py-2">
                  <option>Viewer</option>
                  <option>Analyst</option>
                  <option>Admin</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <select value={user.status} onChange={(event) => onChange(user, { role: user.role, status: event.target.value })} className="rounded-lg border border-slate-200 px-3 py-2">
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}