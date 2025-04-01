import { useState } from 'react'
import Header from './components/Header'
import TrilhaMundo from './components/TrilhaMundo'
import Conteudo from './components/conteudos';


function App() {
  const [paginaAtual, setPaginaAtual] = useState('trilha');
  const [conteudoSelecionado, setConteudoSelecionado] = useState(null);

  const navegarParaConteudo = (conteudo) => {
    setConteudoSelecionado(conteudo);
    setPaginaAtual('conteudo');
  };

  const voltarParaTrilha = () => {
    setPaginaAtual('trilha');
  };

  return (
    <div className="app">
      <Header />
      {paginaAtual === 'trilha' ? (
        <TrilhaMundo navegarParaConteudo={navegarParaConteudo} />
      ) : (
        <Conteudo 
          conteudo={conteudoSelecionado} 
          voltarParaTrilha={voltarParaTrilha} 
        />
      )}
    </div>
  );
}

export default App;