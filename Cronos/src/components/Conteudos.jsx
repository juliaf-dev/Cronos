import { useState, useEffect } from 'react';
import '../styles/conteudos.css';
import { gerarConteudoMateria } from '../services/geminiService';

const Conteudo = ({ conteudo, voltarParaMain, irParaCriarResumo }) => {
  const [conteudoGerado, setConteudoGerado] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarConteudo = async () => {
      setCarregando(true);
      try {
        const [materia, topico] = conteudo.nome.split(' - ');
        const texto = await gerarConteudoMateria(materia, topico);
        setConteudoGerado(texto);
      } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        setConteudoGerado('Erro ao carregar o conteúdo. Por favor, tente novamente.');
      } finally {
        setCarregando(false);
      }
    };

    carregarConteudo();
  }, [conteudo]);

  return (
    <div className="pagina-historica">
      <button onClick={voltarParaMain} className="botao-voltar">
        ← Voltar
      </button>

      <h1>{conteudo.nome}</h1>

      <div className="conteudo-texto">
        {carregando ? (
          <p>Carregando conteúdo...</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: conteudoGerado }} />
        )}
      </div>

      <button onClick={irParaCriarResumo} className="botao-criar-resumo">
        Criar Resumo
      </button>
    </div>
  );
};

export default Conteudo;