import React, { useState } from 'react';
import { FaArrowLeft as FaVoltar, FaSave } from 'react-icons/fa';

const AdicionarFlashcard = ({ voltarParaFlashcards, periodosPrincipais }) => {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [explicacao, setExplicacao] = useState('');
  const [periodoSelecionado, setPeriodoSelecionado] = useState(periodosPrincipais[0].id);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = () => {
    if (!pergunta.trim() || !resposta.trim()) {
      alert('Por favor, preencha a pergunta e a resposta');
      return;
    }

    setSalvando(true);
    
    // Cria um novo flashcard
    const novoFlashcard = {
      id: Date.now(),
      pergunta,
      resposta,
      explicacao: explicacao.trim() || 'Sem explicação adicional',
      periodo: periodosPrincipais.find(p => p.id === periodoSelecionado)
    };

    // Obtém flashcards existentes do localStorage
    const flashcardsSalvos = JSON.parse(localStorage.getItem('flashcards') || '[]');
    
    // Adiciona o novo flashcard
    flashcardsSalvos.push(novoFlashcard);
    
    // Salva no localStorage
    localStorage.setItem('flashcards', JSON.stringify(flashcardsSalvos));
    
    // Mostra mensagem de sucesso
    setMensagemSucesso('Flashcard salvo com sucesso!');
    
    // Limpa os campos após salvar
    setPergunta('');
    setResposta('');
    setExplicacao('');
    
    // Desativa o estado de salvando
    setSalvando(false);
  };

  return (
    <div className="adicionar-flashcard">
      <div className="titulo-container">
        <button onClick={voltarParaFlashcards} className="botao-voltar">
          <FaVoltar /> Voltar
        </button>
        <h1>Adicionar Novo Flashcard</h1>
      </div>
      
      {mensagemSucesso && (
        <div className="mensagem-sucesso">
          {mensagemSucesso}
        </div>
      )}
      
      <div className="formulario-flashcard">
        <div className="campo-form">
          <label htmlFor="periodo">Período:</label>
          <select 
            id="periodo"
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(Number(e.target.value))}
            disabled={salvando}
          >
            {periodosPrincipais.map(periodo => (
              <option key={periodo.id} value={periodo.id}>
                {periodo.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div className="campo-form">
          <label htmlFor="pergunta">Pergunta:</label>
          <textarea 
            id="pergunta"
            placeholder="Digite a pergunta do flashcard..." 
            rows="3"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            disabled={salvando}
          ></textarea>
        </div>
        
        <div className="campo-form">
          <label htmlFor="resposta">Resposta:</label>
          <textarea 
            id="resposta"
            placeholder="Digite a resposta do flashcard..." 
            rows="3"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            disabled={salvando}
          ></textarea>
        </div>
        
        <div className="campo-form">
          <label htmlFor="explicacao">Explicação (opcional):</label>
          <textarea 
            id="explicacao"
            placeholder="Digite uma explicação adicional (opcional)..." 
            rows="3"
            value={explicacao}
            onChange={(e) => setExplicacao(e.target.value)}
            disabled={salvando}
          ></textarea>
        </div>
        
        <div className="acoes">
          <button 
            onClick={handleSalvar} 
            className="btn-salvar"
            disabled={salvando}
          >
            <FaSave /> {salvando ? 'Salvando...' : 'Salvar Flashcard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdicionarFlashcard; 