import React from "react"

const Header = ({ setPagina }) => {
  return (
    <div className="header">
      <nav>
        <ul className="nav-links">
          <li><a href="#" onClick={() => setPagina('trilha')}>Logo</a></li>
          <li><a href="#" onClick={() => setPagina('flashcards')}>Flashcards</a></li>
          <li><a href="#" onClick={() => setPagina('resumos')}>Resumos</a></li>
          <li><a href="#" onClick={() => setPagina('perfil')}>
          </a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
