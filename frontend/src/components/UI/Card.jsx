export function Card({ title, value, subtitle, tone = 'default' }) {
  const toneClasses = {
    default: 'from-slate-900 to-slate-700',
    income: 'from-emerald-600 to-emerald-500',
    expense: 'from-rose-600 to-rose-500',
    balance: 'from-cyan-600 to-sky-500'
  };

  return (
    <div className="rounded-2xl border border-white/70 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`inline-flex rounded-xl bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${toneClasses[tone]}`}>
        {title}
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
      {subtitle ? <div className="mt-2 text-sm text-slate-500">{subtitle}</div> : null}
    </div>
  );
}

export function Panel({ title, children, action }) {
  return (
    <section className="rounded-2xl border border-white/70 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}