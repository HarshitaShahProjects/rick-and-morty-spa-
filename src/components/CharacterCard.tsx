import React from 'react'
import { Link } from 'react-router-dom'
import { Character } from '../api/api';

export default function CharacterCard({ c }: { c: Character }) {
  return (
    <Link to={`/character/${c.id}`} className="card">
      <img src={c.image} alt={c.name} />
      <div className="card-body">
        <h3>{c.name}</h3>
        <p>{c.species} — {c.status}</p>
      </div>
    </Link>
  )
}
