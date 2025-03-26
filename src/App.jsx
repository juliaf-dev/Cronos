import { useState } from 'react'
import Header from './components/Header'
import TrilhaMundo from './components/TrilhaMundo'


const App = () => {
  const [paginaAtual, setPaginaAtual] = useState('trilha')

  const renderizarPagina = () => {
    switch(paginaAtual) {
      case 'trilha': return <TrilhaMundo setPagina={setPaginaAtual} />
      case 'resumos': return <ResumosInterativos />
      case 'flashcards': return <Flashcards 
                                 setPontuacao={setPontuacao} 
                                 pontuacao={pontuacao}
                                 setNivel={setNivel}
                               />
      case 'perfil': return <PerfilUsuario pontuacao={pontuacao} nivel={nivel} />
      default: return <TrilhaMundo setPagina={setPaginaAtual} />
    }
  }

  return (
    <div className="app">
      <Header setPagina={setPaginaAtual} />
      {renderizarPagina()}
    </div>
  )
}

export default App