import React, { useState, useEffect } from 'react';
import { FaTrash, FaArrowLeft, FaArrowRight, FaFolder, FaFolderOpen, FaArrowUp, FaCheck, FaClock, FaArrowLeft as FaVoltar, FaPlus } from 'react-icons/fa';

const Flashcards = ({ voltarParaTrilha, irParaAdicionarFlashcard }) => {
      
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardAtual, setFlashcardAtual] = useState(0);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [pastaAtual, setPastaAtual] = useState(null);
  const [pastas, setPastas] = useState([]);
  const [flashcardsRevisados, setFlashcardsRevisados] = useState({});

  // Definição dos períodos principais
  const periodosPrincipais = [
    { id: 1, nome: "Pré-história" },
    { id: 2, nome: "Civilizações antigas" }
  ];

  // Carrega os flashcards do localStorage ao iniciar o componente
  useEffect(() => {
    const flashcardsSalvos = JSON.parse(localStorage.getItem('flashcards') || '[]');
    setFlashcards(flashcardsSalvos);
    
    // Carrega o estado de revisão dos flashcards
    const revisadosSalvos = JSON.parse(localStorage.getItem('flashcardsRevisados') || '{}');
    setFlashcardsRevisados(revisadosSalvos);
    
    // Organiza os flashcards por período
    const flashcardsPorPeriodo = {};
    
    // Inicializa as pastas com os períodos principais
    periodosPrincipais.forEach(periodo => {
      flashcardsPorPeriodo[periodo.id] = {
        nome: periodo.nome,
        flashcards: []
      };
    });
    
    // Distribui os flashcards para suas respectivas pastas
    flashcardsSalvos.forEach(flashcard => {
      // Se o flashcard tiver um período associado, adiciona à pasta correspondente
      if (flashcard.periodo) {
        const periodoId = flashcard.periodo.id;
        if (flashcardsPorPeriodo[periodoId]) {
          flashcardsPorPeriodo[periodoId].flashcards.push(flashcard);
        }
      } else {
        // Se não tiver período, adiciona à pasta "Pré-história" por padrão
        flashcardsPorPeriodo[1].flashcards.push(flashcard);
      }
    });
    
    setPastas(Object.values(flashcardsPorPeriodo));
  }, []);

  // Função para abrir uma pasta
  const abrirPasta = (pasta) => {
    setPastaAtual(pasta);
    setFlashcardAtual(0);
    setMostrarResposta(false);
  };

  // Função para voltar para a lista de pastas
  const voltarParaPastas = () => {
    setPastaAtual(null);
  };

  // Função para ir para o próximo flashcard
  const proximoFlashcard = () => {
    if (pastaAtual && flashcardAtual < pastaAtual.flashcards.length - 1) {
      setFlashcardAtual(flashcardAtual + 1);
      setMostrarResposta(false);
    }
  };

  // Função para ir para o flashcard anterior
  const flashcardAnterior = () => {
    if (flashcardAtual > 0) {
      setFlashcardAtual(flashcardAtual - 1);
      setMostrarResposta(false);
    }
  };

  // Função para marcar um flashcard como revisado
  const marcarComoRevisado = (id) => {
    const novosRevisados = { ...flashcardsRevisados, [id]: true };
    setFlashcardsRevisados(novosRevisados);
    localStorage.setItem('flashcardsRevisados', JSON.stringify(novosRevisados));
  };

  // Função para excluir um flashcard
  const excluirFlashcard = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este flashcard?')) {
      // Remove o flashcard da pasta atual
      const novosFlashcards = pastaAtual.flashcards.filter(card => card.id !== id);
      pastaAtual.flashcards = novosFlashcards;
      
      // Atualiza o estado da pasta atual
      setPastaAtual({...pastaAtual});
      
      // Atualiza o localStorage
      const todosFlashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');
      const flashcardsAtualizados = todosFlashcards.filter(card => card.id !== id);
      localStorage.setItem('flashcards', JSON.stringify(flashcardsAtualizados));
      
      // Remove o flashcard dos revisados
      const novosRevisados = { ...flashcardsRevisados };
      delete novosRevisados[id];
      setFlashcardsRevisados(novosRevisados);
      localStorage.setItem('flashcardsRevisados', JSON.stringify(novosRevisados));
      
      // Ajusta o índice atual se necessário
      if (flashcardAtual >= novosFlashcards.length) {
        setFlashcardAtual(Math.max(0, novosFlashcards.length - 1));
      }
      
      // Se não houver mais flashcards na pasta, volta para a lista de pastas
      if (novosFlashcards.length === 0) {
        setPastaAtual(null);
      }
    }
  };

  // Renderização da lista de pastas
  const renderizarListaPastas = () => {
    return (
      <div className="flashcards-container">
        <div className="titulo-container">
          <button onClick={voltarParaTrilha} className="botao-voltar">
            <FaVoltar /> Voltar
          </button>
          <h1>Meus Flashcards</h1>
          <button onClick={irParaAdicionarFlashcard} className="btn-adicionar">
            <FaPlus /> Adicionar Flashcard
          </button>
        </div>
        <p>Selecione uma pasta para estudar:</p>
        
        <div className="pastas-lista">
          {pastas.map((pasta, index) => {
            // Conta flashcards revisados e não revisados
            const flashcardsRevisadosCount = pasta.flashcards.filter(
              card => flashcardsRevisados[card.id]
            ).length;
            const flashcardsNaoRevisadosCount = pasta.flashcards.length - flashcardsRevisadosCount;
            
            return (
              <div 
                key={index} 
                className="pasta-item"
                onClick={() => abrirPasta(pasta)}
              >
                <FaFolder className="pasta-icone" />
                <div className="pasta-info">
                  <h3>{pasta.nome}</h3>
                  <p>{pasta.flashcards.length} flashcards</p>
                  <div className="pasta-status">
                    <span className="status-revisado">
                      <FaCheck /> {flashcardsRevisadosCount} revisados
                    </span>
                    <span className="status-nao-revisado">
                      <FaClock /> {flashcardsNaoRevisadosCount} para revisar
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderização dos flashcards de uma pasta
  const renderizarFlashcards = () => {
    if (pastaAtual.flashcards.length === 0) {
      return (
        <div className="flashcards-container">
          <div className="titulo-container">
            <button className="botao-voltar" onClick={voltarParaPastas}>
              <FaVoltar /> Voltar
            </button>
            <h1>{pastaAtual.nome}</h1>
          </div>
          <p>Não há flashcards nesta pasta.</p>
          <button onClick={irParaAdicionarFlashcard} className="btn-adicionar">
            <FaPlus /> Adicionar Flashcard
          </button>
        </div>
      );
    }

    const flashcardAtualObj = pastaAtual.flashcards[flashcardAtual];
    const revisado = flashcardsRevisados[flashcardAtualObj.id];

    return (
      <div className="flashcards-container">
        <div className="titulo-container">
          <button className="botao-voltar" onClick={voltarParaPastas}>
            <FaVoltar /> Voltar
          </button>
          <h1>{pastaAtual.nome}</h1>
        </div>
        <p className="flashcard-contador">
          Flashcard {flashcardAtual + 1} de {pastaAtual.flashcards.length}
        </p>
        
        <div className={`flashcard ${revisado ? 'revisado' : 'nao-revisado'}`}>
          <div className="flashcard-conteudo">
            <h2>Pergunta:</h2>
            <p>{flashcardAtualObj.pergunta}</p>
            
            {mostrarResposta ? (
              <>
                <h2>Resposta:</h2>
                <p>{flashcardAtualObj.resposta}</p>
                
                <h2>Explicação:</h2>
                <p>{flashcardAtualObj.explicacao}</p>
                
                <button 
                  className="btn-flashcard"
                  onClick={() => {
                    setMostrarResposta(false);
                    marcarComoRevisado(flashcardAtualObj.id);
                  }}
                >
                  Ocultar Resposta
                </button>
              </>
            ) : (
              <button 
                className="btn-flashcard"
                onClick={() => setMostrarResposta(true)}
              >
                Mostrar Resposta
              </button>
            )}
          </div>
          
          <div className="flashcard-acoes">
            <div className="flashcard-status">
              {revisado ? (
                <span className="status-revisado">
                  <FaCheck /> Revisado
                </span>
              ) : (
                <span className="status-nao-revisado">
                  <FaClock /> Para revisar
                </span>
              )}
            </div>
            <button 
              className="btn-excluir-flashcard"
              onClick={() => excluirFlashcard(flashcardAtualObj.id)}
            >
              <FaTrash /> Excluir
            </button>
          </div>
        </div>
        
        <div className="navegacao-flashcards">
          <button 
            className="btn-navegacao-flashcard"
            onClick={flashcardAnterior}
            disabled={flashcardAtual === 0}
          >
            <FaArrowLeft /> Anterior
          </button>
          
          <button 
            className="btn-navegacao-flashcard"
            onClick={proximoFlashcard}
            disabled={flashcardAtual === pastaAtual.flashcards.length - 1}
          >
            Próximo <FaArrowRight />
          </button>
        </div>
      </div>
    );
  };

  // Se não houver pastas ou flashcards, mostra uma mensagem
  if (pastas.length === 0 || pastas.every(pasta => pasta.flashcards.length === 0)) {
    return (
      <div className="flashcards-container">
        <div className="titulo-container">
          <button className="botao-voltar" onClick={voltarParaTrilha}>
            <FaVoltar /> Voltar
          </button>
          <h1>Meus Flashcards</h1>
         
        </div>
        <p>Você ainda não tem flashcards salvos.</p>
        <p>Adicione questões do quiz aos seus flashcards para estudar!</p> 
        <button onClick={irParaAdicionarFlashcard} className="btn-adicionar">
            <FaPlus /> Adicionar Flashcard
          </button>
      </div>
    );
  }

  // Renderiza a lista de pastas ou os flashcards da pasta selecionada
  return pastaAtual ? renderizarFlashcards() : renderizarListaPastas();
};

export default Flashcards; 