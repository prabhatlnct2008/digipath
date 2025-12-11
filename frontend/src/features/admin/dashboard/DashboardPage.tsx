import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminSessions, usePastSessions } from '../../../hooks/useSessions';
import { useRecordings } from '../../../hooks/useRecordings';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'default';
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, isLoading }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-status-success-light text-status-success',
    warning: 'bg-status-warning-light text-status-warning',
    default: 'bg-surface-gray text-text-secondary',
  };

  const valueColors = {
    primary: 'text-primary-600',
    success: 'text-status-success',
    warning: 'text-status-warning',
    default: 'text-text-primary',
  };

  return (
    <Card className="hover:shadow-card-hover transition-shadow duration-normal">
      <div className="p-6">
        {isLoading ? (
          <Skeleton className="h-20 rounded-lg" />
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">{label}</p>
              <p className={`text-3xl font-bold ${valueColors[color]}`}>{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-text-secondary">
          Manage sessions, recordings, and tags for AIIMS Telepathology Teaching Initiative
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
          <StatCard
            label="Total Sessions"
            value={totalSessions}
            color="default"
            isLoading={isLoading}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <StatCard
            label="Upcoming Sessions"
            value={upcomingSessions}
            color="primary"
            isLoading={isLoading}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
          <StatCard
            label="Total Recordings"
            value={totalRecordings}
            color="success"
            isLoading={isLoading}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <StatCard
            label="Recordings Pending"
            value={completedWithoutRecording}
            color="warning"
            isLoading={isLoading}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/admin/sessions/create')}
            className="w-full justify-center"
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Create New Session
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/sessions')}
            className="w-full justify-center"
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            Manage Sessions
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/tags')}
            className="w-full justify-center"
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
          >
            Manage Tags
          </Button>
        </div>
      </div>

      {/* Next Upcoming Session */}
      {nextSession && (
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Next Upcoming Session
              </h2>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                {nextSession.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-text-secondary">
                  <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wide">Speaker</span>
                    <p className="text-text-primary font-medium">{nextSession.speaker.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wide">Date & Time</span>
                    <p className="text-text-primary font-medium">
                      {new Date(nextSession.date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      at {nextSession.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wide">Duration</span>
                    <p className="text-text-primary font-medium">{nextSession.duration_minutes} minutes</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/admin/sessions/${nextSession.id}/edit`)}
                rightIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                View Details
              </Button>
            </div>
          </Card>
        </div>
      )}

      {!isLoading && !nextSession && (
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-surface-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-text-secondary mb-4">No upcoming sessions scheduled.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/admin/sessions/create')}
              leftIcon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Create First Session
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};
