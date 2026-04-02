import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import { Card, Panel } from '../components/UI/Card.jsx';
import LoadingSpinner from '../components/UI/LoadingSpinner.jsx';
import EmptyState from '../components/UI/EmptyState.jsx';
import FinanceTrendChart from '../components/Charts/FinanceTrendChart.jsx';
import CategoryPieChart from '../components/Charts/CategoryPieChart.jsx';

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await http.get('/dashboard/summary');
        setSummary(response.data.data);
      } catch {
        toast.error('Unable to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading dashboard analytics..." />;
  }

  if (!summary) {
    return <EmptyState title="No analytics available" description="Create financial records to populate the dashboard." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Total Income" value={`$${Number(summary.totalIncome).toLocaleString()}`} tone="income" />
        <Card title="Total Expense" value={`$${Number(summary.totalExpenses).toLocaleString()}`} tone="expense" />
        <Card title="Net Balance" value={`$${Number(summary.netBalance).toLocaleString()}`} tone="balance" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Monthly Trends">
          <FinanceTrendChart data={summary.monthlyTrends || []} />
        </Panel>
        <Panel title="Category Breakdown">
          <CategoryPieChart data={summary.categoryTotals || []} />
        </Panel>
      </div>

      <Panel title="Recent Transactions">
        <div className="space-y-3">
          {(summary.recentTransactions || []).map((record) => (
            <div key={record._id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <div className="font-medium text-slate-900">{record.category}</div>
                <div className="text-sm text-slate-500">{new Date(record.date).toLocaleDateString()}</div>
              </div>
              <div className={`font-semibold ${record.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {record.type === 'income' ? '+' : '-'}${Number(record.amount).toLocaleString()}
              </div>
            </div>
          ))}
          {summary.recentTransactions.length === 0 ? <EmptyState title="No recent transactions" description="Create a record to see recent activity here." /> : null}
        </div>
      </Panel>
    </div>
  );
}