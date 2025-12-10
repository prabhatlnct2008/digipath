import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './features/home/HomePage';
import { UpcomingSessionsPage } from './features/sessions/UpcomingSessionsPage';
import { SessionDetailPage } from './features/sessions/SessionDetailPage';
import { RecordingsPage } from './features/recordings/RecordingsPage';
import { RecordingDetailPage } from './features/recordings/RecordingDetailPage';
import { AboutPage } from './features/about/AboutPage';
import { ContactPage } from './features/contact/ContactPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Placeholder components for admin pages
const AdminLoginPage = () => (
  <PublicLayout>
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Login</h1>
      <p className="text-gray-600">Placeholder for admin login page.</p>
    </div>
  </PublicLayout>
);

const AdminDashboard = () => (
  <AdminLayout>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
    <p className="text-gray-600">Placeholder for admin dashboard.</p>
  </AdminLayout>
);

const AdminSessions = () => (
  <AdminLayout>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Manage Sessions</h1>
    <p className="text-gray-600">Placeholder for session management page.</p>
  </AdminLayout>
);

const AdminPastSessions = () => (
  <AdminLayout>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Past Sessions</h1>
    <p className="text-gray-600">Placeholder for past sessions page.</p>
  </AdminLayout>
);

const AdminCreateSession = () => (
  <AdminLayout>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Session</h1>
    <p className="text-gray-600">Placeholder for create session page.</p>
  </AdminLayout>
);

const AdminTags = () => (
  <AdminLayout>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Manage Tags</h1>
    <p className="text-gray-600">Placeholder for tag management page.</p>
  </AdminLayout>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="sessions" element={<UpcomingSessionsPage />} />
              <Route path="sessions/:id" element={<SessionDetailPage />} />
              <Route path="recordings" element={<RecordingsPage />} />
              <Route path="recordings/:id" element={<RecordingDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/sessions" element={<AdminSessions />} />
            <Route path="/admin/past-sessions" element={<AdminPastSessions />} />
            <Route path="/admin/create-session" element={<AdminCreateSession />} />
            <Route path="/admin/tags" element={<AdminTags />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
