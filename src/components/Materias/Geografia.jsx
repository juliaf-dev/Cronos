
const Geografia = ({ voltarParaMain, navegarParaConteudo }) => {
  const temas = [
    { id: 1, nome: "Geografia Física", subtemas: ["Relevo", "Clima", "Vegetação"] },
    { id: 2, nome: "Geografia Humana", subtemas: ["Urbanização", "Demografia", "Globalização"] },
    { id: 3, nome: "Geografia do Brasil", subtemas: ["Regiões Brasileiras", "Biomas", "Problemas Ambientais"] }
  ];

  return (
    <div className="materia-container">
         <button onClick={voltarParaMain} className="botao-voltar">
          ← Voltar
        </button>
      <h1>Geografia</h1>
      <div className="temas-lista">
        {temas.map((tema, temaIndex) => (
          <div key={tema.id} className="tema-card">
            <h2>{tema.nome}</h2>
            <ul className="subtemas-lista">
              {tema.subtemas.map((subtema, subtemaIndex) => (
                <li key={subtemaIndex}>
                  {temaIndex === 0 && subtemaIndex === 0 ? (
                    // Apenas o primeiro subtema do primeiro tema é clicável
                    <span 
                      onClick={() => navegarParaConteudo({
                        id: tema.id,
                        nome: `${tema.nome} - ${subtema}`
                      })}
                      style={{ 
                        cursor: 'pointer',
                        color: '#0066cc',
                        textDecoration: 'underline'
                      }}
                    >
                      {subtema}
                    </span>
                  ) : (
                    // Todos os outros subtemas são texto normal
                    <span>{subtema}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Geografia;