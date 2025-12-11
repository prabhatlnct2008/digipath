import React from 'react';
import { Link } from 'react-router-dom';
import { TagChip } from '../ui/TagChip';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { Session } from '../../types/session.types';
import { formatDate, formatTime, formatDuration } from '../../utils/formatters';

interface SessionCardProps {
  session: Session;
  onViewDetails?: () => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onViewDetails }) => {
  const getStatusBadge = () => {
    switch (session.status) {
      case 'published':
        return <Badge variant="primary" dot>Upcoming</Badge>;
      case 'completed':
        return <Badge variant="success" dot>Completed</Badge>;
      case 'draft':
        return <Badge variant="default" dot>Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <article
      className="
        group bg-white rounded-xl border border-border-light shadow-soft
        hover:-translate-y-0.5 hover:shadow-card-hover hover:border-primary-200
        transition-all duration-normal ease-smooth
        h-full flex flex-col overflow-hidden
      "
    >
      <div className="p-5 flex flex-col flex-1">
        {/* Header: Tags and Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <TagChip label={session.organ_tag.label} size="sm" />
            <TagChip label={session.type_tag.label} size="sm" />
            <TagChip label={session.level_tag.label} size="sm" />
          </div>
          {getStatusBadge()}
        </div>

        {/* Title */}
        <h3 className="text-card-title text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-micro">
          {session.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
          {session.summary}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4 text-sm">
          {/* Speaker */}
          <div className="flex items-center gap-2 text-text-secondary">
            <svg className="w-4 h-4 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-text-primary">{session.speaker.name}</span>
            {session.speaker.title && (
              <span className="text-text-muted">• {session.speaker.title}</span>
            )}
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-4 h-4 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(session.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-4 h-4 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTime(session.time)}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-text-secondary">
            <svg className="w-4 h-4 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDuration(session.duration_minutes)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-border-light">
          {onViewDetails ? (
            <Button
              onClick={onViewDetails}
              variant="primary"
              size="sm"
              className="w-full"
              rightIcon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              View Details
            </Button>
          ) : (
            <Link to={`/sessions/${session.id}`}>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                View Details
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
