import { Link } from 'react-router-dom';
import { SessionCard } from '../../../components/common/SessionCard';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import type { Session } from '../../../types/session.types';

interface SessionPreviewProps {
  sessions: Session[];
  isLoading: boolean;
}

export function SessionPreview({ sessions, isLoading }: SessionPreviewProps) {
  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">This Month's Live Sessions</h2>
            <p className="text-lg text-gray-600">Join our upcoming interactive pathology sessions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!sessions || sessions.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">This Month's Live Sessions</h2>
          <p className="text-lg text-gray-600">Join our upcoming interactive pathology sessions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {sessions.slice(0, 4).map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onViewDetails={() => window.location.href = `/sessions/${session.id}`}
            />
          ))}
        </div>

        <div className="text-center">
          <Link to="/sessions">
            <Button variant="outline" size="lg">
              View All Sessions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
