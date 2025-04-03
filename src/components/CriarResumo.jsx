import React, { useState, useEffect } from 'react';

const CriarResumo = ({conteudo, voltarParaConteudo, salvarResumo, resumoParaEditar, irParaQuiz}) => {
    const [titulo, setTitulo] = useState('');
    const [conteudoResumo, setConteudoResumo] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
      if (resumoParaEditar) {
        setTitulo(resumoParaEditar.titulo);
        setConteudoResumo(resumoParaEditar.conteudo);
      }
    }, [resumoParaEditar]);

    useEffect(() => {
      if (mensagemSucesso && !resumoParaEditar) {
        const timer = setTimeout(() => {
          irParaQuiz();
        }, 1500); // Redireciona após 1.5 segundos
        return () => clearTimeout(timer);
      }
    }, [mensagemSucesso, resumoParaEditar, irParaQuiz]);

    const handleSalvar = () => {
      if (!titulo.trim() || !conteudoResumo.trim()) {
        alert('Por favor, preencha todos os campos');
        return;
      }

      setSalvando(true);
      
      salvarResumo({
        titulo,
        conteudo: conteudoResumo,
      });

      // Mostra mensagem de sucesso
      setMensagemSucesso(resumoParaEditar ? 'Resumo atualizado com sucesso!' : 'Resumo salvo com sucesso! Redirecionando para questões...');
    };

    return (
    <div className="criar-resumo">
        <button onClick={voltarParaConteudo} className="botao-voltar">
         ← Voltar
        </button>    
      <h1>{resumoParaEditar ? 'Editar Resumo' : 'Criar Novo Resumo'}</h1>
      {mensagemSucesso && (
        <div className="mensagem-sucesso">
          {mensagemSucesso}
        </div>
      )}
      <div className="formulario-resumo">
        <input
          type="text"
          placeholder="Título do resumo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="input-titulo"
          disabled={salvando}
        />
        <textarea 
          placeholder="Digite seu resumo aqui..." 
          rows="10"
          value={conteudoResumo}
          onChange={(e) => setConteudoResumo(e.target.value)}
          disabled={salvando}
        ></textarea>
        <div className="acoes">
          <button onClick={voltarParaConteudo} disabled={salvando}>Voltar</button>
          <button 
            onClick={handleSalvar} 
            className="btn-salvar"
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : resumoParaEditar ? 'Salvar Alterações' : 'Salvar Resumo'}
          </button>
          <button 
            onClick={irParaQuiz} 
            className="btn-ir-questoes"
            disabled={salvando}
          >
            Ir para Questões
          </button>
        </div>
      </div>
    </div>
  );
};
export default CriarResumo;