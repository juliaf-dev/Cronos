import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo/logocronos.png";
import Login from "./Login";
import UserPage from "./UserPage";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MateriasDropdown from './MateriasDropdown';
import { faLayerGroup, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';

const Header = ({ voltarParaMain, irParaResumos, irParaFlashcards, navegarParaMateria }) => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarUserPage, setMostrarUserPage] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  
  // Cria uma referência para o menu mobile
  const menuRef = useRef();
  const hamburguerRef = useRef();

  const handleLogin = () => {
    setUsuarioLogado(true);
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    setUsuarioLogado(false);
    setMostrarUserPage(false);
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Fecha o menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o menu está aberto E o clique foi fora do menu E fora do botão hambúrguer
      if (menuAberto && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          hamburguerRef.current &&
          !hamburguerRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    // Adiciona o listener quando o componente monta
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove o listener quando o componente desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAberto]);

  return (
    <div className="header">
      <div className="header-left">
        <img className="logo" src={logo} alt="logo do projeto" onClick={voltarParaMain} />
        
        {/* Itens de navegação para desktop */}
        <div className="desktop-nav">
          <div className="nav-button">
            <MateriasDropdown navegarParaMateria={navegarParaMateria} />
          </div>
          <button className="nav-button" onClick={irParaFlashcards}>
            <FontAwesomeIcon icon={faLayerGroup} />
            <span>Flashcards</span>
          </button>
          <button className="nav-button" onClick={irParaResumos}>
            <FontAwesomeIcon icon={faFileAlt} />
            <span>Resumos</span>
          </button>
        </div>
      </div>

      {/* Menu hambúrguer - visível apenas em mobile */}
      <button 
        className="menu-hamburguer" 
        onClick={toggleMenu}
        ref={hamburguerRef}
      >
        {menuAberto ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menu mobile */}
      <div 
        className={`mobile-nav ${menuAberto ? 'active' : ''}`}
        ref={menuRef}
      >
        <div className="nav-button">
          <MateriasDropdown navegarParaMateria={navegarParaMateria} />
        </div>
        <button className="nav-button" onClick={() => { irParaFlashcards(); setMenuAberto(false); }}>
          <FontAwesomeIcon icon={faLayerGroup} />
          <span>Flashcards</span>
        </button>
        <button className="nav-button" onClick={() => { irParaResumos(); setMenuAberto(false); }}>
          <FontAwesomeIcon icon={faFileAlt} />
          <span>Resumos</span>
        </button>
      </div>

      {/* Login/User - sempre visível */}
      <div className="user-section">
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
  );
};

export default Header;