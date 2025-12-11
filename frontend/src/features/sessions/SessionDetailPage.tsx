import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSession } from '../../hooks/useSessions';
import { Button } from '../../components/ui/Button';
import { TagChip } from '../../components/ui/TagChip';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { formatDate, formatTime, formatDuration } from '../../utils/formatters';
import { downloadCalendarFile } from '../../utils/calendar';

export function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, isLoading, error } = useSession(id!);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    if (session) {
      downloadCalendarFile(session.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-gray">
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton height="24px" width="150px" className="mb-4 bg-white/20" />
            <Skeleton height="48px" className="bg-white/20" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
            <Skeleton height="200px" />
          </div>
          <div className="bg-white rounded-xl shadow-soft p-6">
            <Skeleton height="150px" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-gray">
        <EmptyState
          title="Session not found"
          message="The session you're looking for doesn't exist or has been removed."
          action={
            <Link to="/sessions">
              <Button variant="primary">Back to Sessions</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-gray">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to="/sessions"
            className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors duration-micro mb-6 group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-normal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Sessions
          </Link>

          {/* Title and Tags */}
          <div className="animate-fade-in">
            <div className="flex flex-wrap gap-2 mb-4">
              <TagChip label={session.organ_tag.name} variant="outline" className="bg-white/10 border-white/30 text-white" />
              <TagChip label={session.type_tag.name} variant="outline" className="bg-white/10 border-white/30 text-white" />
              <TagChip label={session.level_tag.name} variant="outline" className="bg-white/10 border-white/30 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {session.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Abstract */}
            <article className="bg-white rounded-xl shadow-soft border border-border-light p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Abstract
              </h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {session.abstract}
              </p>
            </article>

            {/* Learning Objectives */}
            {session.objectives && session.objectives.length > 0 && (
              <article className="bg-white rounded-xl shadow-soft border border-border-light p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Learning Objectives
                </h2>
                <ul className="space-y-3">
                  {session.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-text-secondary">{objective}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>

          {/* Sidebar - Schedule Block */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Schedule Card */}
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Session Details</h3>

                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Date</p>
                      <p className="font-medium text-text-primary">{formatDate(session.date)}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Time</p>
                      <p className="font-medium text-text-primary">{formatTime(session.time)} IST</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Duration</p>
                      <p className="font-medium text-text-primary">{formatDuration(session.duration_minutes)}</p>
                    </div>
                  </div>

                  {/* Speaker */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Speaker</p>
                      <p className="font-medium text-text-primary">{session.speaker.name}</p>
                      {session.speaker.title && (
                        <p className="text-sm text-text-secondary">{session.speaker.title}</p>
                      )}
                    </div>
                  </div>

                  {/* Platform */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Platform</p>
                      <p className="font-medium text-text-primary">{session.platform}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-soft border border-border-light p-5 space-y-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
                {session.meeting_link && session.status === 'published' && (
                  <a
                    href={session.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      leftIcon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      }
                    >
                      Join Live Session
                    </Button>
                  </a>
                )}

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleAddToCalendar}
                  className="w-full"
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Add to Calendar
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCopyLink}
                  className="w-full"
                  leftIcon={
                    copied ? (
                      <svg className="w-5 h-5 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    )
                  }
                >
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
