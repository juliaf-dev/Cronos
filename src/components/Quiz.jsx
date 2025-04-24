import React, { useState } from 'react';
import { FaPlus, FaCheck } from 'react-icons/fa';

/**
 * Componente Quiz - Gerencia um quiz interativo sobre o Período Paleolítico
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.voltarParaConteudo - Função para retornar à página de conteúdo
 * @param {Function} props.voltarParaMain - Função para retornar à página da Main
 */
const Quiz = ({ voltarParaConteudo, voltarParaMain }) => {
  // Estados para controlar o quiz
  const [questaoAtual, setQuestaoAtual] = useState(0);          // Índice da questão atual
  const [pontuacao, setPontuacao] = useState(0);                // Número de respostas corretas
  const [mostrarResultado, setMostrarResultado] = useState(false); // Controla exibição do resultado final
  const [respostaSelecionada, setRespostaSelecionada] = useState(null); // Índice da resposta selecionada
  const [respostasUsuario, setRespostasUsuario] = useState(Array(10).fill(null)); // Histórico de respostas
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [questoesSalvas, setQuestoesSalvas] = useState([]);

  // Array com todas as questões do quiz
  const questoes = [
    // Cada objeto representa uma questão com:
    // - pergunta: texto da questão
    // - opcoes: array com as alternativas
    // - respostaCorreta: índice da resposta correta (0-3)
    // - explicacao: texto explicativo mostrado após responder
    {
      pergunta: "Qual é o outro nome dado ao Período Paleolítico?",
      opcoes: [
        "Idade dos Metais",
        "Idade da Pedra Lascada",
        "Idade da Pedra Polida",
        "Idade do Bronze"
      ],
      respostaCorreta: 1,
      explicacao: "O Período Paleolítico também é conhecido como 'Idade da Pedra Lascada' porque as ferramentas eram feitas lascando pedras para criar bordas cortantes. Este nome foi cunhado no século XIX para diferenciar este período do Neolítico (Idade da Pedra Polida)."
    },
    {
      pergunta: "Quanto tempo durou aproximadamente o período Paleolítico?",
      opcoes: [
        "500 mil anos",
        "1 milhão de anos",
        "2,5 milhões de anos",
        "100 mil anos"
      ],
      respostaCorreta: 2,
      explicacao: "O Período Paleolítico durou aproximadamente 2,5 milhões de anos, começando há cerca de 2,5 milhões de anos e terminando há cerca de 10.000 anos. É o período mais longo da pré-história humana, abrangendo cerca de 99% da história tecnológica da humanidade."
    }
  ];

  /**
   * Função chamada quando o usuário seleciona uma resposta
   * @param {number} opcaoIndex - Índice da opção selecionada
   */
  const selecionarResposta = (opcaoIndex) => {
    // Evita múltiplas seleções na mesma questão
    if (respostaSelecionada !== null) return;
    
    // Atualiza a resposta selecionada
    setRespostaSelecionada(opcaoIndex);
    
    // Salva a resposta no histórico
    const novasRespostas = [...respostasUsuario];
    novasRespostas[questaoAtual] = opcaoIndex;
    setRespostasUsuario(novasRespostas);

    // Incrementa a pontuação se a resposta estiver correta
    if (opcaoIndex === questoes[questaoAtual].respostaCorreta) {
      setPontuacao(pontuacao + 1);
    }
  };

  /**
   * Função para avançar para a próxima questão
   * Mostra o resultado final se for a última questão
   */
  const irParaProximaQuestao = () => {
    // Impede avançar sem selecionar uma resposta
    if (respostaSelecionada === null) {
      alert('Por favor, selecione uma resposta antes de continuar.');
      return;
    }

    // Se for a última questão, mostra o resultado
    if (questaoAtual === questoes.length - 1) {
      setMostrarResultado(true);
    } else {
      // Avança para próxima questão e limpa a seleção
      setQuestaoAtual(questaoAtual + 1);
      setRespostaSelecionada(null);
    }
  };

  /**
   * Função para voltar à questão anterior
   * Restaura a resposta previamente selecionada
   */
  const voltarQuestao = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
      // Restaura a resposta anterior do histórico
      setRespostaSelecionada(respostasUsuario[questaoAtual - 1]);
    }
  };

  /**
   * Função para reiniciar o quiz
   * Reseta todos os estados para seus valores iniciais
   */
  const reiniciarQuiz = () => {
    setQuestaoAtual(0);
    setPontuacao(0);
    setMostrarResultado(false);
    setRespostaSelecionada(null);
    setRespostasUsuario(Array(10).fill(null));
  };

  // Função para salvar a questão atual nos flashcards
  const salvarParaFlashcard = () => {
    const questaoAtualObj = questoes[questaoAtual];
    const novaQuestao = {
      pergunta: questaoAtualObj.pergunta,
      resposta: questaoAtualObj.opcoes[questaoAtualObj.respostaCorreta],
      explicacao: questaoAtualObj.explicacao,
      id: Date.now() + Math.random(),
      periodo: {
        id: 1, // ID do período Pré-história
        nome: "Pré-história"
      }
    };
    
    // Verifica se a questão já foi salva
    const questaoJaSalva = questoesSalvas.some(q => q.pergunta === novaQuestao.pergunta);
    
    if (!questaoJaSalva) {
      setQuestoesSalvas([...questoesSalvas, novaQuestao]);
      
      // Salva no localStorage para persistência
      const flashcardsSalvos = JSON.parse(localStorage.getItem('flashcards') || '[]');
      localStorage.setItem('flashcards', JSON.stringify([...flashcardsSalvos, novaQuestao]));
      
      alert('Questão adicionada aos flashcards!');
    } else {
      alert('Esta questão já foi adicionada aos flashcards.');
    }
  };

  // Renderização do componente
  return (
    <div className="quiz-container">
      {/* Botão para voltar à página de conteúdo */}
      <button onClick={voltarParaConteudo} className="botao-voltar">
        ← Voltar
      </button>

      {/* Renderização condicional: mostra resultado ou questão atual */}
      {mostrarResultado ? (
        // Tela de resultado final
        <div className="resultado">
          <h2>Resultado do Quiz</h2>
          <p>Você acertou {pontuacao} de {questoes.length} questões!</p>
          {/* Mensagem personalizada baseada na pontuação */}
          <div className="mensagem-resultado">
            {pontuacao === questoes.length && "Parabéns! Você acertou todas as questões!"}
            {pontuacao >= questoes.length * 0.7 && pontuacao < questoes.length && "Muito bom! Você teve um ótimo desempenho!"}
            {pontuacao >= questoes.length * 0.5 && pontuacao < questoes.length * 0.7 && "Bom trabalho! Continue estudando!"}
            {pontuacao < questoes.length * 0.5 && "Continue estudando! Você pode melhorar!"}
          </div>
          <div className="botoes-resultado">
            <button onClick={reiniciarQuiz} className="btn-reiniciar">
              Tentar Novamente
            </button>
            <button onClick={voltarParaMain} className="btn-voltar-main">
              Voltar para home
            </button>
          </div>
        </div>
      ) : (
        // Tela da questão atual
        <div className="questao">
          {/* Indicador de progresso */}
          <div className="progresso">
            Questão {questaoAtual + 1} de {questoes.length}
          </div>
          
          {/* Texto da pergunta */}
          <h2>{questoes[questaoAtual].pergunta}</h2>
          
          {/* Lista de opções */}
          <div className="opcoes">
            {questoes[questaoAtual].opcoes.map((opcao, index) => (
              <button
                key={index}
                onClick={() => selecionarResposta(index)}
                className={`opcao ${
                  // Classes condicionais para feedback visual
                  respostaSelecionada === index 
                    ? index === questoes[questaoAtual].respostaCorreta 
                      ? 'correta'
                      : 'incorreta'
                    : ''
                } ${respostaSelecionada !== null ? 'disabled' : ''}`}
                disabled={respostaSelecionada !== null}
              >
                {opcao}
              </button>
            ))}
          </div>
          
          {/* Explicação da resposta (aparece após selecionar) */}
          {respostaSelecionada !== null && (
            <div className="explicacao-resposta">
              <h3>Explicação:</h3>
              <p>{questoes[questaoAtual].explicacao}</p>
            </div>
          )}
          
          {/* Botões de navegação */}
          <div className="navegacao-questoes">
            <button 
              onClick={voltarQuestao} 
              className="btn-navegacao"
              disabled={questaoAtual === 0}
            >
              ← Anterior
            </button>
            {respostaSelecionada !== null && (
              <button 
                className="btn-salvar-flashcard"
                onClick={salvarParaFlashcard}
              >
                <FaPlus /> Adicionar aos Flashcards
              </button>
            )}
            <button 
              onClick={irParaProximaQuestao} 
              className="btn-navegacao"
            >
              {questaoAtual === questoes.length - 1 ? 'Ver Resultado' : 'Próxima →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
