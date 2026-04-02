import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.jsx';
import EmptyState from '../components/UI/EmptyState.jsx';
import RecordsTable from '../components/Records/RecordsTable.jsx';
import RecordModal from '../components/Modals/RecordModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const queryFromState = (state) => {
  const params = new URLSearchParams();

  Object.entries(state).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params.set(key, value);
    }
  });

  return params.toString();
};

export default function RecordsPage() {
  const { user } = useAuth();
  const canEdit = user?.role === 'Admin';
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '', page: 1, limit: 10, sort: 'latest' });

  const loadRecords = async () => {
    setLoading(true);
    try {
      const response = await http.get(`/records?${queryFromState(filters)}`);
      setRecords(response.data.data.items);
      setPagination(response.data.data.pagination);
    } catch {
      toast.error('Unable to load records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [filters.page, filters.type, filters.category, filters.startDate, filters.endDate, filters.sort]);

  const saveRecord = async (payload) => {
    try {
      if (selectedRecord) {
        await http.put(`/records/${selectedRecord._id}`, payload);
        toast.success('Record updated');
      } else {
        await http.post('/records', payload);
        toast.success('Record created');
      }
      setModalOpen(false);
      setSelectedRecord(null);
      loadRecords();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save record');
    }
  };

  const deleteRecord = async (record) => {
    if (!window.confirm('Delete this record?')) return;

    try {
      await http.delete(`/records/${record._id}`);
      toast.success('Record deleted');
      loadRecords();
    } catch {
      toast.error('Unable to delete record');
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const setFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value, page: 1 }));

  if (loading) {
    return <LoadingSpinner label="Loading records..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white p-5 shadow-soft lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-4 sm:grid-cols-4">
          <label className="grid gap-2 text-sm text-slate-600">
            Type
            <select value={filters.type} onChange={(event) => setFilter('type', event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            Category
            <input value={filters.category} onChange={(event) => setFilter('category', event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            Start Date
            <input type="date" value={filters.startDate} onChange={(event) => setFilter('startDate', event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            End Date
            <input type="date" value={filters.endDate} onChange={(event) => setFilter('endDate', event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3" />
          </label>
        </div>

        <div className="flex gap-3">
          <select value={filters.sort} onChange={(event) => setFilter('sort', event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
            <option value="latest">Latest first</option>
            <option value="oldest">Oldest first</option>
            <option value="amountAsc">Amount asc</option>
            <option value="amountDesc">Amount desc</option>
          </select>
          {canEdit ? (
            <button type="button" onClick={() => { setSelectedRecord(null); setModalOpen(true); }} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft">
              Add Record
            </button>
          ) : null}
        </div>
      </div>

      {records.length === 0 ? <EmptyState title="No records found" description="Adjust filters or add a new financial record." /> : <RecordsTable records={records} canEdit={canEdit} onEdit={handleEdit} onDelete={deleteRecord} />}

      <div className="flex items-center justify-between text-sm text-slate-600">
        <button disabled={pagination.page <= 1} onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))} className="rounded-lg border border-slate-200 px-4 py-2 disabled:opacity-50">
          Previous
        </button>
        <div>
          Page {pagination.page} of {pagination.totalPages || 1}
        </div>
        <button disabled={pagination.page >= pagination.totalPages} onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))} className="rounded-lg border border-slate-200 px-4 py-2 disabled:opacity-50">
          Next
        </button>
      </div>

      <RecordModal open={modalOpen} initialValue={selectedRecord} onClose={() => { setModalOpen(false); setSelectedRecord(null); }} onSubmit={saveRecord} />
    </div>
  );
}