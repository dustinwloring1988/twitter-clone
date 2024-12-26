import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DemoLogin } from '../components/DemoLogin';
import { db } from '../data/mockDb';

export function DemoLoginPage() {
  const navigate = useNavigate();

  const handleLogin = (userId: string) => {
    // In a real app, this would be handled by proper authentication
    // For demo purposes, we'll just set the current user in the mock DB
    db.setCurrentUser(userId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DemoLogin onLogin={handleLogin} showLogoutButton={false} />
    </div>
  );
} 