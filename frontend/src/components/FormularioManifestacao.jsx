import { useState } from 'react';
import axios from 'axios';
import Gravador from './Gravador';
import './Formulario.css';
import { 
  ChevronRight, ChevronLeft, CheckCircle, Shield, ShieldAlert, 
  Video, Image as ImageIcon, UserCircle, Landmark, MousePointer2
} from 'lucide-react';

export default function FormularioManifestacao() {
  const [etapa, setEtapa] = useState(1);
  const [status, setStatus] = useState('ocioso');
  const [protocolo, setProtocolo] = useState(null);

  const [dados, setDados] = useState({
    tipo: 'denuncia',
    descricao: '',
    nome: '',
    email: '',
    telefone: '', 
    anonimo: null,
    lgpd: false 
  });
  
  const [arquivos, setArquivos] = useState({ audio: null, imagem: null, video: null });

  const textosIza = {
    1: { 
      titulo: "Olá! Sou a IZA, sua assistente virtual.", 
      desc: "Para começarmos, escolha o assunto principal e descreva o ocorrido com o máximo de detalhes possível." 
    },
    2: { 
      titulo: "Vamos conferir os dados?", 
      desc: "Revise o resumo abaixo. Informações precisas garantem que sua manifestação seja analisada mais rápido." 
    },
    3: { 
      titulo: "Como você prefere se identificar?", 
      desc: "O modo Identificado permite acompanhar a resposta (com sigilo garantido). O modo Anônimo não permite acompanhamento." 
    },
    4: { 
      titulo: "Você tem provas do ocorrido?", 
      desc: "Uma imagem ajuda muito! Se tiver fotos, vídeos ou documentos, anexe-os agora para fortalecer seu relato." 
    },
    5: { 
      titulo: "Manifestação registrada com sucesso!", 
      desc: "A Ouvidoria já recebeu seu relato. Anote o protocolo abaixo para consultar o andamento depois." 
    }
  };

  const mascaraTelefone = (valor) => {
    return valor.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
  };

  const enviar = async () => {
    setStatus('enviando');
    const formData = new FormData();
    formData.append('tipo', dados.tipo);
    formData.append('descricao', dados.descricao);
    formData.append('anonimo', dados.anonimo);
    if (!dados.anonimo) {
      formData.append('nome', dados.nome);
      formData.append('email', dados.email);
      formData.append('telefone', dados.telefone);
    }
    if (arquivos.audio) formData.append('audio', arquivos.audio, 'relato.wav');
    if (arquivos.imagem) formData.append('imagem', arquivos.imagem);
    if (arquivos.video) formData.append('video', arquivos.video);

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/manifestacoes/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProtocolo(res.data.protocolo);
      setStatus('sucesso');
      setEtapa(5);
    } catch (e) {
      console.error(e); setStatus('erro'); alert("Erro de conexão.");
    }
  };

  return (
    <>
      <div className="blue-banner-top">
        <nav className="navbar-gov">
          <a href="/" className="brand-link" title="Voltar para o início">
            <Landmark size={26} />
            Participa DF
          </a>

          <div className="logo-center-container">
            <img 
              src="/logo-gdf-branca.png" 
              alt="Controladoria-Geral do DF" 
              className="logo-cgdf"
              onError={(e) => {
                e.target.style.display = 'none'; 
                e.target.nextSibling.style.display = 'flex'; 
              }}
            />
            <div style={{display:'none', alignItems:'center', gap:5, color:'white', opacity:0.8}}>
               <Landmark size={28} />
               <span style={{fontSize:'0.8rem', fontWeight:'bold', textTransform:'uppercase'}}>Controladoria</span>
            </div>
          </div>

          <button className="btn-login-fake" onClick={() => alert("Login integrado ao Gov.br (Simulação)")}>
            Entrar
            <UserCircle size={20} />
          </button>
        </nav>
      </div>

      <div className="main-container-center">
        <div className="form-box-card">
          
          <div className="form-header-blue">
            <div className="iza-avatar-circle">
              {etapa === 5 ? '✅' : '🤖'}
            </div>
            <div className="header-text-area">
              <h2>{textosIza[etapa]?.titulo}</h2>
              <p>{textosIza[etapa]?.desc}</p>
            </div>
          </div>

          <div className="form-body-content">
            
            {etapa < 5 && (
              <div className="steps-indicator">
                {[1,2,3,4].map(step => (
                  <div key={step} className={`step-bar ${etapa >= step ? 'active' : ''}`}></div>
                ))}
              </div>
            )}

            {etapa === 1 && (
              <div className="anime-fade etapa-grid-1">
                <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                  <div className="form-group" style={{flex:1, display:'flex', flexDirection:'column'}}>
                    <label className="label-ouv">Descreva o ocorrido <span className="required-mark">*</span></label>
                    <textarea 
                      className="input-ouv" 
                      style={{flex:1}} 
                      value={dados.descricao} 
                      onChange={(e) => setDados({...dados, descricao: e.target.value})} 
                      placeholder="O que aconteceu? Onde? Quando?"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <div className="form-group">
                    <label className="label-ouv">Tipo <span className="required-mark">*</span></label>
                    <select className="input-ouv" value={dados.tipo} onChange={(e) => setDados({...dados, tipo: e.target.value})}>
                      <option value="denuncia">Denúncia</option>
                      <option value="elogio">Elogio</option>
                      <option value="sugestao">Sugestão</option>
                      <option value="reclamacao">Reclamação</option>
                    </select>
                  </div>
                  
                  <div className="form-group" style={{background:'#f9f9f9', padding: 15, borderRadius: 8, marginTop: 20}}>
                    <label className="label-ouv" style={{marginBottom:10}}>Prefere falar? (Áudio)</label>
                    <Gravador aoSalvarAudio={(blob) => setArquivos(p => ({...p, audio: blob}))} />
                  </div>
                </div>
              </div>
            )}
            {etapa === 2 && (
              <div className="anime-fade">
                <div style={{borderLeft: '5px solid #1351B4', paddingLeft: 20, background:'#f8f9fa', padding: 20, borderRadius:4}}>
                   <h3 style={{color:'#333', marginTop:0}}>Resumo</h3>
                   <p><strong>Tipo:</strong> {dados.tipo.toUpperCase()}</p>
                   <p><strong>Descrição:</strong> {dados.descricao}</p>
                   <p><strong>Áudio:</strong> {arquivos.audio ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            )}
            {etapa === 3 && (
              <div className="anime-fade etapa-grid-3">
                 <div style={{display:'flex', flexDirection:'column', gap: 15}}>
                   <div className={`ouv-card-btn ${dados.anonimo === true ? 'selected' : ''}`} onClick={() => setDados({...dados, anonimo: true})}>
                     <ShieldAlert size={28} color="#1351B4"/>
                     <h4>Anônimo</h4>
                     <small>Sem dados pessoais.</small>
                   </div>
                   <div className={`ouv-card-btn ${dados.anonimo === false ? 'selected' : ''}`} onClick={() => setDados({...dados, anonimo: false})}>
                     <Shield size={28} color="#28a745"/>
                     <h4>Identificado</h4>
                     <small>Com protocolo.</small>
                   </div>
                 </div>

                 <div style={{background: '#fafafa', padding: 20, borderRadius: 8, border: '1px solid #eee'}}>
                   {dados.anonimo === false ? (
                     <div className="anime-fade">
                       <div className="form-group">
                          <label className="label-ouv">Nome <span className="required-mark">*</span></label>
                          <input className="input-ouv" type="text" value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})} />
                       </div>
                       <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10}}>
                          <div className="form-group">
                              <label className="label-ouv">E-mail <span className="required-mark">*</span></label>
                              <input className="input-ouv" type="email" value={dados.email} onChange={e => setDados({...dados, email: e.target.value})} />
                          </div>
                          <div className="form-group">
                              <label className="label-ouv">Celular</label>
                              <input className="input-ouv" type="tel" value={dados.telefone} onChange={e => setDados({...dados, telefone: mascaraTelefone(e.target.value)})} placeholder="(00) 00000-0000"/>
                          </div>
                       </div>
                       <div style={{marginTop: 10, display:'flex', gap: 8}}>
                          <input type="checkbox" id="lgpd" checked={dados.lgpd} onChange={e => setDados({...dados, lgpd: e.target.checked})}/>
                          <label htmlFor="lgpd" style={{fontSize:'0.85rem'}}>Aceito a política de dados (LGPD).</label>
                       </div>
                     </div>
                   ) : (
                     <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'#888', textAlign:'center'}}>
                       <p>Opção Anônima Selecionada.<br/>Nenhum dado será coletado.</p>
                     </div>
                   )}
                 </div>
              </div>
            )}

            {etapa === 4 && (
              <div className="anime-fade selection-grid">
                <label className="ouv-card-btn">
                    <ImageIcon size={40} color="#1351B4"/>
                    <h3>Foto</h3>
                    <input type="file" accept="image/*,.pdf" hidden onChange={(e) => setArquivos({...arquivos, imagem: e.target.files[0]})} />
                    {arquivos.imagem && <div style={{color:'green'}}>✓ {arquivos.imagem.name}</div>}
                </label>
                <label className="ouv-card-btn">
                    <Video size={40} color="#dc3545"/>
                    <h3>Vídeo</h3>
                    <input type="file" accept="video/*" capture="environment" hidden onChange={(e) => setArquivos({...arquivos, video: e.target.files[0]})} />
                    {arquivos.video && <div style={{color:'green'}}>✓ Gravado</div>}
                </label>
              </div>
            )}

            {etapa === 5 && (
              <div className="anime-fade" style={{textAlign: 'center', padding: '30px 0'}}>
                <h1 style={{color: '#1351B4'}}>Sucesso!</h1>
                <p>Protocolo gerado.</p>
                <div style={{background: '#eef6ff', padding: '20px', borderRadius: 12, margin: '20px auto', maxWidth: '300px', border:'2px dashed #1351B4'}}>
                  <span style={{fontSize: '1.8rem', fontWeight:'800', color:'#1351B4', fontFamily:'monospace'}}>{protocolo}</span>
                </div>
                <button onClick={() => window.location.reload()} className="btn-ouv btn-next" style={{margin:'0 auto'}}>Novo Registro</button>
              </div>
            )}
          </div>

          {etapa < 5 && (
            <div className="form-footer-actions">
              {etapa > 1 ? <button className="btn-ouv btn-back" onClick={() => setEtapa(etapa - 1)}><ChevronLeft size={18}/> Voltar</button> : <div></div>}
              {etapa < 4 ? 
                <button className="btn-ouv btn-next" onClick={() => setEtapa(etapa + 1)} disabled={etapa === 1 && dados.descricao.length < 3}>Continuar <ChevronRight size={18}/></button> 
                : 
                <button className="btn-ouv btn-success" onClick={enviar} disabled={status === 'enviando' || (dados.anonimo === false && !dados.lgpd)}>{status === 'enviando' ? 'Enviando...' : 'Finalizar'} <CheckCircle size={18}/></button>
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
}