import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import TituloContainer from '../TituloContainer';
import '../../styles/flashcards.css';

const AdicionarFlashcard = ({ voltarParaFlashcards, disciplinaSelecionada }) => {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [explicacao, setExplicacao] = useState('');
  const [disciplina, setDisciplina] = useState(disciplinaSelecionada || '');

  const disciplinas = [
    { id: 1, nome: "História" },
    { id: 2, nome: "Geografia" },
    { id: 3, nome: "Filosofia" },
    { id: 4, nome: "Sociologia" },
    { id: 5, nome: "Literatura" }
  ];

  // Atualiza a disciplina quando a disciplinaSelecionada mudar
  useEffect(() => {
    if (disciplinaSelecionada) {
      setDisciplina(disciplinaSelecionada);
    }
  }, [disciplinaSelecionada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const novoFlashcard = {
      id: Date.now(),
      pergunta,
      resposta,
      explicacao,
      periodo: {
        id: disciplinas.find(d => d.nome === disciplina)?.id || 1,
        nome: disciplina || "História"
      }
    };

    // Recupera os flashcards existentes
    const flashcardsExistentes = JSON.parse(localStorage.getItem('flashcards') || '[]');
    
    // Adiciona o novo flashcard
    const flashcardsAtualizados = [...flashcardsExistentes, novoFlashcard];
    
    // Salva no localStorage
    localStorage.setItem('flashcards', JSON.stringify(flashcardsAtualizados));
    
    // Limpa o formulário
    setPergunta('');
    setResposta('');
    setExplicacao('');
    setDisciplina(disciplinaSelecionada || '');
    
    // Volta para a lista de flashcards
    voltarParaFlashcards();
  };

  return (
    <div className="flashcards-container">
      <TituloContainer 
        titulo={`Adicionar Flashcard - ${disciplina || 'Nova Disciplina'}`}
        onVoltar={voltarParaFlashcards}
        botaoVoltarIcone={<FaArrowLeft />}
      />
      
      <form onSubmit={handleSubmit} className="form-flashcard">
    

        <div className="form-group">
          <label htmlFor="pergunta">Pergunta:</label>
          <textarea
            id="pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            required
            placeholder="Digite a pergunta do flashcard"
          />
        </div>

        <div className="form-group">
          <label htmlFor="resposta">Resposta:</label>
          <textarea
            id="resposta"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            required
            placeholder="Digite a resposta do flashcard"
          />
        </div>


        <button type="submit" className="btn-salvar-flashcard">
          Salvar Flashcard
        </button>
      </form>
    </div>
  );
};

export default AdicionarFlashcard; 