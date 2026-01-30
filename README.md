# 🏛️ Participa DF - Ouvidoria Inteligente
> Solução desenvolvida para o 1° Hackathon em Controle Social - Desafio Participa DF.

O **Participa DF - Módulo de Ouvidoria** é uma plataforma moderna, acessível e multicanal que simplifica a comunicação entre o cidadão e a Controladoria-Geral do Distrito Federal (CGDF). Focada em usabilidade e inclusão, a solução integra conceitos de Inteligência Artificial para triagem automática de manifestações.

---

Link do vídeo no youtube: https://www.youtube.com/watch?v=Are_iHde5V8

## 🎯 Objetivo da Solução
Facilitar o registro de denúncias, elogios, sugestões e reclamações, oferecendo uma interface intuitiva ("One Page"), suporte a mídias ricas (áudio/vídeo) e garantia de acessibilidade, preparada para integração nativa com o ecossistema de IA do GDF (IZA).

---

## 🚀 Principais Funcionalidades

### 1. Multicanalidade e Multimídia
- **Relatos por Voz:** O cidadão pode gravar o relato diretamente no navegador, sem digitar.
- **Evidências Ricas:** Upload de imagens e gravação de vídeos em tempo real como provas.
- **Geolocalização e Metadados:** Estrutura pronta para captura de contexto.

### 2. Acessibilidade e Usabilidade (WCAG)
- **Modo Alto Contraste:** Sistema robusto com temas "Escuro Total" e "Claro" para deficiência visual.
- **Interface Simplificada:** Design de tela única (One Page) sem rolagens excessivas.
- **Navegação Assistida:** A assistente virtual "IZA" guia o usuário passo a passo.

### 3. Privacidade e LGPD
- **Fluxo Anônimo:** Garante o sigilo total, removendo dados pessoais do payload.
- **Fluxo Identificado:** Validação de contatos e termo de aceite LGPD obrigatório.

---

## 🔌 Arquitetura de Integração com a IZA

Conforme disposto no edital, esta solução foi arquitetada para operar em interoperabilidade com o sistema de Inteligência Artificial **IZA**. Abaixo detalhamos o contrato de dados e o fluxo de processamento.

### Fluxo de Dados Proposto
1.  **Coleta:** O Frontend captura o relato (Texto + Áudio/Vídeo) e metadados.
2.  **Ingestão:** O Backend (Django) recebe, valida e armazena os arquivos no Storage seguro.
3.  **Disparo (Mock/Simulação):** O sistema aciona o serviço `analisar_manifestacao_iza` enviando o JSON estruturado.
4.  **Classificação:** A IZA processa o conteúdo (Transcribe + NLP) e retorna a taxonomia sugerida.
5.  **Persistência:** O resultado é salvo no banco de dados para auxiliar os ouvidores.

### Payload de Integração (Contrato de API)
O sistema envia os dados estruturados no seguinte formato JSON para a API da IZA:

```json
HTTP 200 OK
Allow: GET, POST, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

    {
        "id": 16,
        "protocolo": "b80b57fe-2b27-4440-a9ea-9505c1fd673c",
        "descricao": "wwewerwerwerwerwerwer",
        "tipo": "elogio",
        "anonimo": false,
        "nome": "raul",
        "email": "raulfurtadocosta@hotmail.com",
        "telefone": "(12) 3123-1231",
        "audio": "http://127.0.0.1:8000/media/audios/relato_Hrtb6Se.wav",
        "imagem": "http://127.0.0.1:8000/media/imagens/images.png",
        "video": null,
        "data_criacao": "2026-01-28T15:58:41.711944Z",
        "classificacao_ia": "Transporte"
    },


🛠️ Tecnologias Utilizadas
Frontend (Client-Side)

React.js (Vite): Performance e componentização.

Axios: Comunicação HTTP com o backend.

Lucide React: Ícones vetoriais leves e acessíveis.

CSS3 Moderno: Layout responsivo, Grid/Flexbox e Variáveis CSS para temas.

Backend (Server-Side)

Python & Django: Framework robusto e seguro (padrão governamental).

Django REST Framework (DRF): Criação de APIs escaláveis.

SQLite (Dev) / PostgreSQL (Prod): Banco de dados relacional.


📦 Como Executar o Projeto
Pré-requisitos

Node.js (v18+)

Python (v3.10+)

1. Configurando o Backend (API)

# Clone o repositório e entre na pasta do backend
cd backend

# Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)

# Instale as dependências
pip install django djangorestframework django-cors-headers

# Execute as migrações do banco de dados
python manage.py makemigrations
python manage.py migrate

# Inicie o servidor
python manage.py runserver
# O backend rodará em: http://127.0.0.1:8000](http://127.0.0.1:8000)

2. Configurando o Frontend (Interface)

# Em outro terminal, entre na pasta do frontend
cd frontend

# Instale as dependências
npm install
# Instale dependências específicas se necessário
npm install axios lucide-react

# Inicie a aplicação
npm run dev
# O frontend rodará em: http://localhost:5173

## 🤖 Declaração de Uso de Inteligência Artificial
Conforme o Item 13.9 do Edital, declaramos que:
1. No Desenvolvimento:** Utilizamos Grandes Modelos de Linguagem (LLMs) para auxílio na estruturação do código, otimização de funções CSS e geração de testes unitários - Modelo GEMINI 2.5 PRO.
IZA, simulada no backend (`services.py`) para classificação automática de manifestações baseada em processamento de linguagem natural.


Participantes: 

RAUL FURTADO COSTA

HERUS MACEDO PINTO FURTADO COSTA