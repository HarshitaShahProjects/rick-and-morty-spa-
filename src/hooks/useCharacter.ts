import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Character, fetchCharacter } from '../api/api'

export function useCharacter(id: string | undefined): UseQueryResult<Character, Error> {
  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id as string),
    enabled: Boolean(id),
  })
}