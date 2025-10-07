const BASE = 'https://rickandmortyapi.com/api'

export type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: { name: string; url: string }
  location: { name: string; url: string }
  image: string
  episode: string[]
  url: string
  created: string
}

export type CharactersResponse = {
  info: { count: number; pages: number; next: string | null; prev: string | null }
  results: Character[]
}

export async function fetchCharacters(page = 1): Promise<CharactersResponse> {
  const res = await fetch(`${BASE}/character?page=${page}`)
  if (!res.ok) throw new Error('Failed to fetch characters')
  return res.json()
}

export async function fetchCharacter(id: string | number): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`)
  if (!res.ok) throw new Error('Failed to fetch character')
  return res.json()
}

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
}

export async function fetchEpisodesByIds(ids: number[] | string): Promise<Episode[] | Episode> {
  const idStr = Array.isArray(ids) ? ids.join(',') : ids
  const res = await fetch(`${BASE}/episode/${idStr}`)
  if (!res.ok) throw new Error('Failed to fetch episodes')
  return res.json()
}
