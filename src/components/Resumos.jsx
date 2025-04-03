import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Resumos = ({ resumos, voltarParaTrilha, editarResumo, excluirResumo, irParaAdicionarResumo }) => {
  return (
    <div className="resumos-container">
      <div className="titulo-container">
        <button onClick={voltarParaTrilha} className="botao-voltar">
          ← Voltar
        </button>
        <h1>Meus Resumos</h1>
      </div>
      
      <div className="lista-resumos">
        {resumos && resumos.length > 0 ? (
          resumos.map((resumo) => (
            <div key={resumo.id} className="card-resumo">
              <h2>{resumo.titulo}</h2>
              <p className="periodo">{resumo.periodo}</p>
              <p className="conteudo-resumo">{resumo.conteudo}</p>
              <div className="card-acoes">
                <button 
                  className="btn-editar"
                  onClick={() => editarResumo(resumo)}
                >
                  Editar
                </button>
                <button 
                  className="btn-excluir"
                  onClick={() => excluirResumo(resumo.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sem-resumos">
            <p>Você ainda não tem resumos salvos.</p>
            <button onClick={irParaAdicionarResumo} className="btn-adicionar">
              <FaPlus /> Adicionar Resumo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumos; 