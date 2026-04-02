import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-3xl border border-white/70 bg-white p-8 text-center shadow-soft">
        <div className="text-sm uppercase tracking-[0.25em] text-slate-500">404</div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm text-slate-500">The page you tried to open does not exist.</p>
        <Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}