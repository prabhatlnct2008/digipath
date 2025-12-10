import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePastSessions } from '../../../hooks/useSessions';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Pagination } from '../../../components/ui/Pagination';
import { AddRecordingModal } from '../recordings/AddRecordingModal';
import { UpdateRecordingModal } from '../recordings/UpdateRecordingModal';

export const PastSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addRecordingSessionId, setAddRecordingSessionId] = useState<string | null>(null);
  const [updateRecordingSessionId, setUpdateRecordingSessionId] = useState<string | null>(null);

  const itemsPerPage = 10;

  const filters = {
    search: searchTerm || undefined,
  };

  const { data: sessions, isLoading } = usePastSessions(filters);

  // Pagination
  const totalItems = sessions?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = sessions?.items.slice(startIndex, startIndex + itemsPerPage);

  const getRecordingStatusBadge = (hasRecording: boolean) => {
    if (hasRecording) {
      return <Badge color="green">Added</Badge>;
    }
    return <Badge color="yellow">Not Added</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Past Sessions</h1>
        <p className="text-gray-600">Manage completed sessions and their recordings</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <Input
          placeholder="Search past sessions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Sessions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Speaker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recording Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4" colSpan={5}>
                      <Skeleton className="h-6" />
                    </td>
                  </tr>
                ))
              ) : paginatedSessions && paginatedSessions.length > 0 ? (
                paginatedSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {session.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{session.speaker.name}</div>
                      <div className="text-xs text-gray-500">{session.speaker.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(session.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRecordingStatusBadge(session.has_recording)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/admin/sessions/${session.id}/edit`)}
                        >
                          Edit
                        </Button>
                        {session.has_recording ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setUpdateRecordingSessionId(session.id)}
                          >
                            Update Recording
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setAddRecordingSessionId(session.id)}
                          >
                            Add Recording
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No past sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {addRecordingSessionId && (
        <AddRecordingModal
          sessionId={addRecordingSessionId}
          onClose={() => setAddRecordingSessionId(null)}
        />
      )}

      {updateRecordingSessionId && (
        <UpdateRecordingModal
          sessionId={updateRecordingSessionId}
          onClose={() => setUpdateRecordingSessionId(null)}
        />
      )}
    </div>
  );
};
