import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h3 className="text-lg font-semibold">AIIMS Telepathology</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The AIIMS Telepathology Teaching Initiative provides comprehensive
              pathology education through live sessions and recorded content,
              making quality pathology education accessible to medical professionals
              across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-micro inline-flex items-center group"
                >
                  <span className="relative">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-normal group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/sessions"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-micro inline-flex items-center group"
                >
                  <span className="relative">
                    Upcoming Sessions
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-normal group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/recordings"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-micro inline-flex items-center group"
                >
                  <span className="relative">
                    Past Recordings
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-normal group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-micro inline-flex items-center group"
                >
                  <span className="relative">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-normal group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-micro inline-flex items-center group"
                >
                  <span className="relative">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-normal group-hover:w-full" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 text-sm space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p>All India Institute of Medical Sciences</p>
                  <p>Ansari Nagar, New Delhi - 110029</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:telepathology@aiims.edu"
                  className="hover:text-white transition-colors duration-micro"
                >
                  telepathology@aiims.edu
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AIIMS Telepathology Teaching Initiative. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-micro">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-micro">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
