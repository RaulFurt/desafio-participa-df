import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardOuvidor() {
  const [manifestacoes, setManifestacoes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/manifestacoes/')
      .then(res => setManifestacoes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Painel do Ouvidor (Visão do Governo)</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {manifestacoes.map(m => (
          <div key={m.protocolo} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{m.tipo.toUpperCase()}</strong>
              <small>{new Date(m.data_criacao).toLocaleString()}</small>
            </div>
            <p>{m.descricao}</p>
            
            {m.audio && (
              <audio controls src={m.audio} style={{ width: '100%', marginTop: '10px' }} />
            )}
            
            <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
              Protocolo: {m.protocolo} | Autor: {m.anonimo ? 'Anônimo' : m.nome}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}