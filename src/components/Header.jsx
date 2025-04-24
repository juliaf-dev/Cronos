import React, { useState } from "react"
import logo from "../assets/logo/logocronos.png"
import Login from "./Login"
import UserPage from "./UserPage"
import { FaUser, FaLightbulb } from "react-icons/fa"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MateriasDropdown from './MateriasDropdown';
import { faBook, faLayerGroup, faFileAlt, faBell, faUser as faUserIcon } from '@fortawesome/free-solid-svg-icons';

const Header = ({ voltarParaMain, irParaResumos, irParaFlashcards, navegarParaMateria }) => {
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
        <img className="logo" src={logo} alt="logo do projeto" onClick={voltarParaMain} />
        <button className="nav-button">
          <MateriasDropdown navegarParaMateria={navegarParaMateria}/>
          </button>
        <button className="nav-button" onClick={irParaFlashcards}>
          <FontAwesomeIcon icon={faLayerGroup} />
          <span>Flashcards</span>
        </button>
        <button className="nav-button" onClick={irParaResumos}>
          <FontAwesomeIcon icon={faFileAlt} />
          <span > Resumos</span>
        </button>
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
