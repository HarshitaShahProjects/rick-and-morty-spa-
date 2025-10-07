import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCharacter } from '../hooks/useCharacter'
import { useEpisodes } from '../hooks/useEpisodes'
import Loader from '../components/Loader'
import ErrorView from '../components/ErrorView'

export default function CharacterDetail() {
  const { id } = useParams()
  const { data: char, isLoading, isError, error } = useCharacter(id)

  // Guarded episode IDs
  const episodeIds = React.useMemo(() => {
    if (!char || !Array.isArray(char.episode)) return null
    return char.episode.map((e) => Number(e.split('/').pop())).filter(Boolean)
  }, [char])

  // Fetch episodes safely
  const { data: episodes, isLoading: epLoading, isError: epError } = useEpisodes(episodeIds)

  if (isLoading) return <Loader text="Loading character..." />
  if (isError) return <ErrorView message={error?.message} />
  if (!char) return <ErrorView message="Character not found!" />

  return (
    <div>
      <Link to="/">← Back to list</Link>

      <div className="detail">
        <img src={char.image} alt={char.name} />
        <div className="detail-body">
          <h2>{char.name}</h2>
          <p><strong>Species:</strong> {char.species}</p>
          <p><strong>Status:</strong> {char.status}</p>
          <p><strong>Gender:</strong> {char.gender}</p>
          <p><strong>Origin:</strong> {char.origin?.name}</p>
          <p><strong>Location:</strong> {char.location?.name}</p>
        </div>
      </div>

      <section>
        <h3>Episodes</h3>
        {epLoading && <Loader text="Loading episodes..." />}
        {epError && <ErrorView message="Failed to load episodes" />}
        {!epLoading && episodes && (
          <ul className="episodes">
            {Array.isArray(episodes)
              ? episodes.map((ep) => <li key={ep.id}>{ep.episode} — {ep.name} ({ep.air_date})</li>)
              : <li>{episodes.episode} — {episodes.name} ({episodes.air_date})</li>
            }
          </ul>
        )}
      </section>
    </div>
  )
}