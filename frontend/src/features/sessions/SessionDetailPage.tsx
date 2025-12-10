import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSession } from '../../hooks/useSessions';
import { Button } from '../../components/ui/Button';
import { TagChip } from '../../components/ui/TagChip';
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 mb-4" />
          <Skeleton className="h-6 mb-8" />
          <Skeleton className="h-64 mb-6" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Session not found"
          message="The session you're looking for doesn't exist or has been removed."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/sessions"
            className="inline-flex items-center text-blue-100 hover:text-white mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Sessions
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">{session.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h3>
              <p className="text-lg text-gray-900">
                {formatDate(session.date)} at {formatTime(session.time)} IST
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
              <p className="text-lg text-gray-900">{formatDuration(session.duration_minutes)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Speaker</h3>
              <p className="text-lg text-gray-900">{session.speaker.name}</p>
              {session.speaker.title && (
                <p className="text-sm text-gray-600">{session.speaker.title}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Platform</h3>
              <p className="text-lg text-gray-900">{session.platform}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <TagChip label={session.organ_tag.name} />
              <TagChip label={session.type_tag.name} />
              <TagChip label={session.level_tag.name} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {session.meeting_link && (
              <a
                href={session.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" size="lg" className="w-full">
                  Join Live Session
                </Button>
              </a>
            )}
            <Button
              variant="outline"
              size="lg"
              onClick={handleAddToCalendar}
              className="flex-1"
            >
              Add to Calendar
            </Button>
            <Button variant="outline" size="lg" onClick={handleCopyLink}>
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
          <p className="text-gray-700 whitespace-pre-line">{session.abstract}</p>
        </div>

        {session.objectives && session.objectives.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-2">
              {session.objectives.map((objective, index) => (
                <li key={index} className="text-gray-700">
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
