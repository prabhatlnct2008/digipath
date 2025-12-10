import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About the Initiative</h3>
            <p className="text-gray-300 text-sm">
              The AIIMS Telepathology Teaching Initiative provides comprehensive
              pathology education through live sessions and recorded content,
              making quality pathology education accessible to medical professionals.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-gray-300 hover:text-white text-sm">
                  Upcoming Sessions
                </Link>
              </li>
              <li>
                <Link to="/recordings" className="text-gray-300 hover:text-white text-sm">
                  Past Recordings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>All India Institute of Medical Sciences</p>
              <p>Ansari Nagar, New Delhi - 110029</p>
              <p>Email: telepathology@aiims.edu</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AIIMS Telepathology Teaching Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
