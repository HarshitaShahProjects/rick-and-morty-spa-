import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchCharacters, CharactersResponse } from '../api/api'

export function useCharacters(page: number): UseQueryResult<CharactersResponse, Error> {
  return useQuery<CharactersResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  })
}