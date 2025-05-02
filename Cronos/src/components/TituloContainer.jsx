import React from 'react';

const TituloContainer = ({ 
  titulo, 
  onVoltar, 
  botaoVoltarTexto = "← Voltar",
  botaoVoltarIcone = null
}) => {
  return (
    <div className="titulo-container">
      <button onClick={onVoltar} className="botao-voltar">
        {botaoVoltarIcone && botaoVoltarIcone} {botaoVoltarTexto}
      </button>
      <h1>{titulo}</h1>
    </div>
  );
};

export default TituloContainer; 