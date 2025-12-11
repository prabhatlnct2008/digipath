import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  isAdmin?: boolean;
}

const publicNavItems = [
  { path: '/', label: 'Home' },
  { path: '/sessions', label: 'Upcoming Sessions' },
  { path: '/recordings', label: 'Recordings' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-40
          bg-white border-b border-border-light
          transition-shadow duration-normal
          ${isScrolled ? 'shadow-header' : ''}
        `.replace(/\s+/g, ' ').trim()}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-card transition-shadow duration-normal">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-lg font-semibold text-text-primary group-hover:text-primary-600 transition-colors duration-micro">
                  AIIMS Telepathology
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {!isAdmin && (
              <nav className="hidden md:flex items-center space-x-1">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative px-3 py-2 text-sm font-medium
                      transition-colors duration-micro
                      ${isActivePath(item.path)
                        ? 'text-primary-600'
                        : 'text-text-secondary hover:text-primary-600'
                      }
                    `.replace(/\s+/g, ' ').trim()}
                  >
                    {item.label}
                    {/* Animated underline */}
                    <span
                      className={`
                        absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary-500 rounded-full
                        transition-all duration-normal
                        ${isActivePath(item.path) ? 'w-4/5' : 'w-0 group-hover:w-4/5'}
                      `.replace(/\s+/g, ' ').trim()}
                    />
                  </Link>
                ))}
              </nav>
            )}

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {!isAdmin ? (
                <>
                  <Link
                    to="/admin/login"
                    className="hidden md:inline-flex text-sm font-medium text-text-muted hover:text-primary-600 transition-colors duration-micro"
                  >
                    Admin Login
                  </Link>
                  {/* Mobile menu button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors duration-micro"
                    aria-label="Open menu"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/admin/dashboard"
                    className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors duration-micro"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={publicNavItems}
      />
    </>
  );
};
