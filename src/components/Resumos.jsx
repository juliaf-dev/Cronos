import React from 'react';

const Resumos = ({ resumos, voltarParaTrilha, editarResumo, excluirResumo }) => {
  return (
    <div className="resumos-container">
      <button onClick={voltarParaTrilha} className="botao-voltar">
        ← Voltar
      </button>
      <h1>Meus Resumos</h1>
      
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
          <p className="sem-resumos">Você ainda não tem resumos salvos.</p>
        )}
      </div>
    </div>
  );
};

export default Resumos; 