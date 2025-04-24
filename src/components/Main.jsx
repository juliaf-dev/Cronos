import { useState } from 'react';

const Main = ({ navegarParaMateria }) => {
  const materiasData = [
    { id: 1, nome: "História" },
    { id: 2, nome: "Geografia" },
    { id: 3, nome: "Literatura" },
    { id: 4, nome: "Filosofia" },
    { id: 5, nome: "Sociologia" }
  ];

  return (
    <div className="materias-container">
      <h1>Estude por Matéria</h1>
      
      <div className="materias-grid">
        {materiasData.map(materia => (
          <div
            key={materia.id}
            className="materia-card"
            onClick={() => navegarParaMateria(materia)} // Todos usam navegarParaMateria
          >
            <h2>{materia.nome}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;