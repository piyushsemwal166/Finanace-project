import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
    isActive ? 'bg-emerald-500 text-white shadow-soft' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="border-r border-white/60 bg-white/80 px-4 py-6 backdrop-blur lg:w-72 lg:shrink-0 lg:min-h-screen lg:sticky lg:top-0">
      <div className="mb-8 rounded-2xl bg-slate-950 px-5 py-5 text-white shadow-soft">
        <div className="text-xs uppercase tracking-[0.25em] text-emerald-300">Finance Dashboard</div>
        <div className="mt-2 text-xl font-semibold">Data Processing and Access Control</div>
        <div className="mt-3 text-sm text-slate-300">Signed in as {user?.name}</div>
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/records" className={linkClass}>
          <FileText size={18} /> Records
        </NavLink>
        {user?.role === 'Admin' && (
          <NavLink to="/users" className={linkClass}>
            <Shield size={18} /> Users
          </NavLink>
        )}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}