import React from 'react';
import '../styles/quiz.css';

const Alternativa = ({ 
  opcao, 
  index, 
  respostaSelecionada, 
  respostaCorreta, 
  onSelect 
}) => {
  const isSelecionada = respostaSelecionada === index;
  const isCorreta = index === respostaCorreta;
  
  const getClasseAlternativa = () => {
    if (respostaSelecionada === null) return 'opcao';
    if (isSelecionada) {
      return isCorreta ? 'opcao correta' : 'opcao incorreta';
    }
    return 'opcao disabled';
  };

  return (
    <button
      onClick={() => onSelect(index)}
      className={getClasseAlternativa()}
      disabled={respostaSelecionada !== null}
    >
      {opcao}
    </button>
  );
};

export default Alternativa; 