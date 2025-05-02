import React from 'react';
import { FaFolder, FaCheck, FaClock } from 'react-icons/fa';

const PastaItem = ({ pasta, flashcardsRevisados, onClick }) => {
  // Conta flashcards revisados e não revisados
  const flashcardsRevisadosCount = pasta.flashcards.filter(
    card => flashcardsRevisados[card.id]
  ).length;
  const flashcardsNaoRevisadosCount = pasta.flashcards.length - flashcardsRevisadosCount;
  
  return (
    <div 
      className="pasta-item"
      onClick={onClick}
    >
      <FaFolder className="pasta-icone" />
      <div className="pasta-info">
        <h3>{pasta.nome}</h3>
        <p>{pasta.flashcards.length} flashcards</p>
        <div className="pasta-status">
          <span className="status-revisado">
            <FaCheck /> {flashcardsRevisadosCount} revisados
          </span>
          <span className="status-nao-revisado">
            <FaClock /> {flashcardsNaoRevisadosCount} para revisar
          </span>
        </div>
      </div>
    </div>
  );
};

export default PastaItem; 