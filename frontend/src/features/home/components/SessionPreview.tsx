import { Link } from 'react-router-dom';
import { SessionCard } from '../../../components/common/SessionCard';
import { Button } from '../../../components/ui/Button';
import { CardSkeleton } from '../../../components/ui/Skeleton';
import type { Session } from '../../../types/session.types';

interface SessionPreviewProps {
  sessions: Session[];
  isLoading: boolean;
}

export function SessionPreview({ sessions, isLoading }: SessionPreviewProps) {
  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                This Month's Live Sessions
              </h2>
              <p className="text-lg text-gray-600">
                Join our upcoming interactive pathology sessions
              </p>
            </div>
          </div>

          {/* Loading Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2].map((i) => (
              <CardSkeleton key={i} showTags className="h-auto" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!sessions || sessions.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with View All link */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              This Month's Live Sessions
            </h2>
            <p className="text-lg text-gray-600">
              Join our upcoming interactive pathology sessions
            </p>
          </div>

          {/* View All link with arrow animation */}
          <Link
            to="/sessions"
            className="group inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-150"
          >
            <span>View All Sessions</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {sessions.slice(0, 4).map((session, index) => (
            <div
              key={session.id}
            >
              <SessionCard
                session={session}
                onViewDetails={() => window.location.href = `/sessions/${session.id}`}
              />
            </div>
          ))}
        </div>

        {/* CTA Button - centered on mobile */}
        <div className="text-center sm:hidden">
          <Link to="/sessions">
            <Button variant="outline" size="lg">
              View All Sessions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
