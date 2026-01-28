import { useState, useEffect } from 'react';
import { Settings, Type, Sun, Moon, Eye, X } from 'lucide-react';
import './Acessibilidade.css';

export default function Acessibilidade() {
  const [aberto, setAberto] = useState(false);
  const [fonte, setFonte] = useState(100); // % de tamanho
  const [contraste, setContraste] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fonte}%`;
  }, [fonte]);

  useEffect(() => {
    if (contraste) {
      document.body.classList.add('alto-contraste');
    } else {
      document.body.classList.remove('alto-contraste');
    }
  }, [contraste]);

  return (
    <>
      <button 
        className="btn-acessibilidade-float"
        onClick={() => setAberto(!aberto)}
        aria-label="Menu de Acessibilidade"
        title="Menu de Acessibilidade"
      >
        <Eye size={24} />
      </button>
      {aberto && (
        <div className="painel-acessibilidade anime-slide-left">
          <div className="painel-header">
            <h3>Acessibilidade</h3>
            <button onClick={() => setAberto(false)} className="btn-fechar"><X size={20}/></button>
          </div>

          <div className="painel-secao">
            <h4><Type size={18}/> Ajustes de Texto</h4>
            <div className="controles-row">
              <button onClick={() => setFonte(f => f - 10)} disabled={fonte <= 70}>A-</button>
              <span>{fonte}%</span>
              <button onClick={() => setFonte(f => f + 10)} disabled={fonte >= 150}>A+</button>
            </div>
            <button className="btn-full" onClick={() => setFonte(100)}>Restaurar Padrão</button>
          </div>

          <div className="painel-secao">
            <h4><Sun size={18}/> Ajustes de Cor</h4>
            <button 
              className={`btn-full ${contraste ? 'ativo' : ''}`} 
              onClick={() => setContraste(!contraste)}
            >
              {contraste ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
            </button>
          </div>

          <div className="painel-footer">
            <small>Tecnologia Impulsa</small>
          </div>
        </div>
      )}
    </>
  );
}