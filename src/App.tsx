import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CharacterList from './pages/CharacterList'
import CharacterDetail from './pages/CharacterDetail'

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">
    <Link to="/" className="header-link">Rick & Morty — Characters</Link>
  </h1>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </main>

      <footer className="footer"></footer>
    </div>
  )
}
