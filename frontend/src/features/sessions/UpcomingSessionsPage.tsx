import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpcomingSessions } from '../../hooks/useSessions';
import { useTagsByCategory } from '../../hooks/useTags';
import { SessionCard } from '../../components/common/SessionCard';
import { FilterPanel } from '../../components/common/FilterPanel';
import { SearchBar } from '../../components/common/SearchBar';
import { CardSkeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/ui/Button';
import type { SessionFilters } from '../../types/filters.types';

export function UpcomingSessionsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SessionFilters>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const hasActiveFilters = filters.organ_tag_id || filters.type_tag_id || filters.level_tag_id || filters.search;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-gray">
        <EmptyState
          title="Unable to load sessions"
          message="There was an error loading the sessions. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-gray">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Upcoming Sessions
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl">
              Join our expert-led live sessions and expand your pathology knowledge
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-soft border border-border-light p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-micro"
                  >
                    Clear all
                  </button>
                )}
              </div>
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
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Search and Mobile Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Search sessions by title, speaker..."
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden"
                leftIcon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                }
              >
                Filters {hasActiveFilters && `(${Object.values(filters).filter(Boolean).length})`}
              </Button>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden bg-white rounded-xl shadow-soft border border-border-light p-5 mb-6 animate-slide-down">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>
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
              </div>
            )}

            {/* Results */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <CardSkeleton key={i} showTags />
                ))}
              </div>
            ) : sessions && sessions.items && sessions.items.length > 0 ? (
              <>
                {/* Results count */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-text-secondary">
                    Showing <span className="font-medium text-text-primary">{sessions.items.length}</span> session{sessions.items.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Sessions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sessions.items.map((session, index) => (
                    <div
                      key={session.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <SessionCard
                        session={session}
                        onViewDetails={() => navigate(`/sessions/${session.id}`)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-soft border border-border-light p-8">
                <EmptyState
                  title="No sessions found"
                  message="Try adjusting your filters or check back later for new sessions."
                  action={
                    hasActiveFilters ? (
                      <Button variant="primary" onClick={handleClearFilters}>
                        Clear Filters
                      </Button>
                    ) : undefined
                  }
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
