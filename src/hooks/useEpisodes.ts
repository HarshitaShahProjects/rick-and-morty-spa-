import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchEpisodesByIds, Episode } from '../api/api'

export function useEpisodes(ids: number[] | string | null): UseQueryResult<Episode[] | Episode, Error> {
  return useQuery<Episode[] | Episode, Error>({
    queryKey: ['episodes', ids],
    queryFn: () => fetchEpisodesByIds(ids as any),
    enabled: Boolean(ids) && (Array.isArray(ids) ? ids.length > 0 : true),
  })
}