import React, { useState } from "react";

const TrilhaMundo = ({ setPagina }) => {
  // Dados completos com períodos e subperíodos
  const periodosData = [
    {
      id: 1,
      nome: "Pré-história",
      subperiodos: [
        { id: 101, nome: "Paleolítico" },
        { id: 102, nome: "Neolítico" },
        { id: 103, nome: "Idade dos Metais" }
      ]
    },
    {
      id: 2,
      nome: "Civilizações antigas",
      subperiodos: [
        { id: 201, nome: "Mesopotâmia" },
        { id: 202, nome: "Egito Antigo" },
        { id: 203, nome: "Grécia Antiga" },
        { id: 204, nome: "Roma Antiga" }
      ]
    },
  ];

  // Estado para controlar qual período está expandido
  const [periodoExpandido, setPeriodoExpandido] = useState(null);
  const [subperiodoSelecionado, setSubperiodoSelecionado] = useState(null);

  const handlePeriodoClick = (periodoId) => {
    if (periodoExpandido === periodoId) {
      setPeriodoExpandido(null);
    } else {
      setPeriodoExpandido(periodoId);
    }
    setSubperiodoSelecionado(null);
  };

  return (
    <div className="trilha-container">
      <h1>Trilha do Mundo</h1>
      
      {subperiodoSelecionado ? (
        <div className="conteudo-periodo">
          <button 
            className="botao-voltar"
            onClick={() => setSubperiodoSelecionado(null)}
          >
            Voltar
          </button>
          <h2>{subperiodoSelecionado.nome}</h2>
          {/* Aqui viria o conteúdo específico do subperíodo */}
        </div>
      ) : (
        <div className="trilha-grid">
          {periodosData.map((periodo) => (
            <div key={periodo.id} className="periodo-container">
              <button
                className={`trilha-item ${periodoExpandido === periodo.id ? 'expandido' : ''}`}
                onClick={() => handlePeriodoClick(periodo.id)}
              >
                {periodo.nome}
                <span className="seta">{periodoExpandido === periodo.id ? '▼' : '▶'}</span>
              </button>

              {periodoExpandido === periodo.id && (
                <div className="subperiodos-container">
                  {periodo.subperiodos.map((subperiodo) => (
                    <button
                      key={subperiodo.id}
                      className="subperiodo-item"
                      onClick={() => handleSubperiodoClick(subperiodo)}
                    >
                      {subperiodo.nome}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrilhaMundo;
