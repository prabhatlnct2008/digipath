import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminSessions, usePastSessions } from '../../../hooks/useSessions';
import { useRecordings } from '../../../hooks/useRecordings';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Fetch data for stats
  const { data: allSessions, isLoading: sessionsLoading } = useAdminSessions();
  const { data: pastSessions, isLoading: pastLoading } = usePastSessions();
  const { data: recordings, isLoading: recordingsLoading } = useRecordings();

  const isLoading = sessionsLoading || pastLoading || recordingsLoading;

  // Calculate stats
  const totalSessions = allSessions?.total || 0;
  const upcomingSessions = allSessions?.items.filter(
    (s) => s.status === 'published' && new Date(s.date) >= new Date()
  ).length || 0;
  const totalRecordings = recordings?.total || 0;
  const completedWithoutRecording = pastSessions?.items.filter(
    (s) => !s.has_recording
  ).length || 0;

  // Get next upcoming session
  const nextSession = allSessions?.items
    .filter((s) => s.status === 'published' && new Date(s.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage sessions, recordings, and tags for AIIMS Telepathology Teaching Initiative
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-6">
            {isLoading ? (
              <Skeleton className="h-20" />
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Total Sessions
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalSessions}</p>
              </>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-6">
            {isLoading ? (
              <Skeleton className="h-20" />
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Upcoming Sessions
                </p>
                <p className="text-3xl font-bold text-primary-600">
                  {upcomingSessions}
                </p>
              </>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-6">
            {isLoading ? (
              <Skeleton className="h-20" />
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Total Recordings
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalRecordings}</p>
              </>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-6">
            {isLoading ? (
              <Skeleton className="h-20" />
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Recordings Pending
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {completedWithoutRecording}
                </p>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/admin/sessions/create')}
            className="w-full"
          >
            Create New Session
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/sessions')}
            className="w-full"
          >
            Manage Sessions
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/tags')}
            className="w-full"
          >
            Manage Tags
          </Button>
        </div>
      </div>

      {/* Next Upcoming Session */}
      {nextSession && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Next Upcoming Session
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-primary-600">
                {nextSession.title}
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Speaker:</span> {nextSession.speaker.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Date:</span>{' '}
                {new Date(nextSession.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                at {nextSession.time}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Duration:</span> {nextSession.duration_minutes} minutes
              </p>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/sessions/${nextSession.id}/edit`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {!isLoading && !nextSession && (
        <Card>
          <div className="p-6 text-center">
            <p className="text-gray-600">No upcoming sessions scheduled.</p>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() => navigate('/admin/sessions/create')}
            >
              Create First Session
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
