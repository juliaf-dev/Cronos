import React, { useState, useRef, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane } from 'react-icons/fa';
import '../styles/chat.css';
import { gerarRespostaIA } from '../services/geminiService';

const ChatFlutuante = () => {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [posicao, setPosicao] = useState({ 
    x: window.innerWidth - 100, 
    y: window.innerHeight - 100 
  });
  const [arrastando, setArrastando] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const chatRef = useRef(null);
  const mensagensRef = useRef(null);

  // Efeito para rolar para baixo quando novas mensagens são adicionadas
  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
    }
  }, [mensagens]);

  // Funções de arrastar
  const comecarArrastar = (e) => {
    // Não permitir arrastar pelo campo de mensagem
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    
    const rect = chatRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setArrastando(true);
  };

  const arrastar = (e) => {
    if (!arrastando) return;
    
    let x = e.clientX - offset.x;
    let y = e.clientY - offset.y;
    
    // Limitar aos limites da tela
    const width = aberto ? 320 : 60;
    const height = aberto ? 400 : 60;
    
    x = Math.max(0, Math.min(x, window.innerWidth - width));
    y = Math.max(0, Math.min(y, window.innerHeight - height));
    
    setPosicao({ x, y });
  };

  const pararArrastar = () => {
    setArrastando(false);
  };

  // Adiciona/remove listeners de mouse
  useEffect(() => {
    if (arrastando) {
      document.addEventListener('mousemove', arrastar);
      document.addEventListener('mouseup', pararArrastar);
    } else {
      document.removeEventListener('mousemove', arrastar);
      document.removeEventListener('mouseup', pararArrastar);
    }

    return () => {
      document.removeEventListener('mousemove', arrastar);
      document.removeEventListener('mouseup', pararArrastar);
    };
  }, [arrastando]);

  // Funções do chat
  const alternarChat = () => {
    setAberto(!aberto);
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagem = { texto: mensagem, remetente: 'usuario' };
    setMensagens([...mensagens, novaMensagem]);
    setMensagem('');

    try {
      const resposta = await gerarRespostaIA(mensagem);
      setMensagens(prev => [...prev, { texto: resposta, remetente: 'ia' }]);
    } catch (error) {
      setMensagens(prev => [...prev, { 
        texto: 'Desculpe, ocorreu um erro ao processar sua pergunta.', 
        remetente: 'ia' 
      }]);
    }
  };

  return (
    <div 
      ref={chatRef}
      className={`chat-flutuante ${aberto ? 'aberto' : ''} ${arrastando ? 'arrastando' : ''}`}
      style={{
        left: `${posicao.x}px`,
        top: `${posicao.y}px`,
        cursor: arrastando ? 'grabbing' : (aberto ? 'move' : 'grab')
      }}
      onMouseDown={comecarArrastar}
    >
      <div className="chat-cabecalho">
        <h3>Assistente de Estudos</h3>
        <button onClick={alternarChat} className="botao-fechar">
          {aberto ? <FaTimes /> : <FaComment />}
        </button>
      </div>

      {aberto && (
        <div className="chat-conteudo">
          <div ref={mensagensRef} className="chat-mensagens">
            {mensagens.length === 0 ? (
              <div className="mensagem-boas-vindas">
                <p>Olá! Como posso ajudar você nos estudos hoje?</p>
              </div>
            ) : (
              mensagens.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mensagem ${msg.remetente}`}
                >
                  <p>{msg.texto}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={enviarMensagem} className="chat-form">
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite sua pergunta..."
              required
              onMouseDown={(e) => e.stopPropagation()}
            />
            <button 
              type="submit"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatFlutuante;