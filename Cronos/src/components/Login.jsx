import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import '../styles/login.css'

const Login = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos');
      return;
    }
    // Aqui você implementaria a lógica de autenticação
    onLogin(); // Chama a função onLogin após o login bem-sucedido
  };

  const handleGoogleLogin = () => {
    // Implementar lógica de login com Google
    onLogin(); // Chama a função onLogin após o login com Google
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="fechar-login" onClick={onClose}>×</button>
        
        <h2>Entrar</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
            />
          </div>

          <div className="campo-form">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
            />
          </div>

          {erro && <p className="erro-mensagem">{erro}</p>}

          <button type="submit" className="btn-entrar">
            Entrar
          </button>
        </form>

        <div className="divisor">
          <span>ou</span>
        </div>

        <button className="btn-google" onClick={handleGoogleLogin}>
          <FcGoogle className="icone-google" />
          Continuar com Google
        </button>

        <p className="criar-conta">
          Não tem uma conta? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login; 