import React, { useState } from "react"
import logo from "../assets/logo/logocronos.png"
import Login from "./Login"
import UserPage from "./UserPage"
import { FaUser, FaLightbulb } from "react-icons/fa"

const Header = ({ voltarParaTrilha, irParaResumos, irParaFlashcards }) => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarUserPage, setMostrarUserPage] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  const handleLogin = () => {
    setUsuarioLogado(true);
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    setUsuarioLogado(false);
    setMostrarUserPage(false);
  };

  return (
    <div className="header">
      <div className="header-left">
        <img className="logo" src={logo} alt="logo do projeto" onClick={voltarParaTrilha} />
        <nav className="header-nav">     
          <ul className="nav-links">
            <li><a href="#" onClick={irParaFlashcards}>Flashcards</a></li>
            <li><a href="#" onClick={irParaResumos}>Resumos</a></li>
          </ul>
        </nav>
      </div>

      <div className="header-right">
        {usuarioLogado ? (
          <button 
            className="btn-user"
            onClick={() => setMostrarUserPage(true)}
          >
            <FaUser />
          </button>
        ) : (
          <button 
            className="btn-login"
            onClick={() => setMostrarLogin(true)}
          >
            Login
          </button>
        )}
      </div>

      {mostrarLogin && (
        <Login onClose={() => setMostrarLogin(false)} onLogin={handleLogin} />
      )}

      {mostrarUserPage && (
        <UserPage 
          onClose={() => setMostrarUserPage(false)} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  )
}

export default Header
