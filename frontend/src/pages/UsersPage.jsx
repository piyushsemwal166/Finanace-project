import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import http from '../api/http.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.jsx';
import EmptyState from '../components/UI/EmptyState.jsx';
import UserTable from '../components/Users/UserTable.jsx';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await http.get('/users');
      setUsers(response.data.data);
    } catch {
      toast.error('Unable to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (user, payload) => {
    try {
      await http.patch(`/users/${user._id}`, payload);
      toast.success('User updated');
      loadUsers();
    } catch {
      toast.error('Unable to update user');
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading users..." />;
  }

  if (users.length === 0) {
    return <EmptyState title="No users available" description="Register users to manage roles and statuses." />;
  }

  return <UserTable users={users} onChange={updateUser} />;
}