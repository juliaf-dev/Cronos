import React from 'react';
import { FaArrowLeft, FaArrowRight, FaVoltar, FaPlus } from 'react-icons/fa';
import TituloContainer from '../TituloContainer';
import FlashcardCard from './FlashcardCard';

const VisualizadorFlashcards = ({
  pasta,
  flashcardAtual,
  mostrarResposta,
  flashcardsRevisados,
  onVoltarParaPastas,
  onProximoFlashcard,
  onFlashcardAnterior,
  onMostrarResposta,
  onOcultarResposta,
  onMarcarRevisado,
  onExcluirFlashcard,
  onAdicionarFlashcard
}) => {
  if (pasta.flashcards.length === 0) {
    return (
      <div className="flashcards-container">
        <TituloContainer 
          titulo={pasta.nome} 
          onVoltar={onVoltarParaPastas}
        />
        <p>Não há flashcards nesta pasta.</p>
        <button onClick={onAdicionarFlashcard} className="btn-adicionar">
          <FaPlus /> Adicionar Flashcard
        </button>
      </div>
    );
  }

  const flashcardAtualObj = pasta.flashcards[flashcardAtual];
  const revisado = flashcardsRevisados[flashcardAtualObj.id];

  return (
    <div className="flashcards-container">
      <TituloContainer 
        titulo={pasta.nome} 
        onVoltar={onVoltarParaPastas}
        botaoVoltarIcone={<FaVoltar />}
      />
      <p className="flashcard-contador">
        Flashcard {flashcardAtual + 1} de {pasta.flashcards.length}
      </p>
      
      <FlashcardCard
        flashcard={flashcardAtualObj}
        mostrarResposta={mostrarResposta}
        revisado={revisado}
        onMostrarResposta={onMostrarResposta}
        onOcultarResposta={onOcultarResposta}
        onMarcarRevisado={onMarcarRevisado}
        onExcluir={onExcluirFlashcard}
      />
      
      <div className="navegacao-flashcards">
        <button 
          className="btn-navegacao-flashcard"
          onClick={onFlashcardAnterior}
          disabled={flashcardAtual === 0}
        >
          <FaArrowLeft /> Anterior
        </button>
        
        <button 
          className="btn-navegacao-flashcard"
          onClick={onProximoFlashcard}
          disabled={flashcardAtual === pasta.flashcards.length - 1}
        >
          Próximo <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default VisualizadorFlashcards; 