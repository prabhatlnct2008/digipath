import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Admin Pages
import { LoginPage } from './features/admin/auth/LoginPage';
import { DashboardPage } from './features/admin/dashboard/DashboardPage';
import { AdminSessionsPage } from './features/admin/sessions/AdminSessionsPage';
import { CreateSessionPage } from './features/admin/sessions/CreateSessionPage';
import { EditSessionPage } from './features/admin/sessions/EditSessionPage';
import { PastSessionsPage } from './features/admin/sessions/PastSessionsPage';
import { TagsManagementPage } from './features/admin/tags/TagsManagementPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Placeholder components for public pages
const HomePage = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to AIIMS Telepathology Teaching Initiative
      </h1>
      <p className="text-gray-600">
        This is a placeholder for the home page. Full pages will be implemented in Phase 4.
      </p>
    </div>
  </PublicLayout>
);

const SessionsPage = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Sessions</h1>
      <p className="text-gray-600">Placeholder for sessions page.</p>
    </div>
  </PublicLayout>
);

const RecordingsPage = () => (
  <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Past Recordings</h1>
      <p className="text-gray-600">Placeholder for recordings page.</p>
    </div>
  </PublicLayout>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/recordings" element={<RecordingsPage />} />

            {/* Admin Auth */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="sessions" element={<AdminSessionsPage />} />
              <Route path="sessions/create" element={<CreateSessionPage />} />
              <Route path="sessions/:id/edit" element={<EditSessionPage />} />
              <Route path="sessions/past" element={<PastSessionsPage />} />
              <Route path="tags" element={<TagsManagementPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
