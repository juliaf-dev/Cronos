import React from "react"
import logo from "../assets/logo/logocronos.png"
const Header = ({ setPagina }) => {
  return (
    <div className="header">
      <nav>     
        <ul className="nav-links">
          <li><a href="#" onClick={() => setPagina('')}><img className="logo" src={logo} alt="logo do projeto" /></a></li>
          <li><a href="#" onClick={() => setPagina('')}>Flashcards</a></li>
          <li><a href="#" onClick={() => setPagina('')}>Resumos</a></li>
          <li className="user-item"><a href="#" onClick={() => setPagina('')}>user</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
