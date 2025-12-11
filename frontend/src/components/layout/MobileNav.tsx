import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, navItems }) => {
  const location = useLocation();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="
          fixed top-0 right-0 bottom-0 w-[280px]
          bg-white shadow-xl
          transform transition-transform duration-slow ease-smooth
          animate-slide-in-right
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-light">
          <span className="text-lg font-semibold text-text-primary">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-gray-100 transition-colors duration-micro"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center px-4 py-3 rounded-lg text-base font-medium
                transition-colors duration-micro
                ${isActivePath(item.path)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                }
              `.replace(/\s+/g, ' ').trim()}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-light">
          <Link
            to="/admin/login"
            onClick={onClose}
            className="
              flex items-center justify-center w-full px-4 py-3
              bg-primary-500 text-white rounded-full font-medium
              hover:bg-primary-600 transition-colors duration-micro
              shadow-button hover:shadow-button-hover
            "
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};
