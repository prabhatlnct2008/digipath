import { Link, useNavigate } from 'react-router-dom';
import { RecordingCard } from '../../../components/common/RecordingCard';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import type { Session } from '../../../types/session.types';

interface RecordingPreviewProps {
  recordings: Session[];
  isLoading: boolean;
}

export function RecordingPreview({ recordings, isLoading }: RecordingPreviewProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Added Recordings</h2>
            <p className="text-lg text-gray-600">Catch up on past sessions anytime</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!recordings || recordings.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Added Recordings</h2>
          <p className="text-lg text-gray-600">Catch up on past sessions anytime</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {recordings.slice(0, 4).map((recording) => (
            <RecordingCard
              key={recording.id}
              session={recording}
              onWatch={() => navigate(`/recordings/${recording.id}`)}
            />
          ))}
        </div>

        <div className="text-center">
          <Link to="/recordings">
            <Button variant="outline" size="lg">
              View Library
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
