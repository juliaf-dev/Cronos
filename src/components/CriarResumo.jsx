const CriarResumo = ({voltarParaTrilha}) => {
    return (
        <div className="pagina-historica">
            <button onClick={voltarParaTrilha} className="botao-voltar">
            ← Voltar
            </button>
            <h1>Pré-história - Paleolítico (-3,3 milhões – 10.000 a.C.)</h1>
        </div>
    );
};

export default CriarResumo;