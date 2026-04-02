import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

const ADMIN_DEFAULT = {
  email: 'admin@financeapp.com',
  password: 'Admin@12345'
};

const TEAM_DEFAULT = {
  email: '',
  password: ''
};

export default function LoginPage() {
  const [mode, setMode] = useState('team');
  const [adminCredentials, setAdminCredentials] = useState(ADMIN_DEFAULT);
  const [teamCredentials, setTeamCredentials] = useState(TEAM_DEFAULT);
  const [busy, setBusy] = useState(false);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const isAdminMode = mode === 'admin';
  const activeCredentials = isAdminMode ? adminCredentials : teamCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);

    try {
      const authUser = await login(activeCredentials);

      if (isAdminMode && authUser.role !== 'Admin') {
        logout();
        toast.error('This section is only for Admin accounts');
        return;
      }

      if (!isAdminMode && authUser.role === 'Admin') {
        logout();
        toast.error('Use Admin Login for admin credentials');
        return;
      }

      toast.success('Signed in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft lg:grid-cols-2">
        <div className="bg-slate-950 p-10 text-white">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">Finance Operations</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Secure access for financial analytics and record processing.</h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Role-based access control, dashboard analytics, and a clean workflow for finance teams.
          </p>
          <div className="mt-10 grid gap-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Viewer: dashboard only</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Analyst: dashboard + records</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Admin: full control</div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">Sign in</div>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">Choose login type and enter your credentials.</p>

          <div className="mt-6 inline-grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setMode('team')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                !isAdminMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              User / Analyst Login
            </button>
            <button
              type="button"
              onClick={() => setMode('admin')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isAdminMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Admin Login
            </button>
          </div>

          {isAdminMode ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
              Admin portal: use admin credentials only.
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              Team portal: only Viewer and Analyst accounts are allowed here.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Email
              <input
                value={activeCredentials.email}
                onChange={(event) =>
                  isAdminMode
                    ? setAdminCredentials((current) => ({ ...current, email: event.target.value }))
                    : setTeamCredentials((current) => ({ ...current, email: event.target.value }))
                }
                type="email"
                placeholder={isAdminMode ? 'admin@financeapp.com' : 'user@company.com'}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Password
              <input
                value={activeCredentials.password}
                onChange={(event) =>
                  isAdminMode
                    ? setAdminCredentials((current) => ({ ...current, password: event.target.value }))
                    : setTeamCredentials((current) => ({ ...current, password: event.target.value }))
                }
                type="password"
                placeholder={isAdminMode ? 'Enter admin password' : 'Enter your password'}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </label>
            <button disabled={busy} type="submit" className="rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60">
              {busy ? 'Signing in...' : isAdminMode ? 'Login as Admin' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}