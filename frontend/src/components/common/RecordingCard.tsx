import React from 'react';
import { Card } from '../ui/Card';
import { TagChip } from '../ui/TagChip';
import { Button } from '../ui/Button';
import type { Session } from '../../types/session.types';
import { formatDate, formatDuration } from '../../utils/formatters';

interface RecordingCardProps {
  session: Session;
  onWatch: () => void;
}

export const RecordingCard: React.FC<RecordingCardProps> = ({ session, onWatch }) => {
  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative mb-3">
        {session.recording?.thumbnail_url ? (
          <img
            src={session.recording.thumbnail_url}
            alt={session.title}
            className="w-full h-40 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
          </div>
        )}
        {session.recording && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
            {formatDuration(session.recording.duration_minutes)}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>

      <div className="space-y-1 mb-3 text-sm text-gray-700">
        <div className="flex items-center">
          <span className="font-medium mr-2">Speaker:</span>
          <span>{session.speaker.name}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">Date:</span>
          <span>{formatDate(session.date)}</span>
        </div>
        {session.recording && (
          <div className="flex items-center">
            <span className="font-medium mr-2">Views:</span>
            <span>{session.recording.views}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <TagChip label={session.organ_tag.name} />
        <TagChip label={session.type_tag.name} />
        <TagChip label={session.level_tag.name} />
      </div>

      <div className="mt-auto">
        <Button onClick={onWatch} variant="primary" size="sm" className="w-full">
          Watch Recording
        </Button>
      </div>
    </Card>
  );
};
