import { useState, useRef } from 'react';
import './Gravador.css'; 

export default function Gravador({ aoSalvarAudio }) {
  const [gravando, setGravando] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const iniciarGravacao = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = []; 

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        aoSalvarAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setGravando(true);
    } catch (err) {
      alert("Erro ao acessar microfone. Verifique as permissões.");
      console.error(err);
    }
  };

  const pararGravacao = () => {
    mediaRecorderRef.current.stop();
    setGravando(false);
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
  };

  const descartarAudio = () => {
    setAudioURL(null);
    aoSalvarAudio(null);
  };

  return (
    <div className="gravador-container">
      <p className="gravador-titulo">Relato em Áudio (Opcional)</p>
      
      {!audioURL ? (
        <button 
          type="button" 
          onClick={gravando ? pararGravacao : iniciarGravacao}
          className={`btn-gravar ${gravando ? 'pulsando' : ''}`}
          aria-label={gravando ? "Parar gravação" : "Iniciar gravação de áudio"}
        >
          {gravando ? '⏹ Parar Gravação' : 'Gravar Relato'}
        </button>
      ) : (
        <div className="audio-preview">
          <audio controls src={audioURL} className="audio-player" />
          <button 
            type="button" 
            onClick={descartarAudio}
            className="btn-descartar"
            aria-label="Apagar áudio e gravar novamente"
          >
            Descartar
          </button>
        </div>
      )}
    </div>
  );
}