import React, { useState } from 'react';
import { useCompleteSession } from '../../../hooks/useSessions';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface CompleteSessionModalProps {
  sessionId: string;
  sessionTitle: string;
  onClose: () => void;
}

export const CompleteSessionModal: React.FC<CompleteSessionModalProps> = ({
  sessionId,
  sessionTitle,
  onClose,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const completeSession = useCompleteSession();

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
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!youtubeUrl.trim() && !showWarning) {
      setShowWarning(true);
      return;
    }

    try {
      const formData = new FormData();
      if (youtubeUrl.trim()) {
        formData.append('youtube_url', youtubeUrl.trim());
      }
      if (pdfFile) {
        formData.append('pdf_file', pdfFile);
      }

      await completeSession.mutateAsync({
        id: sessionId,
        data: formData as any, // FormData will be handled by the API
      });

      onClose();
    } catch (err) {
      setError('Failed to complete session. Please try again.');
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Complete Session" size="lg">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Mark <span className="font-semibold">{sessionTitle}</span> as completed and link its
            recording.
          </p>
        </div>

        <Input
          label="YouTube URL (Recommended)"
          type="url"
          value={youtubeUrl}
          onChange={(e) => {
            setYoutubeUrl(e.target.value);
            setShowWarning(false);
            setError('');
          }}
          placeholder="https://www.youtube.com/watch?v=..."
          helperText="Provide the YouTube link for the session recording"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PDF File (Optional)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload slides or handout PDF (max 10MB)
          </p>
          {pdfFile && (
            <p className="mt-1 text-sm text-green-600">Selected: {pdfFile.name}</p>
          )}
        </div>

        {showWarning && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              No YouTube URL provided. Are you sure you want to complete this session without a
              recording link?
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={completeSession.isPending}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={completeSession.isPending}
          >
            {completeSession.isPending ? 'Completing...' : 'Complete Session'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
