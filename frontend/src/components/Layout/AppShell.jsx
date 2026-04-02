import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <Topbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children || <Outlet />}</main>
      </div>
    </div>
  );
}