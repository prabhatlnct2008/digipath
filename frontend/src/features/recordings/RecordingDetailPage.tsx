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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 mb-4" />
          <Skeleton className="aspect-video mb-6" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (error || !recording) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/recordings"
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
            Back to Library
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">{recording.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {recording.recording?.video_url && (
                <YouTubeEmbed
                  videoUrl={recording.recording.video_url}
                  title={recording.title}
                />
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{recording?.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recording?.organ_tag && <TagChip label={recording.organ_tag.name} />}
                    {recording?.type_tag && <TagChip label={recording.type_tag.name} />}
                    {recording?.level_tag && <TagChip label={recording.level_tag.name} />}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Speaker:</span>
                  <p className="text-gray-900">{recording?.speaker?.name}</p>
                  {recording?.speaker?.title && (
                    <p className="text-gray-600 text-xs">{recording.speaker.title}</p>
                  )}
                </div>
                <div>
                  <span className="font-medium text-gray-500">Date:</span>
                  <p className="text-gray-900">{recording?.date && formatDate(recording.date)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Duration:</span>
                  <p className="text-gray-900">
                    {recording?.recording?.duration_minutes && formatDuration(recording.recording.duration_minutes)}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Views:</span>
                  <p className="text-gray-900">{recording?.recording?.views || 0}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Abstract</h3>
                <p className="text-gray-700 whitespace-pre-line mb-6">{recording?.abstract}</p>

                {recording?.objectives && recording.objectives.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Learning Objectives
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {recording.objectives.map((objective: string, index: number) => (
                        <li key={index} className="text-gray-700">
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {filteredRelated.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Recordings</h3>
                <div className="space-y-4">
                  {filteredRelated.map((related: any) => (
                    <RecordingCard
                      key={related.session_id || related.id}
                      session={related.session || related}
                      onWatch={() => navigate(`/recordings/${related.session_id || related.id}`)}
                    />
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
