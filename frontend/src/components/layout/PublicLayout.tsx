import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainerResponsive } from '../ui/Toast';
import { ToastProvider } from '../../context/ToastContext';

interface PublicLayoutProps {
  children?: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-surface-gray">
        <Header />
        {/* Spacer for fixed header */}
        <div className="h-16" />
        <main className="flex-1">
          {children || <Outlet />}
        </main>
        <Footer />
        <ToastContainerResponsive />
      </div>
    </ToastProvider>
  );
};
