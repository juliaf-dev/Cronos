import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Alternativa from './Alternativa';
import '../styles/quiz.css';

const Questao = ({
  questao,
  questaoAtual,
  totalQuestoes,
  respostaSelecionada,
  onSelectResposta,
  onVoltar,
  onProxima,
  onSalvarFlashcard
}) => {
  const [mostrarAlternativas, setMostrarAlternativas] = useState(false);

  // Reset do estado quando mudar de questão
  useEffect(() => {
    setMostrarAlternativas(false);
  }, [questaoAtual]);

  const handleMostrarAlternativas = () => {
    setMostrarAlternativas(true);
  };

  return (
    <div className="questao">
      <div className="progresso">
        Questão {questaoAtual + 1} de {totalQuestoes}
      </div>
      
      <h2>{questao.pergunta}</h2>
      
      {!mostrarAlternativas ? (
        <div className="container-botao-alternativas">
          <button 
            className="btn-mostrar-alternativas"
            onClick={handleMostrarAlternativas}
          >
            Ver Alternativas
          </button>
        </div>
      ) : (
        <>
          <div className="opcoes">
            {questao.opcoes.map((opcao, index) => (
              <Alternativa
                key={index}
                opcao={opcao}
                index={index}
                respostaSelecionada={respostaSelecionada}
                respostaCorreta={questao.respostaCorreta}
                onSelect={onSelectResposta}
              />
            ))}
          </div>
          
          {respostaSelecionada !== null && (
            <div className="explicacao-resposta">
              <h3>Explicação:</h3>
              <p>{questao.explicacao}</p>
            </div>
          )}
          
          <div className="navegacao-questoes">
            <button 
              onClick={onVoltar} 
              className="btn-navegacao"
              disabled={questaoAtual === 0}
            >
              ← Anterior
            </button>
            
            {respostaSelecionada !== null && (
              <button 
                className="btn-salvar-flashcard"
                onClick={onSalvarFlashcard}
              >
                <FaPlus /> Adicionar aos Flashcards
              </button>
            )}
            
            <button 
              onClick={onProxima} 
              className="btn-navegacao"
            >
              {questaoAtual === totalQuestoes - 1 ? 'Ver Resultado' : 'Próxima →'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Questao; 