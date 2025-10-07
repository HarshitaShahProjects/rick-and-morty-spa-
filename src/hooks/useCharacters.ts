import { useQuery } from '@tanstack/react-query'
import { fetchCharacters, CharactersResponse } from '../api/api'

export function useCharacters(page: number, name?: string) {
  return useQuery<CharactersResponse, Error>({
    queryKey: ['characters', page, name], // include name in query key
    queryFn: () => fetchCharacters(page, name),
    staleTime: 1000 * 60,
    placeholderData: (prevData) => prevData,
  })
}