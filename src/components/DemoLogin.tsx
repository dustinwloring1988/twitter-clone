import React from 'react';
import { mockDb, db } from '../data/mockDb';

interface DemoLoginProps {
  onLogin: (userId: string) => void;
  onLogout?: () => void;
  showLogoutButton?: boolean;
}

export function DemoLogin({ onLogin, onLogout, showLogoutButton = true }: DemoLoginProps) {
  const currentUser = showLogoutButton ? db.getUser('current-user') : null;

  if (currentUser && showLogoutButton) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="font-semibold">{currentUser.name}</div>
            <div className="text-sm text-gray-500">@{currentUser.handle}</div>
          </div>
        </div>
        <button
          onClick={() => {
            db.setCurrentUser('');
            onLogout?.();
          }}
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose a Demo User</h2>
      <div className="space-y-4">
        {Object.entries(mockDb.users).map(([key, user]) => (
          <button
            key={user.id}
            onClick={() => onLogin(user.id)}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500">@{user.handle}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 