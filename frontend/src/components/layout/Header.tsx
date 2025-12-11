import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  AIIMS Telepathology Teaching Initiative
                </h1>
              </div>
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            {!isAdmin ? (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/sessions"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sessions
                </Link>
                <Link
                  to="/recordings"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recordings
                </Link>
                <Link
                  to="/admin/login"
                  className="px-4 py-2 rounded-md text-sm font-medium border border-primary-600 text-primary-700 bg-white hover:bg-primary-50 shadow-sm"
                >
                  Admin Login
                </Link>
              </>
            ) : (
              <div className="text-sm font-medium text-gray-700">
                Admin Panel
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
