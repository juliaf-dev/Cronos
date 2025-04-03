const ConteudoPaleolitico = ({ voltarParaTrilha, irParaCriarResumo }) => {
    return (
      <div className="pagina-historica">
        <button onClick={voltarParaTrilha} className="botao-voltar">
          ← Voltar
        </button>
  
        <h1>Pré-história - Paleolítico (-3,3 milhões – 10.000 a.C.)</h1>
  
        <div className="conteudo-texto">
          <p>1. Período Paleolítico, também conhecido como Idade da Pedra Lascada e a fase mais longa da Pré-História, iniciando-se há cerca de 2,5 milhões de anos e terminando por volta de 10.000 a.C., com o surgimento da agricultura e o início do Neolítico.</p>
          
          <p>2. Principais Características do Paleolítico:</p>
          
          <div className="lista-aninhada">
            <p>1. Modo de Vida: Os seres humanos eram nômades, movendo-se constantemente em busca de comida e abrigo.</p>
            <p>2. Economia: Baseava-se na caça, pesca e coleta de frutos, raízes e sementes.</p>
            <p>3. Ferramentas: Utilizavam instrumentos rudimentares feitos de pedra lascada, ossos e madeira.</p>
            <p>4. Fogo: O domínio do fogo foi uma das maiores conquistas desse período, trazendo calor, proteção e melhorias na alimentação.</p>
            <p>5. Arte Rupestre: Pinturas e gravuras feitas em cavernas, retratando animais, cenas de caça e elementos do cotidiano.</p>
            <p>6. Organização Social: Viviam em pequenos grupos familiares, organizados em tribos.</p>
            <p>7. Cultura e Religião: Primeiras manifestações de crenças espirituais e rituais funerários.</p>
          </div>
          
          <p>8. Importância do Paleolítico</p>
          <p>Esse período foi essencial para a sobrevivência e evolução do ser humano, marcando o início da cultura, da comunicação e do desenvolvimento das primeiras tecnologias. Foi também uma fase de adaptação às mudanças climáticas e ambientais.</p>
        </div>
        <button onClick={irParaCriarResumo} className="botao-proximo">
          Próximo →
        </button>
      </div>
    );
  };
  
  export default ConteudoPaleolitico;