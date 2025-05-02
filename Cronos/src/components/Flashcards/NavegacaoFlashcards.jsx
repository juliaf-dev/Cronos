import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NavegacaoFlashcards = ({ currentIndex, totalFlashcards, onAnterior, onProximo }) => {
  return (
    <div className="navegacao-flashcards">
      <button
        className="btn-navegacao"
        onClick={onAnterior}
        disabled={currentIndex === 0}
      >
        <FaChevronLeft /> Anterior
      </button>

      <span className="contador-flashcards">
        {currentIndex + 1} de {totalFlashcards}
      </span>

      <button
        className="btn-navegacao"
        onClick={onProximo}
        disabled={currentIndex === totalFlashcards - 1}
      >
        Próximo <FaChevronRight />
      </button>
    </div>
  );
};

export default NavegacaoFlashcards; 