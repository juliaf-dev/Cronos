import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../../styles/FormularioFlashcard.css';

const FormularioFlashcard = ({ onSubmit }) => {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [explicacao, setExplicacao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!pergunta.trim() || !resposta.trim()) {
      alert('Por favor, preencha pelo menos a pergunta e a resposta.');
      return;
    }

    onSubmit({
      pergunta,
      resposta,
      explicacao,
      dataCriacao: new Date().toISOString(),
      revisado: false
    });

    // Limpar o formulário
    setPergunta('');
    setResposta('');
    setExplicacao('');
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-flashcard">
      <div className="campo-formulario">
        <label htmlFor="pergunta">Pergunta:</label>
        <textarea
          id="pergunta"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Digite a pergunta do flashcard"
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="resposta">Resposta:</label>
        <textarea
          id="resposta"
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          placeholder="Digite a resposta do flashcard"
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="explicacao">Explicação (opcional):</label>
        <textarea
          id="explicacao"
          value={explicacao}
          onChange={(e) => setExplicacao(e.target.value)}
          placeholder="Digite uma explicação adicional (opcional)"
        />
      </div>

      <button type="submit" className="btn-adicionar">
        <FaPlus /> Adicionar Flashcard
      </button>
    </form>
  );
};

export default FormularioFlashcard; 