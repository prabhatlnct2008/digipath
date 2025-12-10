import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminSessions, useDeleteSession, usePublishSession, useUnpublishSession } from '../../../hooks/useSessions';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Pagination } from '../../../components/ui/Pagination';
import type { SessionStatus } from '../../../types/session.types';

export const AdminSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<SessionStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const itemsPerPage = 10;

  // Build filters
  const filters = {
    status: statusFilter !== 'all' ? statusFilter : undefined,
    search: searchTerm || undefined,
  };

  const { data: sessions, isLoading } = useAdminSessions(filters);
  const deleteSession = useDeleteSession();
  const publishSession = usePublishSession();
  const unpublishSession = useUnpublishSession();

  // Pagination
  const totalItems = sessions?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = sessions?.items.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id: string) => {
    try {
      await deleteSession.mutateAsync(id);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const handlePublishToggle = async (id: string, isPublished: boolean) => {
    try {
      if (isPublished) {
        await unpublishSession.mutateAsync(id);
      } else {
        await publishSession.mutateAsync(id);
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const getStatusBadge = (status: SessionStatus) => {
    const colors = {
      draft: 'yellow' as const,
      published: 'green' as const,
      completed: 'blue' as const,
    };
    return <Badge color={colors[status]}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Sessions</h1>
          <p className="text-gray-600">Create and manage telepathology sessions</p>
        </div>
        <Button onClick={() => navigate('/admin/sessions/create')}>
          Create Session
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setStatusFilter('draft');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'draft'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Draft
            </button>
            <button
              onClick={() => {
                setStatusFilter('published');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'published'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => {
                setStatusFilter('completed');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
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
                  Date/Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                        {new Date(session.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-500">{session.time}</div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(session.status)}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/admin/sessions/${session.id}/edit`)}
                        >
                          Edit
                        </Button>
                        {session.status === 'draft' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePublishToggle(session.id, false)}
                            disabled={publishSession.isPending}
                          >
                            Publish
                          </Button>
                        )}
                        {session.status === 'published' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePublishToggle(session.id, true)}
                            disabled={unpublishSession.isPending}
                          >
                            Unpublish
                          </Button>
                        )}
                        {deleteConfirm === session.id ? (
                          <>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleDelete(session.id)}
                              disabled={deleteSession.isPending}
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteConfirm(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => setDeleteConfirm(session.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No sessions found. Create your first session to get started.
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
    </div>
  );
};
