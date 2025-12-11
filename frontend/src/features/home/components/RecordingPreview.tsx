import { Link, useNavigate } from 'react-router-dom';
import { RecordingCard } from '../../../components/common/RecordingCard';
import { Button } from '../../../components/ui/Button';
import { CardSkeleton } from '../../../components/ui/Skeleton';
import type { Session } from '../../../types/session.types';

interface RecordingPreviewProps {
  recordings: Session[];
  isLoading: boolean;
}

export function RecordingPreview({ recordings, isLoading }: RecordingPreviewProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Recently Added Recordings
              </h2>
              <p className="text-lg text-gray-600">
                Catch up on past sessions anytime
              </p>
            </div>
          </div>

          {/* Loading Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} showImage className="h-auto" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!recordings || recordings.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with View All link */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Recently Added Recordings
            </h2>
            <p className="text-lg text-gray-600">
              Catch up on past sessions anytime
            </p>
          </div>

          {/* View All link with arrow animation */}
          <Link
            to="/recordings"
            className="group inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-150"
          >
            <span>View Recording Library</span>
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

        {/* Recordings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {recordings.slice(0, 4).map((recording, index) => (
            <div
              key={recording.id}
            >
              <RecordingCard
                session={recording}
                onWatch={() => navigate(`/recordings/${recording.id}`)}
              />
            </div>
          ))}
        </div>

        {/* CTA Button - centered on mobile */}
        <div className="text-center sm:hidden">
          <Link to="/recordings">
            <Button variant="outline" size="lg">
              View Library
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
