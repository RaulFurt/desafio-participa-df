import time
import random

def analisar_manifestacao_iza(texto, audio_path=None):
    """
    Simula a comunicação com a Inteligência Artificial IZA.
    No mundo real, isso seria uma chamada HTTP para a API da Ouvidoria.
    """
    print(f"[IZA AI] Iniciando análise...")
    
    # Simula tempo de processamento da IA
    time.sleep(1) 
    
    # Se tiver áudio, finge que transcreveu
    if audio_path:
        print(f"[IZA AI] Processando áudio: {audio_path}")
        print(f"[IZA AI] Transcrição automática gerada.")

    # Simula uma classificação automática baseada em palavras-chave
    categorias = ['Saúde', 'Educação', 'Segurança', 'Transporte', 'Zeladoria']
    classificacao = random.choice(categorias)
    
    print(f"[IZA AI] Classificação sugerida: {classificacao}")
    return classificacao