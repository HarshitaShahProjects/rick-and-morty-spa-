import React, { useState } from 'react'
import { useCharacters } from '../hooks/useCharacters'
import Loader from '../components/Loader'
import ErrorView from '../components/ErrorView'
import CharacterCard from '../components/CharacterCard'

export default function CharacterList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error, isFetching } = useCharacters(page)

  if (isLoading) return <Loader text="Loading characters..." />
  if (isError) return <ErrorView message={error?.message} />

  return (
    <div>
      <div className="list-header">
        <h2>Characters (page {page})</h2>
        {isFetching && <small>Updating...</small>}
      </div>

      <div className="grid">
        {data?.results.map((c) => (
          <CharacterCard key={c.id} c={c} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!data?.info.prev}>Previous</button>
        <button onClick={() => setPage((p) => p + 1)} disabled={!data?.info.next}>Next</button>
      </div>
    </div>
  )
}
