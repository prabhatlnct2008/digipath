import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/public.api';
import { queryKeys } from '../api/queryKeys';

/**
 * Get home page data (upcoming sessions, recent recordings, stats)
 */
export function useHomeData() {
  return useQuery({
    queryKey: queryKeys.home,
    queryFn: () => publicApi.getHomeData(),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}
