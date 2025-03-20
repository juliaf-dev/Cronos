import Header from './components/Header'

const PgInicial = () => {
    return (
      <div className="PgInicial">
       <Header/>
       <div className="trilha-container">
        <h1>Trilha do mundo</h1>
        <div className="trilha">
            <button className="trilha-item">Pré-história</button>
            <button className="trilha-item">Civilizações antigas</button>
            <button className="trilha-item">Idade Média e feudalismo</button>
            <button className="trilha-item">História Moderna</button>
        </div>
        </div>
      </div>

    );
  };
  
  export default PgInicial;