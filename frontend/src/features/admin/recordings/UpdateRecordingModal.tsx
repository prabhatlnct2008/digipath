import React, { useState, useEffect } from 'react';
import { useSession } from '../../../hooks/useSessions';
import { useUpdateRecording } from '../../../hooks/useRecordings';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';

interface UpdateRecordingModalProps {
  sessionId: string;
  onClose: () => void;
}

export const UpdateRecordingModal: React.FC<UpdateRecordingModalProps> = ({
  sessionId,
  onClose,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [replacePdf, setReplacePdf] = useState(false);
  const [error, setError] = useState('');

  const { data: session, isLoading: sessionLoading } = useSession(sessionId);
  const updateRecording = useUpdateRecording();

  useEffect(() => {
    if (session?.recording) {
      setYoutubeUrl(session.recording.video_url);
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        setPdfFile(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError('PDF file size must be less than 10MB');
        setPdfFile(null);
        return;
      }
      setPdfFile(file);
      setReplacePdf(true);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!youtubeUrl.trim()) {
      setError('YouTube URL is required');
      return;
    }

    if (!session?.recording) {
      setError('Recording not found');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('youtube_url', youtubeUrl.trim());

      if (replacePdf && pdfFile) {
        formData.append('pdf_file', pdfFile);
      }

      await updateRecording.mutateAsync({
        id: session.recording.id,
        data: formData as any,
      });
      onClose();
    } catch (err) {
      setError('Failed to update recording. Please try again.');
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Update Recording" size="lg">
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
          helperText="Update the YouTube link for the session recording"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Replace PDF File (Optional)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload a new PDF to replace the existing one (max 10MB)
          </p>
          {pdfFile && (
            <p className="mt-1 text-sm text-green-600">Selected: {pdfFile.name}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={updateRecording.isPending}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={updateRecording.isPending || !session?.recording}
          >
            {updateRecording.isPending ? 'Updating...' : 'Update Recording'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
