import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useSidebarState } from '../hooks/useSidebarState';

export function Layout() {
  const { isCollapsed } = useSidebarState();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/demo-login');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white flex">
      <Sidebar onLogout={handleLogout} />
      <main className={`flex-1 transition-all duration-300 ${
        isCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <Outlet />
      </main>
    </div>
  );
}