import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Conteudo from './components/Conteudos';
import CriarResumo from './components/CriarResumo';
import Resumos from './components/Resumos';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';
import AdicionarFlashcard from './components/Flashcards/AdicionarFlashcard';
import AdicionarResumo from './components/AdicionarResumo';
import Geografia from './components/Materia/Geografia'
import Historia from './components/Materia/Historia';
import Filosofia from './components/Materia/Filosofia';
import Sociologia from './components/Materia/Sociologia';
import ChatFlutuante from './components/ChatFlutuante';



function App() {
  const [paginaAtual, setPaginaAtual] = useState('Main');
  const [conteudoSelecionado, setConteudoSelecionado] = useState(null);
  const [resumos, setResumos] = useState([]);
  const [resumoParaEditar, setResumoParaEditar] = useState(null);
  const [materiaAtual, setMateriaAtual] = useState(null); // Novo estado para controlar a matéria atual
  const [disciplinaFlashcard, setDisciplinaFlashcard] = useState(null);


  const navegarParaConteudo = (conteudo) => {
    setConteudoSelecionado(conteudo);
    setPaginaAtual('conteudo');
  };

  const navegarParaMateria = (materia) => {
    setMateriaAtual(materia.nome); // Isso define qual matéria será renderizada
    setPaginaAtual('materia'); // Isso muda para a view de matéria
  };

  const voltarParaMain = () => {
    setPaginaAtual('Main');
    setMateriaAtual(null);

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

  const irParaAdicionarFlashcard = (disciplina) => {
    setDisciplinaFlashcard(disciplina);
    setPaginaAtual('adicionarFlashcard');
  };

  const irParaAdicionarResumo = () => {
    setResumoParaEditar(null);
    setPaginaAtual('AdicionarResumo');
  };

  const voltarParaFlashcards = () => {
    setPaginaAtual('flashcards');
  };

  const voltarParaResumos = () => {
    setPaginaAtual('resumos');
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
        periodo: resumo.periodo || (conteudoSelecionado ? conteudoSelecionado.nome : "Pré-história"),
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
        voltarParaMain={voltarParaMain}
        irParaResumos={irParaResumos}
        irParaFlashcards={irParaFlashcards}
        navegarParaMateria={navegarParaMateria}
      />
     <ChatFlutuante /> 
      {paginaAtual === 'Main' && (
        <Main 
        navegarParaConteudo={navegarParaConteudo}
        navegarParaMateria={navegarParaMateria} 
        />
      )}
       {paginaAtual === 'materia' && materiaAtual === 'Geografia' && (
        <Geografia 
          navegarParaConteudo={navegarParaConteudo}
          voltarParaMain={voltarParaMain}
        />
      )}
      {paginaAtual === 'materia' && materiaAtual === 'História' && (
        <Historia 
        navegarParaConteudo={navegarParaConteudo}
        voltarParaMain={voltarParaMain}
        />
      )}
      {paginaAtual === 'materia' && materiaAtual === 'Filosofia' && (
        <Filosofia
        navegarParaConteudo={navegarParaConteudo}
        voltarParaMain={voltarParaMain}
        />
      )}
      {paginaAtual === 'materia' && materiaAtual === 'Sociologia' && (
        <Sociologia
        navegarParaConteudo={navegarParaConteudo}
        voltarParaMain={voltarParaMain}
        />
      )}
      
      
      
      {paginaAtual === 'conteudo' && (
        <Conteudo 
          conteudo={conteudoSelecionado} 
          voltarParaMain={voltarParaMain}  
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
          voltarParaMain={voltarParaMain}
          editarResumo={editarResumo}
          excluirResumo={excluirResumo}
          irParaAdicionarResumo={irParaAdicionarResumo}
        />
      )}

      {paginaAtual === 'quiz' && (
      <Quiz 
  conteudo={conteudoSelecionado} 
  voltarParaConteudo={voltarParaConteudo}
  voltarParaMain={voltarParaMain}
/>
      )}

      {paginaAtual === 'flashcards' && (
        <Flashcards 
          voltarParaMain={voltarParaMain}
          irParaAdicionarFlashcard={irParaAdicionarFlashcard}
        />
      )}

      {paginaAtual === 'adicionarFlashcard' && (
      <AdicionarFlashcard 
  voltarParaFlashcards={voltarParaFlashcards}
  disciplinaSelecionada="História"
/>
      )}

      {paginaAtual === 'adicionarResumo' && (
        <AdicionarResumo 
          voltarParaResumos={voltarParaResumos}
          periodosPrincipais={periodosPrincipais}
          salvarResumo={salvarResumo}
        />
      )}
    </div> 
); 

}

export default App;