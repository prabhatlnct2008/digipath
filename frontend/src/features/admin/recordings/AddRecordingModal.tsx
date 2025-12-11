import React, { useState } from 'react';
import { useSession } from '../../../hooks/useSessions';
import { useAddRecording } from '../../../hooks/useRecordings';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';

interface AddRecordingModalProps {
  sessionId: string;
  onClose: () => void;
}

export const AddRecordingModal: React.FC<AddRecordingModalProps> = ({
  sessionId,
  onClose,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [error, setError] = useState('');

  const { data: session, isLoading: sessionLoading } = useSession(sessionId);
  const addRecording = useAddRecording();

  const handleSubmit = async () => {
    if (!youtubeUrl.trim()) {
      setError('YouTube URL is required');
      return;
    }

    if (!session) {
      setError('Session not found');
      return;
    }

    try {
      // Send JSON data
      const recordingData = {
        session_id: sessionId,
        youtube_url: youtubeUrl.trim(),
        pdf_url: pdfUrl.trim() || undefined,
      };

      await addRecording.mutateAsync(recordingData as any);
      onClose();
    } catch (err) {
      setError('Failed to add recording. Please try again.');
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Recording" size="lg">
      <div className="space-y-4">
        {sessionLoading ? (
          <Skeleton className="h-20" />
        ) : session ? (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{session.title}</p>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(session.date).toLocaleDateString('en-IN')} - {session.speaker.name}
            </p>
          </div>
        ) : (
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-red-600">Session not found</p>
          </div>
        )}

        <Input
          label="YouTube URL *"
          type="url"
          value={youtubeUrl}
          onChange={(e) => {
            setYoutubeUrl(e.target.value);
            setError('');
          }}
          placeholder="https://www.youtube.com/watch?v=..."
          helperText="Provide the YouTube link for the session recording"
          required
        />

        <Input
          label="PDF URL (Optional)"
          type="url"
          value={pdfUrl}
          onChange={(e) => {
            setPdfUrl(e.target.value);
            setError('');
          }}
          placeholder="https://drive.google.com/..."
          helperText="Link to slides or handout PDF (Google Drive, Dropbox, etc.)"
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={addRecording.isPending}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={addRecording.isPending || !session}
          >
            {addRecording.isPending ? 'Adding...' : 'Add Recording'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
