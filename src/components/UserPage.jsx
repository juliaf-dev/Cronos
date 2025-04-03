import React from 'react';
import { FaUser, FaSignOutAlt, FaCog, FaHistory } from 'react-icons/fa';

const UserPage = ({ onClose, onLogout }) => {
  return (
    <div className="user-overlay">
      <div className="user-container">
        <button className="fechar-user" onClick={onClose}>×</button>
        
        <div className="user-header">
          <div className="user-avatar">
            <FaUser />
          </div>
          <h2>Meu Perfil</h2>
        </div>
        
        <div className="user-info">
          <p className="user-email">usuario@exemplo.com</p>
          <p className="user-role">Estudante</p>
        </div>
        
        <div className="user-menu">
          <button className="menu-item">
            <FaHistory />
            <span>Meus Resumos</span>
          </button>
          
          <button className="menu-item">
            <FaCog />
            <span>Configurações</span>
          </button>
          
          <button className="menu-item logout" onClick={onLogout}>
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage; 