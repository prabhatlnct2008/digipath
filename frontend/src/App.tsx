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
