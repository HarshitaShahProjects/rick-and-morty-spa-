import React, { useState } from 'react'
import { useCharacters } from '../hooks/useCharacters'
import Loader from '../components/Loader'
import ErrorView from '../components/ErrorView'
import CharacterCard from '../components/CharacterCard'

export default function CharacterList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, error } = useCharacters(page, search)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  if (isLoading) return <Loader text="Loading characters..." />
  if (isError) return <ErrorView message={error?.message} />

  return (
  <div className="page-container">
    <input
      type="text"
      placeholder="Search characters by name..."
      value={search}
      onChange={handleSearchChange}
      className="search-box"
    />

    <div className="character-grid">
      {data?.results.map((c) => (
        <CharacterCard key={c.id} c={c} />
      ))}
    </div>

    <div className="pagination">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={!data?.info?.next}
      >
        Next
      </button>
    </div>
  </div>
)

}
