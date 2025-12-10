import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateSession } from '../../../hooks/useSessions';
import { SessionForm } from './SessionForm';
import type { SessionCreate } from '../../../types/session.types';

export const CreateSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const createSession = useCreateSession();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (data: SessionCreate, isDraft: boolean) => {
    try {
      await createSession.mutateAsync(data);
      setToast({
        message: `Session ${isDraft ? 'saved as draft' : 'published'} successfully!`,
        type: 'success',
      });

      // Navigate back to sessions list after a brief delay
      setTimeout(() => {
        navigate('/admin/sessions');
      }, 1500);
    } catch (error) {
      setToast({
        message: 'Failed to create session. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Session</h1>
        <p className="text-gray-600">Fill in the details to create a new telepathology session</p>
      </div>

      {toast && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            toast.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {toast.message}
        </div>
      )}

      <SessionForm onSubmit={handleSubmit} isLoading={createSession.isPending} />
    </div>
  );
};
