import React from 'react';
import { FaPlus } from 'react-icons/fa';
import TituloContainer from '../TituloContainer';
import PastaItem from './PastaItem';

const ListaPastas = ({ 
  pastas, 
  flashcardsRevisados, 
  onAbrirPasta, 
  onVoltarParaMain, 
  onAdicionarFlashcard 
}) => {
  return (
    <div className="flashcards-container">
      <TituloContainer 
        titulo="Meus Flashcards" 
        onVoltar={onVoltarParaMain}
      />
      <p>Selecione uma pasta para estudar:</p>
      
      <div className="pastas-lista">
        <button onClick={onAdicionarFlashcard} className="btn-adicionar">
          <FaPlus /> Adicionar Flashcard
        </button>
        {pastas.map((pasta, index) => (
          <PastaItem
            key={index}
            pasta={pasta}
            flashcardsRevisados={flashcardsRevisados}
            onClick={onAbrirPasta}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaPastas; 