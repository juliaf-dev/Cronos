import React, { useState } from 'react';
import { FaEye, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import NavegacaoFlashcards from './NavegacaoFlashcards';
import '../styles/flashcards.css';

const Flashcards = ({ flashcards, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [flashcardsRevisados, setFlashcardsRevisados] = useState(new Set());

  const flashcardAtual = flashcards[currentIndex];

  const handleMostrarResposta = () => {
    setMostrarResposta(!mostrarResposta);
  };

  const handleProximo = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setMostrarResposta(false);
    }
  };

  const handleAnterior = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setMostrarResposta(false);
    }
  };

  const handleRevisado = (revisado) => {
    const novosRevisados = new Set(flashcardsRevisados);
    if (revisado) {
      novosRevisados.add(currentIndex);
    } else {
      novosRevisados.delete(currentIndex);
    }
    setFlashcardsRevisados(novosRevisados);
  };

  if (!flashcardAtual) {
    return <div className="flashcard-item">Nenhum flashcard disponível.</div>;
  }

  return (
    <div className="flashcard-container">
      <div className="flashcard-item">
        <h3 className="flashcard-pergunta">{flashcardAtual.pergunta}</h3>
        
        {mostrarResposta && (
          <>
            <div className="flashcard-resposta">{flashcardAtual.resposta}</div>
            {flashcardAtual.explicacao && (
              <div className="flashcard-explicacao">{flashcardAtual.explicacao}</div>
            )}
          </>
        )}

        <div className="flashcard-acoes">
          <button 
            className="btn-mostrar-resposta"
            onClick={handleMostrarResposta}
          >
            <FaEye /> {mostrarResposta ? 'Ocultar Resposta' : 'Mostrar Resposta'}
          </button>

          {mostrarResposta && (
            <div className="botoes-revisao">
              <button 
                className="btn-revisao"
                onClick={() => handleRevisado(true)}
              >
                <FaCheck /> Revisado
              </button>
              <button 
                className="btn-revisao"
                onClick={() => handleRevisado(false)}
              >
                <FaTimes /> Não Revisado
              </button>
            </div>
          )}

          <button 
            className="btn-excluir"
            onClick={() => onDelete(flashcardAtual.id)}
          >
            <FaTrash /> Excluir
          </button>
        </div>

        <div className={flashcardsRevisados.has(currentIndex) ? 'status-revisado' : 'status-nao-revisado'}>
          {flashcardsRevisados.has(currentIndex) ? 'Revisado' : 'Não Revisado'}
        </div>
      </div>

      <NavegacaoFlashcards
        currentIndex={currentIndex}
        totalFlashcards={flashcards.length}
        onAnterior={handleAnterior}
        onProximo={handleProximo}
      />
    </div>
  );
};

export default Flashcards; 