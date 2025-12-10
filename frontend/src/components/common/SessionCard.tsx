import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TagChip } from '../ui/TagChip';
import { Button } from '../ui/Button';
import type { Session } from '../../types/session.types';
import { formatDate, formatTime, formatDuration } from '../../utils/formatters';
import { STATUS_COLORS } from '../../utils/constants';

interface SessionCardProps {
  session: Session;
  onViewDetails: () => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onViewDetails }) => {
  const statusColor = STATUS_COLORS[session.status] as 'yellow' | 'green' | 'blue';

  return (
    <Card hover className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{session.title}</h3>
        <Badge color={statusColor}>{session.status}</Badge>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{session.summary}</p>

      <div className="space-y-2 mb-4 text-sm text-gray-700">
        <div className="flex items-center">
          <span className="font-medium mr-2">Speaker:</span>
          <span>{session.speaker.name}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">Date:</span>
          <span>{formatDate(session.date)}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">Time:</span>
          <span>{formatTime(session.time)}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">Duration:</span>
          <span>{formatDuration(session.duration_minutes)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <TagChip label={session.organ_tag.name} />
        <TagChip label={session.type_tag.name} />
        <TagChip label={session.level_tag.name} />
      </div>

      <div className="mt-auto">
        <Button onClick={onViewDetails} variant="primary" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </Card>
  );
};
