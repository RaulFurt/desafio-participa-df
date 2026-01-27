# Desafio Participa DF - Categoria Ouvidoria

Solução PWA desenvolvida para o 1º Hackathon em Controle Social da CGDF.
O projeto moderniza a Ouvidoria do DF com foco em acessibilidade (WCAG), multicanalidade (áudio/vídeo) e integração com IA.

## 🎥 Vídeo de Demonstração
> [COLOQUE AQUI O LINK DO SEU VÍDEO NO YOUTUBE/VIMEO]
*(Obrigatório conforme Item 8.2.2 do Edital)*

## 🚀 Funcionalidades Principais
1. **Multicanalidade Completa:** Envio de manifestações por Texto, Áudio (Web Audio API) e Vídeo (Captura nativa Mobile).
2. **Acessibilidade (WCAG 2.1 AA):**
   - Alto Contraste e Zoom de Fonte.
   - Navegação 100% via teclado.
   - Integração com V-Libras.
3. **PWA (Progressive Web App):** Instalável no celular e funcionamento offline.
4. **Integração com IA (Mock):** Arquitetura pronta para conexão com a assistente IZA para transcrição e classificação automática.

## 🛠 Tecnologias Utilizadas
- **Frontend:** React, Vite PWA, Lucide React (Ícones), CSS Modules (Design System Gov.br).
- **Backend:** Python, Django REST Framework.
- **Banco de Dados:** SQLite (Protótipo) / PostgreSQL (Produção).
- **IA:** Simulação de serviço de classificação (Python).

## 📦 Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18+)
- Python (v3.10+)

### 1. Rodar o Backend (API)
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
# A API ficará disponível em [http://127.0.0.1:8000](http://127.0.0.1:8000)

2. Rodar o Frontend (Aplicação)
cd frontend
npm install
npm run dev
# O App abrirá em http://localhost:5173

🧪 Testes Automatizados
Para verificar a integridade da API e a simulação da IA:
cd backend
python manage.py test

Desenvolvido por: [SEU NOME OU NOME DA EQUIPE]

## 🤖 Declaração de Uso de Inteligência Artificial
Conforme o **Item 13.9 do Edital**, declaramos que:
1. **No Desenvolvimento:** Utilizamos Grandes Modelos de Linguagem (LLMs) para auxílio na estruturação do código, otimização de funções CSS e geração de testes unitários.
2. **Na Solução:** A arquitetura prevê integração com o sistema **IZA**, simulada no backend (`services.py`) para classificação automática de manifestações baseada em processamento de linguagem natural.