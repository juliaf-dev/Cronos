import { useState } from 'react';

const TrilhaMundo = ({ navegarParaConteudo }) => {
  const [periodoExpandido, setPeriodoExpandido] = useState(null);

  const periodosData = [
    {
      id: 1,
      nome: "Pré-história",
      subperiodos: [
        { id: 101, nome: "Paleolítico"},
        { id: 102, nome: "Neolítico"},
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
        { id: 204, nome: "Roma Antiga"}
      ]
    },
    
  ];

  const togglePeriodo = (id) => {
    setPeriodoExpandido(prev => prev === id ? null : id);
  };

  return (
    <div className="trilha-container">
      <h1>Trilha do Mundo</h1>
      
      <div className="periodos-lista">
        {periodosData.map(periodo => (
          <div key={periodo.id} className="periodo-item">
            <div 
              className="periodo-cabecalho"
              onClick={() => togglePeriodo(periodo.id)}
            >
              <h2>{periodo.nome}</h2>
              <span className="seta">
                {periodoExpandido === periodo.id ? '▼' : '▶'}
              </span>
            </div>

            {periodoExpandido === periodo.id && (
              <div className="subperiodos-lista">
                {periodo.subperiodos.map(subperiodo => (
                  <div
                    key={subperiodo.id}
                    className="subperiodo-item"
                    onClick={() => navegarParaConteudo(subperiodo)}
                  >
                    {subperiodo.nome}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrilhaMundo;