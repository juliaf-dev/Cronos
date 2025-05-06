import React from 'react';
import { FaTrash, FaCheck, FaClock } from 'react-icons/fa';

const FlashcardCard = ({ 
  flashcard, 
  mostrarResposta, 
  revisado, 
  onMostrarResposta, 
  onOcultarResposta, 
  onMarcarRevisado, 
  onExcluir 
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
                onOcultarResposta();
                onMarcarRevisado(flashcard.id);
              }}
            >
              Ocultar Resposta
            </button>
          </>
        ) : (
          <button 
            className="btn-flashcard"
            onClick={onMostrarResposta}
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
          onClick={() => onExcluir(flashcard.id)}
        >
          <FaTrash /> Excluir
        </button>
      </div>
    </div>
  );
};

export default FlashcardCard; 