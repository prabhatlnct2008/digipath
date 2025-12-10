import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpcomingSessions } from '../../hooks/useSessions';
import { useTagsByCategory } from '../../hooks/useTags';
import { SessionCard } from '../../components/common/SessionCard';
import { FilterPanel } from '../../components/common/FilterPanel';
import { SearchBar } from '../../components/common/SearchBar';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import type { SessionFilters } from '../../types/filters.types';

export function UpcomingSessionsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SessionFilters>({});

  const { data: sessions, isLoading, error } = useUpcomingSessions(filters);
  const { data: organTags = [] } = useTagsByCategory('organ');
  const { data: typeTags = [] } = useTagsByCategory('type');
  const { data: levelTags = [] } = useTagsByCategory('level');

  const handleOrganChange = (tagId: string) => {
    setFilters((prev) => ({ ...prev, organ_tag_id: tagId || undefined }));
  };

  const handleTypeChange = (tagId: string) => {
    setFilters((prev) => ({ ...prev, type_tag_id: tagId || undefined }));
  };

  const handleLevelChange = (tagId: string) => {
    setFilters((prev) => ({ ...prev, level_tag_id: tagId || undefined }));
  };

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query || undefined }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Unable to load sessions"
          message="There was an error loading the sessions. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Upcoming Sessions</h1>
          <p className="text-xl text-blue-100">
            Join our expert-led live sessions and expand your pathology knowledge
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <FilterPanel
              organTags={organTags}
              typeTags={typeTags}
              levelTags={levelTags}
              selectedOrgan={filters.organ_tag_id}
              selectedType={filters.type_tag_id}
              selectedLevel={filters.level_tag_id}
              onOrganChange={handleOrganChange}
              onTypeChange={handleTypeChange}
              onLevelChange={handleLevelChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search sessions by title, speaker, or description..."
              />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            ) : sessions && sessions.items && sessions.items.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {sessions.items.length} session{sessions.items.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {sessions.items.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      onViewDetails={() => navigate(`/sessions/${session.id}`)}
                    />
                  ))}
                </div>

                {/* Pagination will be implemented when API supports it */}
              </>
            ) : (
              <EmptyState
                title="No sessions found"
                message="Try adjusting your filters or check back later for new sessions."
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
