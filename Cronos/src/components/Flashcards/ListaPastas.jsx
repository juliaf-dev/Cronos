import React from 'react';
import { FaPlus } from 'react-icons/fa';
import TituloContainer from '../TituloContainer';
import PastaItem from './PastaItem';

const ListaPastas = ({ 
  pastas, 
  flashcardsRevisados, 
  voltarParaMain, 
  irParaAdicionarFlashcard, 
  abrirPasta 
}) => {
  return (
    <div className="flashcards-container">
      <TituloContainer 
        titulo="Meus Flashcards" 
        onVoltar={voltarParaMain}
        botaoVoltarIcone={<FaPlus />}
      />
      <p>Selecione uma pasta para estudar:</p>
      
      <div className="pastas-lista">
        <button onClick={irParaAdicionarFlashcard} className="btn-adicionar">
          <FaPlus /> Adicionar Flashcard
        </button>
        {pastas.map((pasta, index) => (
          <PastaItem 
            key={index}
            pasta={pasta}
            flashcardsRevisados={flashcardsRevisados}
            onClick={() => abrirPasta(pasta)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaPastas; 