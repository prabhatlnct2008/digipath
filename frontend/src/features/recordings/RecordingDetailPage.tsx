import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecording } from '../../hooks/useRecordings';
import { useRecordings } from '../../hooks/useRecordings';
import { TagChip } from '../../components/ui/TagChip';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { RecordingCard } from '../../components/common/RecordingCard';
import { YouTubeEmbed } from './components/YouTubeEmbed';
import { formatDate, formatDuration } from '../../utils/formatters';
import type { Session } from '../../types/session.types';

export function RecordingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recordingData, isLoading, error } = useRecording(id!);

  // Assume the API returns a session with recording for a recording detail view
  const recording = recordingData as any as Session;

  // Get related recordings (same organ tag)
  const relatedFilters = recording
    ? { organ_tag_id: recording.organ_tag?.id }
    : undefined;
  const { data: relatedRecordingsData } = useRecordings(relatedFilters);
  const relatedRecordings = relatedRecordingsData?.items || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 mb-4 rounded-lg" />
          <Skeleton className="aspect-video mb-6 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !recording) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-gray">
        <EmptyState
          title="Recording not found"
          message="The recording you're looking for doesn't exist or has been removed."
        />
      </div>
    );
  }

  // Filter out current recording from related recordings
  const filteredRelated = relatedRecordings.filter((r: any) => r.id !== recording?.id || r.session_id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface-gray">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/recordings"
            className="inline-flex items-center text-primary-100 hover:text-white mb-4 transition-colors duration-micro group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-normal"
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
            Back to Library
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold animate-fade-in">{recording.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-card border border-border-light overflow-hidden animate-fade-in">
              {recording.recording?.video_url && (
                <YouTubeEmbed
                  videoUrl={recording.recording.video_url}
                  title={recording.title}
                />
              )}
            </div>

            {/* Recording Details */}
            <div className="bg-white rounded-xl shadow-card border border-border-light p-6 lg:p-8 animate-slide-up">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-primary mb-3">{recording?.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {recording?.organ_tag && <TagChip label={recording.organ_tag.name} />}
                  {recording?.type_tag && <TagChip label={recording.type_tag.name} />}
                  {recording?.level_tag && <TagChip label={recording.level_tag.name} />}
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-surface-gray rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Speaker</span>
                    <p className="text-text-primary font-medium">{recording?.speaker?.name}</p>
                    {recording?.speaker?.title && (
                      <p className="text-text-secondary text-sm">{recording.speaker.title}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Date</span>
                    <p className="text-text-primary font-medium">{recording?.date && formatDate(recording.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Duration</span>
                    <p className="text-text-primary font-medium">
                      {recording?.recording?.duration_minutes && formatDuration(recording.recording.duration_minutes)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div>
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Views</span>
                    <p className="text-text-primary font-medium">{recording?.recording?.views || 0}</p>
                  </div>
                </div>
              </div>

              {/* Abstract & Objectives */}
              <div className="border-t border-border-light pt-6">
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Abstract
                </h3>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line mb-6">{recording?.abstract}</p>

                {recording?.objectives && recording.objectives.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      Learning Objectives
                    </h3>
                    <ul className="space-y-2">
                      {recording.objectives.map((objective: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-text-secondary">
                          <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium mt-0.5">
                            {index + 1}
                          </span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {filteredRelated.length > 0 && (
              <div className="bg-white rounded-xl shadow-card border border-border-light p-5 sticky top-24 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Related Recordings
                </h3>
                <div className="space-y-4">
                  {filteredRelated.map((related: any, index: number) => (
                    <div key={related.session_id || related.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                      <RecordingCard
                        session={related.session || related}
                        onWatch={() => navigate(`/recordings/${related.session_id || related.id}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
