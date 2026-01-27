import { useState } from 'react';
import axios from 'axios';
import Gravador from './Gravador';
import './Formulario.css';
import { ChevronRight, ChevronLeft, CheckCircle, Shield, ShieldAlert, FileText, Video, Image as ImageIcon } from 'lucide-react';

export default function FormularioManifestacao() {
  const [etapa, setEtapa] = useState(1);
  const [status, setStatus] = useState('ocioso');
  const [protocolo, setProtocolo] = useState(null);

  const [dados, setDados] = useState({
    tipo: 'denuncia',
    descricao: '',
    nome: '',
    email: '',
    telefone: '', // Novo campo para máscara
    anonimo: null,
    lgpd: false // Novo Checkbox LGPD
  });
  
  const [arquivos, setArquivos] = useState({ audio: null, imagem: null, video: null });

  // Mascote IZA ajudando em cada etapa (Texto Dinâmico)
  const textosIza = {
    1: { titulo: "Olá! Sou a IZA", desc: "Vou te ajudar. Comece escolhendo o tipo de manifestação e descrevendo o que houve." },
    2: { titulo: "Vamos revisar?", desc: "Dê uma olhada no resumo abaixo para garantir que não esqueceu nenhum detalhe importante." },
    3: { titulo: "Quem é você?", desc: "Para acompanhar a resposta, preciso que você se identifique. Se preferir, pode ser anônimo." },
    4: { titulo: "Tem provas?", desc: "Se tiver fotos ou vídeos no seu celular, clique abaixo para anexar. Isso ajuda muito na análise!" },
    5: { titulo: "Tudo pronto!", desc: "Recebi sua manifestação. Anote o número do protocolo abaixo." }
  };

  // Função para formatar telefone (Máscara)
  const mascaraTelefone = (valor) => {
    return valor
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses no DDD
      .replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca o traço
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
      console.error(e);
      setStatus('erro');
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <>
      {/* Fundo Azul */}
      <div className="blue-banner-top"></div>

      {/* Container Principal */}
      <div className="main-container-center">
        
        {/* Card Branco */}
        <div className="form-box-card">
          
          {/* CABEÇALHO COM A IZA (Fator UAU!) */}
          <div className="form-header-blue">
            <div className="iza-avatar-circle">
              {etapa === 5 ? '✅' : '🤖'} {/* Muda para Check no final */}
            </div>
            <div className="header-text-area">
              <h2>{textosIza[etapa]?.titulo}</h2>
              <p>{textosIza[etapa]?.desc}</p>
            </div>
          </div>

          {/* CORPO DO FORMULÁRIO */}
          <div className="form-body-content">
            
            {/* Barra de Progresso */}
            {etapa < 5 && (
              <div className="steps-indicator">
                {[1,2,3,4].map(step => (
                  <div key={step} className={`step-bar ${etapa >= step ? 'active' : ''}`}></div>
                ))}
              </div>
            )}

            {/* ETAPA 1: RELATO */}
            {etapa === 1 && (
              <div className="anime-fade">
                <div className="form-group">
                  <label className="label-ouv">Tipo de Manifestação <span className="required-mark">*</span></label>
                  <select className="input-ouv" value={dados.tipo} onChange={(e) => setDados({...dados, tipo: e.target.value})}>
                    <option value="denuncia">Denúncia</option>
                    <option value="elogio">Elogio</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="reclamacao">Reclamação</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label-ouv">Descreva o ocorrido <span className="required-mark">*</span></label>
                  <textarea
                    className="input-ouv"
                    value={dados.descricao}
                    onChange={(e) => setDados({...dados, descricao: e.target.value})}
                    placeholder="Digite os detalhes, datas e locais..."
                  ></textarea>
                </div>
                
                <div className="form-group" style={{background:'#f9f9f9', padding: 15, borderRadius: 8}}>
                  <label className="label-ouv" style={{marginBottom: 10}}>Prefere falar? Grave um áudio:</label>
                  <Gravador aoSalvarAudio={(blob) => setArquivos(p => ({...p, audio: blob}))} />
                </div>
              </div>
            )}

            {/* ETAPA 2: RESUMO */}
            {etapa === 2 && (
              <div className="anime-fade">
                <div style={{borderLeft: '5px solid #1351B4', paddingLeft: 20}}>
                   <h3 style={{color:'#333', marginTop:0}}>Resumo dos Dados</h3>
                   <p><strong>Tipo:</strong> {dados.tipo.toUpperCase()}</p>
                   <p><strong>Descrição:</strong> {dados.descricao}</p>
                   <p><strong>Áudio:</strong> {arquivos.audio ? 'Anexado' : 'Não gravado'}</p>
                </div>
              </div>
            )}

            {/* ETAPA 3: IDENTIFICAÇÃO (Com Melhorias de LGPD) */}
            {etapa === 3 && (
              <div className="anime-fade">
                 <div className="selection-grid">
                   <div 
                      className={`ouv-card-btn ${dados.anonimo === true ? 'selected' : ''}`}
                      onClick={() => setDados({...dados, anonimo: true})}
                   >
                     <ShieldAlert size={30} color="#1351B4"/>
                     <h3>Anônimo</h3>
                     <p style={{fontSize:'0.85rem'}}>Sem dados pessoais. Não gera acompanhamento.</p>
                   </div>

                   <div 
                      className={`ouv-card-btn ${dados.anonimo === false ? 'selected' : ''}`}
                      onClick={() => setDados({...dados, anonimo: false})}
                   >
                     <Shield size={30} color="#28a745"/>
                     <h3>Identificado</h3>
                     <p style={{fontSize:'0.85rem'}}>Sigilo legal. Permite acompanhar resposta.</p>
                   </div>
                 </div>

                 {dados.anonimo === false && (
                   <div className="anime-fade" style={{marginTop: 30, paddingTop: 20, borderTop: '1px solid #eee'}}>
                     <div className="form-group">
                        <label className="label-ouv">Nome Completo <span className="required-mark">*</span></label>
                        <input className="input-ouv" type="text" value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})} />
                     </div>
                     
                     <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20}}>
                        <div className="form-group">
                            <label className="label-ouv">E-mail <span className="required-mark">*</span></label>
                            <input className="input-ouv" type="email" value={dados.email} onChange={e => setDados({...dados, email: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label className="label-ouv">Telefone / WhatsApp</label>
                            <input 
                              className="input-ouv" 
                              type="tel" 
                              maxLength="15"
                              value={dados.telefone} 
                              onChange={e => setDados({...dados, telefone: mascaraTelefone(e.target.value)})} 
                              placeholder="(61) 90000-0000"
                            />
                        </div>
                     </div>

                     {/* Checkbox LGPD (Muito Importante) */}
                     <div style={{marginTop: 15, display:'flex', alignItems:'flex-start', gap: 10}}>
                        <input 
                          type="checkbox" 
                          id="lgpd" 
                          style={{marginTop: 4, transform:'scale(1.2)'}}
                          checked={dados.lgpd}
                          onChange={e => setDados({...dados, lgpd: e.target.checked})}
                        />
                        <label htmlFor="lgpd" style={{fontSize:'0.9rem', color:'#555'}}>
                          Concordo com o tratamento dos meus dados pessoais para fins de ouvidoria, conforme a Lei Geral de Proteção de Dados (LGPD).
                        </label>
                     </div>
                   </div>
                 )}
              </div>
            )}

            {/* ETAPA 4: ANEXOS */}
            {etapa === 4 && (
              <div className="anime-fade selection-grid">
                <label className="ouv-card-btn" style={{cursor:'pointer'}}>
                    <ImageIcon size={40} color="#1351B4" style={{marginBottom:10}}/>
                    <h3>Foto / Arquivo</h3>
                    <input type="file" accept="image/*,.pdf" hidden onChange={(e) => setArquivos({...arquivos, imagem: e.target.files[0]})} />
                    {arquivos.imagem && <div style={{color:'green', fontWeight:'bold'}}>✓ {arquivos.imagem.name}</div>}
                </label>

                <label className="ouv-card-btn" style={{cursor:'pointer'}}>
                    <Video size={40} color="#dc3545" style={{marginBottom:10}}/>
                    <h3>Gravar Vídeo</h3>
                    <input type="file" accept="video/*" capture="environment" hidden onChange={(e) => setArquivos({...arquivos, video: e.target.files[0]})} />
                    {arquivos.video && <div style={{color:'green', fontWeight:'bold'}}>✓ Vídeo Gravado</div>}
                </label>
              </div>
            )}

            {/* ETAPA 5: SUCESSO */}
            {etapa === 5 && (
              <div className="anime-fade" style={{textAlign: 'center', padding: '30px 0'}}>
                <h1 style={{color: '#1351B4', fontSize:'2.2rem'}}>Sucesso!</h1>
                <p>Sua manifestação foi enviada para análise.</p>
                
                <div style={{background: '#eef6ff', padding: '25px', borderRadius: 12, margin: '30px auto', maxWidth: '350px', border:'2px dashed #1351B4'}}>
                  <span style={{display:'block', fontSize:'0.8rem', color:'#555', textTransform:'uppercase'}}>Protocolo</span>
                  <span style={{fontSize: '2rem', fontWeight:'800', color:'#1351B4', fontFamily:'monospace'}}>{protocolo}</span>
                </div>
                
                <button onClick={() => window.location.reload()} className="btn-ouv btn-next" style={{margin:'0 auto'}}>
                  Voltar ao Início
                </button>
              </div>
            )}

          </div>

          {/* RODAPÉ */}
          {etapa < 5 && (
            <div className="form-footer-actions">
              <div>
                {etapa > 1 && (
                  <button className="btn-ouv btn-back" onClick={() => setEtapa(etapa - 1)}>
                    <ChevronLeft size={18}/> Voltar
                  </button>
                )}
              </div>

              <div>
                {etapa < 4 ? (
                  <button 
                    className="btn-ouv btn-next" 
                    onClick={() => setEtapa(etapa + 1)}
                    disabled={etapa === 1 && dados.descricao.length < 5}
                  >
                    Continuar <ChevronRight size={18}/>
                  </button>
                ) : (
                  <button 
                    className="btn-ouv btn-success" 
                    onClick={enviar}
                    disabled={status === 'enviando' || (dados.anonimo === false && !dados.lgpd)} // Trava se não aceitar LGPD
                  >
                    {status === 'enviando' ? 'Enviando...' : 'Finalizar Manifestação'} <CheckCircle size={18}/>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}