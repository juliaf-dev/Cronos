import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../styles/quiz.css';
import { gerarQuestoesQuiz } from '../services/geminiService';

// Componente Alternativa (mantido igual)
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

// Componente Questao (com pequenas adaptações)
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

// Componente principal Quiz com integração com IA
const Quiz = ({ conteudo, voltarParaConteudo, voltarParaMain }) => {
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostasUsuario, setRespostasUsuario] = useState([]);
  const [questoesSalvas, setQuestoesSalvas] = useState([]);
  const [questoes, setQuestoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarQuestoes = async () => {
      setCarregando(true);
      try {
        // Extrai matéria e tópico do conteúdo
        const [materia, topico] = conteudo.nome.split(' - ');
        
        // Gera questões usando a API de IA
        const questoesGeradas = await gerarQuestoesQuiz(materia, topico, 5); // Gera 5 questões
        
        // Formata as questões para o formato esperado pelo componente
        const questoesFormatadas = questoesGeradas.map(q => ({
          pergunta: q.pergunta,
          opcoes: q.opcoes,
          respostaCorreta: q.respostaCorreta,
          explicacao: q.explicacao
        }));
        
        setQuestoes(questoesFormatadas);
        setRespostasUsuario(Array(questoesFormatadas.length).fill(null));
        setErro(null);
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
        setErro('Erro ao carregar as questões. Por favor, tente novamente.');
      } finally {
        setCarregando(false);
      }
    };

    carregarQuestoes();
  }, [conteudo]);

  const selecionarResposta = (opcaoIndex) => {
    if (respostaSelecionada !== null) return;
    
    setRespostaSelecionada(opcaoIndex);
    
    const novasRespostas = [...respostasUsuario];
    novasRespostas[questaoAtual] = opcaoIndex;
    setRespostasUsuario(novasRespostas);

    if (opcaoIndex === questoes[questaoAtual].respostaCorreta) {
      setPontuacao(pontuacao + 1);
    }
  };

  const irParaProximaQuestao = () => {
    if (respostaSelecionada === null) {
      alert('Por favor, selecione uma resposta antes de continuar.');
      return;
    }

    if (questaoAtual === questoes.length - 1) {
      setMostrarResultado(true);
    } else {
      setQuestaoAtual(questaoAtual + 1);
      setRespostaSelecionada(null);
    }
  };

  const voltarQuestao = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
      setRespostaSelecionada(respostasUsuario[questaoAtual - 1]);
    }
  };

  const reiniciarQuiz = () => {
    setQuestaoAtual(0);
    setPontuacao(0);
    setMostrarResultado(false);
    setRespostaSelecionada(null);
    setRespostasUsuario(Array(questoes.length).fill(null));
  };

  const salvarParaFlashcard = () => {
    const questaoAtualObj = questoes[questaoAtual];
    const novaQuestao = {
      pergunta: questaoAtualObj.pergunta,
      resposta: questaoAtualObj.opcoes[questaoAtualObj.respostaCorreta],
      explicacao: questaoAtualObj.explicacao,
      id: Date.now() + Math.random(),
      periodo: {
        id: 1,
        nome: conteudo.nome.split(' - ')[1] || "Geral"
      }
    };
    
    const questaoJaSalva = questoesSalvas.some(q => q.pergunta === novaQuestao.pergunta);
    
    if (!questaoJaSalva) {
      setQuestoesSalvas([...questoesSalvas, novaQuestao]);
      
      const flashcardsSalvos = JSON.parse(localStorage.getItem('flashcards') || '[]');
      localStorage.setItem('flashcards', JSON.stringify([...flashcardsSalvos, novaQuestao]));
      
      alert('Questão adicionada aos flashcards!');
    } else {
      alert('Esta questão já foi adicionada aos flashcards.');
    }
  };

  if (carregando) {
    return (
      <div className="quiz-container">
        <button onClick={voltarParaConteudo} className="botao-voltar">
          ← Voltar
        </button>
        <div className="carregando">
          <p>Gerando questões sobre {conteudo.nome}...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="quiz-container">
        <button onClick={voltarParaConteudo} className="botao-voltar">
          ← Voltar
        </button>
        <div className="erro">
          <p>{erro}</p>
          <button onClick={() => window.location.reload()} className="btn-reiniciar">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (questoes.length === 0 && !carregando) {
    return (
      <div className="quiz-container">
        <button onClick={voltarParaConteudo} className="botao-voltar">
          ← Voltar
        </button>
        <div className="sem-questoes">
          <p>Não foi possível gerar questões para este conteúdo.</p>
          <button onClick={voltarParaConteudo} className="btn-voltar">
            Voltar ao conteúdo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <button onClick={voltarParaConteudo} className="botao-voltar">
        ← Voltar
      </button>

      {mostrarResultado ? (
        <div className="resultado">
          <h2>Resultado do Quiz sobre {conteudo.nome}</h2>
          <p>Você acertou {pontuacao} de {questoes.length} questões!</p>
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
        <Questao
          questao={questoes[questaoAtual]}
          questaoAtual={questaoAtual}
          totalQuestoes={questoes.length}
          respostaSelecionada={respostaSelecionada}
          onSelectResposta={selecionarResposta}
          onVoltar={voltarQuestao}
          onProxima={irParaProximaQuestao}
          onSalvarFlashcard={salvarParaFlashcard}
        />
      )}
    </div>
  );
};

export default Quiz;