import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession, useUpdateSession } from '../../../hooks/useSessions';
import { SessionForm } from './SessionForm';
import { Skeleton } from '../../../components/ui/Skeleton';
import type { SessionCreate } from '../../../types/session.types';

export const EditSessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: session, isLoading } = useSession(id!);
  const updateSession = useUpdateSession();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (data: SessionCreate) => {
    if (!id) return;

    try {
      await updateSession.mutateAsync({ id, data });
      setToast({
        message: `Session updated successfully!`,
        type: 'success',
      });

      // Navigate back to sessions list after a brief delay
      setTimeout(() => {
        navigate('/admin/sessions');
      }, 1500);
    } catch (error) {
      setToast({
        message: 'Failed to update session. Please try again.',
        type: 'error',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">Session not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Session</h1>
        <p className="text-gray-600">Update the session details</p>
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

      <SessionForm
        session={session}
        onSubmit={handleSubmit}
        isLoading={updateSession.isPending}
      />
    </div>
  );
};
