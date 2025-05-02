import React, { useState } from 'react';
import { FaArrowLeft as FaVoltar, FaSave } from 'react-icons/fa';
import TituloContainer from './TituloContainer';

const AdicionarResumo = ({ voltarParaResumos, periodosPrincipais, salvarResumo }) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [periodoSelecionado, setPeriodoSelecionado] = useState(periodosPrincipais[0].nome);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = () => {
    if (!titulo.trim() || !conteudo.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setSalvando(true);
    
    // Cria um novo resumo
    const novoResumo = {
      titulo,
      conteudo,
      periodo: periodoSelecionado,
      id: Date.now()
    };

    // Salva o resumo usando a função passada como prop
    salvarResumo(novoResumo);
    
    // Mostra mensagem de sucesso
    setMensagemSucesso('Resumo salvo com sucesso!');
    
    // Limpa os campos após salvar
    setTitulo('');
    setConteudo('');
    
    // Desativa o estado de salvando
    setSalvando(false);
  };

  return (
    <div className="adicionar-resumo">
      <TituloContainer 
        titulo="Adicionar Novo Resumo" 
        onVoltar={voltarParaResumos}
        botaoVoltarIcone={<FaVoltar />}
      />
      
      {mensagemSucesso && (
        <div className="mensagem-sucesso">
          {mensagemSucesso}
        </div>
      )}
      
      <div className="formulario-resumo">
        <div className="campo-form">
          <label htmlFor="periodo">Período:</label>
          <select 
            id="periodo"
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
            disabled={salvando}
          >
            {periodosPrincipais.map(periodo => (
              <option key={periodo.id} value={periodo.nome}>
                {periodo.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div className="campo-form">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            placeholder="Título do resumo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="input-titulo"
            disabled={salvando}
          />
        </div>
        
        <div className="campo-form">
          <label htmlFor="conteudo">Conteúdo:</label>
          <textarea 
            id="conteudo"
            placeholder="Digite seu resumo aqui..." 
            rows="10"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            disabled={salvando}
          ></textarea>
        </div>
        
        <div className="acoes">
          <button 
            onClick={handleSalvar} 
            className="btn-salvar"
            disabled={salvando}
          >
            <FaSave /> {salvando ? 'Salvando...' : 'Salvar Resumo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdicionarResumo; 