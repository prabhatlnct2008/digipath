import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
