import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Bell, Mail, User, Settings, Bird, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useSidebarState } from '../hooks/useSidebarState';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationBadge } from './notifications/NotificationBadge';
import { useColorScheme } from '../hooks/useColorScheme';
import { db } from '../data/mockDb';

interface SidebarProps {
  onLogout?: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const { isCollapsed, toggleCollapsed } = useSidebarState();
  const { unreadCount } = useNotifications();
  const { getAccentColor } = useColorScheme();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { 
      icon: Bell, 
      label: 'Notifications', 
      path: '/notifications',
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    db.setCurrentUser('');
    onLogout?.();
  };

  return (
    <div className={`fixed h-screen border-r border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <Bird className="w-8 h-8 fill-current" style={{ color: getAccentColor() }} />
        </div>
        <nav className="flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''} relative`
              }
            >
              <item.icon size={24} />
              {!isCollapsed && <span>{item.label}</span>}
              {item.badge && <NotificationBadge count={item.badge} />}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto mb-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={24} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
        <button 
          onClick={toggleCollapsed}
          className="flex items-center justify-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
    </div>
  );
}