import { useState } from 'react'
import Header from './components/Header'
import TrilhaMundo from './components/TrilhaMundo'
import Conteudo from './components/conteudos';
import CriarResumo from './components/CriarResumo';
import Resumos from './components/Resumos';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('trilha');
  const [conteudoSelecionado, setConteudoSelecionado] = useState(null);
  const [resumos, setResumos] = useState([]);
  const [resumoParaEditar, setResumoParaEditar] = useState(null);

  const navegarParaConteudo = (conteudo) => {
    setConteudoSelecionado(conteudo);
    setPaginaAtual('conteudo');
  };

  const voltarParaTrilha = () => {
    setPaginaAtual('trilha');
  };
  
  const irParaCriarResumo = () => {
    setResumoParaEditar(null);
    setPaginaAtual('criarResumo');
  };

  const voltarParaConteudo = () => {
    setPaginaAtual('conteudo');
  };

  const irParaResumos = () => {
    setPaginaAtual('resumos');
  };

  const irParaQuiz = () => {
    setPaginaAtual('quiz');
  };

  const irParaFlashcards = () => {
    setPaginaAtual('flashcards');
  };

  const salvarResumo = (resumo) => {
    if (resumoParaEditar) {
      // Se estiver editando, atualiza o resumo existente
      setResumos(resumos.map(r => 
        r.id === resumoParaEditar.id 
          ? { ...resumo, id: r.id, periodo: r.periodo } 
          : r
      ));
      setResumoParaEditar(null);
    } else {
      // Se for novo, adiciona ao array
      setResumos([...resumos, {
        ...resumo,
        periodo: conteudoSelecionado.nome,
        id: Date.now()
      }]);
    }
  }

  const editarResumo = (resumo) => {
    setResumoParaEditar(resumo);
    setPaginaAtual('criarResumo');
  };

  const excluirResumo = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este resumo?')) {
      setResumos(resumos.filter(resumo => resumo.id !== id));
    }
  };

  return (
    <div className="app">
      <Header 
        voltarParaTrilha={voltarParaTrilha}
        irParaResumos={irParaResumos}
        irParaFlashcards={irParaFlashcards}
      />
      
      {paginaAtual === 'trilha' && (
        <TrilhaMundo navegarParaConteudo={navegarParaConteudo} />
      )}
      
      {paginaAtual === 'conteudo' && (
        <Conteudo 
          conteudo={conteudoSelecionado} 
          voltarParaTrilha={voltarParaTrilha}  
          irParaCriarResumo={irParaCriarResumo} 
        />
      )}
      
      {paginaAtual === 'criarResumo' && (
        <CriarResumo 
          conteudo={conteudoSelecionado}
          voltarParaConteudo={voltarParaConteudo}
          salvarResumo={salvarResumo}
          resumoParaEditar={resumoParaEditar}
          irParaQuiz={irParaQuiz}
        />
      )}

      {paginaAtual === 'resumos' && (
        <Resumos 
          resumos={resumos}
          voltarParaTrilha={voltarParaTrilha}
          editarResumo={editarResumo}
          excluirResumo={excluirResumo}
        />
      )}

      {paginaAtual === 'quiz' && (
        <Quiz 
          voltarParaConteudo={voltarParaConteudo}
          voltarParaTrilha={voltarParaTrilha}
        />
      )}

      {paginaAtual === 'flashcards' && (
        <Flashcards voltarParaTrilha={voltarParaTrilha} />
      )}
    </div>
  );
}

export default App;