import { useHomeData } from '../../hooks/useHome';
import { HeroSection } from './components/HeroSection';
import { ImpactCards } from './components/ImpactCards';
import { SessionPreview } from './components/SessionPreview';
import { RecordingPreview } from './components/RecordingPreview';
import { CTABand } from './components/CTABand';
import { EmptyState } from '../../components/common/EmptyState';

export function HomePage() {
  const { data, isLoading, error } = useHomeData();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Unable to load home page"
          message="There was an error loading the page. Please try again later."
        />
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <ImpactCards />
      <SessionPreview
        sessions={data?.upcoming_sessions || []}
        isLoading={isLoading}
      />
      <RecordingPreview
        recordings={data?.recent_recordings as any || []}
        isLoading={isLoading}
      />
      <CTABand />
    </div>
  );
}
