import React from 'react';
import { Link } from 'react-router-dom';
import { TagChip } from '../ui/TagChip';
import { Button } from '../ui/Button';
import type { Session } from '../../types/session.types';
import { formatDate, formatDuration } from '../../utils/formatters';

interface RecordingCardProps {
  session: Session;
  onWatch?: () => void;
}

export const RecordingCard: React.FC<RecordingCardProps> = ({ session, onWatch }) => {
  return (
    <article
      className="
        group bg-white rounded-xl border border-gray-200 shadow-sm
        hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200
        transition-all duration-200
        h-full flex flex-col overflow-hidden
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {session.recording?.thumbnail_url ? (
          <img
            src={session.recording.thumbnail_url}
            alt={session.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <svg className="w-16 h-16 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-200">
            <svg className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {session.recording && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
            {formatDuration(session.recording.duration_minutes)}
          </div>
        )}

        {/* Views badge */}
        {session.recording && session.recording.views > 0 && (
          <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {session.recording.views}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <TagChip label={session.organ_tag.label} size="sm" />
          <TagChip label={session.type_tag.label} size="sm" />
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-150">
          {session.title}
        </h3>

        {/* Meta Information */}
        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
          {/* Speaker */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate">{session.speaker.name}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(session.date)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {onWatch ? (
            <Button
              onClick={onWatch}
              variant="primary"
              size="sm"
              className="w-full"
              leftIcon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              }
            >
              Watch Recording
            </Button>
          ) : (
            <Link to={`/recordings/${session.id}`}>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                leftIcon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                }
              >
                Watch Recording
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
