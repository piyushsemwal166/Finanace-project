import { useAuth } from '../../context/AuthContext.jsx';

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/75 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Operations</div>
          <h1 className="text-lg font-semibold text-slate-900">Welcome back, {user?.name}</h1>
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-soft">
          {user?.role}
        </div>
      </div>
    </header>
  );
}