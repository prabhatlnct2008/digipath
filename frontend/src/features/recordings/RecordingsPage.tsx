import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecordings } from '../../hooks/useRecordings';
import { useTagsByCategory } from '../../hooks/useTags';
import { RecordingCard } from '../../components/common/RecordingCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { RecordingFilters as RecordingFiltersComponent } from './components/RecordingFilters';
import type { RecordingFilters } from '../../types/filters.types';

export function RecordingsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<RecordingFilters>({});

  const { data: recordings, isLoading, error } = useRecordings(filters);
  const { data: organTags = [] } = useTagsByCategory('organ');
  const { data: typeTags = [] } = useTagsByCategory('type');
  const { data: levelTags = [] } = useTagsByCategory('level');

  const handleFilterChange = (newFilters: Partial<RecordingFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
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
          title="Unable to load recordings"
          message="There was an error loading the recordings. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Past Recordings</h1>
          <p className="text-xl text-blue-100">
            Access our complete library of recorded pathology sessions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <RecordingFiltersComponent
              organTags={organTags}
              typeTags={typeTags}
              levelTags={levelTags}
              selectedOrgan={filters.organ_tag_id}
              selectedType={filters.type_tag_id}
              selectedLevel={filters.level_tag_id}
              selectedYear={filters.year}
              sortBy={filters.sort_by}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search recordings by title, speaker, or topic..."
              />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-80" />
                ))}
              </div>
            ) : recordings && recordings.items && recordings.items.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {recordings.items.length} recording{recordings.items.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {recordings.items.map((recording: any) => (
                    <RecordingCard
                      key={recording.session_id || recording.id}
                      session={recording.session || recording}
                      onWatch={() => navigate(`/recordings/${recording.session_id || recording.id}`)}
                    />
                  ))}
                </div>

                {/* Pagination will be implemented when API supports it */}
              </>
            ) : (
              <EmptyState
                title="No recordings found"
                message="Try adjusting your filters or check back later for new recordings."
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
