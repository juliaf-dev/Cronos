import React from 'react';
import { FaTrash, FaCheck, FaClock } from 'react-icons/fa';

const FlashcardItem = ({ 
  flashcard, 
  revisado, 
  mostrarResposta, 
  setMostrarResposta, 
  marcarComoRevisado, 
  excluirFlashcard 
}) => {
  return (
    <div className={`flashcard ${revisado ? 'revisado' : 'nao-revisado'}`}>
      <div className="flashcard-conteudo">
        <h2>Pergunta:</h2>
        <p>{flashcard.pergunta}</p>
        
        {mostrarResposta ? (
          <>
            <h2>Resposta:</h2>
            <p>{flashcard.resposta}</p>
            
            <h2>Explicação:</h2>
            <p>{flashcard.explicacao}</p>
            
            <button 
              className="btn-flashcard"
              onClick={() => {
                setMostrarResposta(false);
                marcarComoRevisado(flashcard.id);
              }}
            >
              Ocultar Resposta
            </button>
          </>
        ) : (
          <button 
            className="btn-flashcard"
            onClick={() => setMostrarResposta(true)}
          >
            Mostrar Resposta
          </button>
        )}
      </div>
      
      <div className="flashcard-acoes">
        <div className="flashcard-status">
          {revisado ? (
            <span className="status-revisado">
              <FaCheck /> Revisado
            </span>
          ) : (
            <span className="status-nao-revisado">
              <FaClock /> Para revisar
            </span>
          )}
        </div>
        <button 
          className="btn-excluir-flashcard"
          onClick={() => excluirFlashcard(flashcard.id)}
        >
          <FaTrash /> Excluir
        </button>
      </div>
    </div>
  );
};

export default FlashcardItem; 