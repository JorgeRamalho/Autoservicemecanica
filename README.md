# Auto Service Mecânica

Site front-end estruturado para oficina mecânica automotiva com cadastro de matrícula, login, painel de dados e catálogo de serviços.

**Slogan:** Confiança na estrada, precisão na oficina.

## Estrutura de Pastas

```
Projeto-AutoServiceMecanica/
├── html5/           → index.html (ponto de entrada HTML5)
├── css3/            → Design system (tokens, tipografia, estilos, formulários)
├── js/              → config.js (URLs de acesso e configurações externas)
├── public/          → logo.svg, favicon.svg (assets estáticos)
├── src/             → React + TypeScript (componentes, páginas, serviços)
├── package.json
└── vite.config.ts
```

## Tecnologias

- **HTML5** — Estrutura semântica
- **CSS3** — Tokens de design, gradientes, tipografia e paleta automotiva
- **JavaScript / TypeScript** — Lógica de negócio e tipagem
- **React 19** — Interface reativa
- **Vite** — Servidor de desenvolvimento e build

## Paleta de Cores

| Token | Cor | Uso |
|-------|-----|-----|
| Primary | `#0A1628` | Fundo principal (azul profundo) |
| Accent | `#FF6B00` | Destaques, botões, CTAs (laranja) |
| Neutral | `#8B929E` | Textos secundários (prata) |
| Success | `#22C55E` | Confirmações |
| Error | `#EF4444` | Erros de validação |

## Tipografia

- **Display (títulos):** Rajdhani — 500, 600, 700
- **Corpo (textos):** Inter — 400, 500, 600, 700, 800
- **Tamanhos:** xs (12px) → 6xl (60px)

## Como Executar

### Pré-requisitos

- Node.js 18+ instalado

### Instalação

```bash
npm install
cd backend && npm install && cd ..
```

### Desenvolvimento completo (Frontend + API JWT)

```bash
npm run dev:all
```

| Serviço | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **API (JWT)** | http://localhost:3001/api/health |
| **Rede local** | `npm run dev:host` → ex: http://192.168.x.x:5173 |

### Apenas frontend

```bash
npm run dev
```

### Apenas backend

```bash
npm run dev:backend
```

### Build de produção

```bash
npm run build:all
npm run preview
```

## Integração ViaCEP

No formulário de cadastro (`/cadastro`), ao digitar um CEP válido (8 dígitos) ou sair do campo, o endereço é preenchido automaticamente via [ViaCEP](https://viacep.com.br).

## Backend API (JWT)

Endpoints principais:

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/health` | Status da API |
| POST | `/api/auth/register` | Cadastro com senha hash (bcrypt) |
| POST | `/api/auth/login` | Login → retorna JWT |
| GET | `/api/auth/me` | Perfil do usuário autenticado |
| GET | `/api/users` | Lista usuários (JWT) |
| GET | `/api/users/dashboard/stats` | Estatísticas do painel |

Configure o backend em `backend/.env` (copie de `backend/.env.example`).

## Deploy

### Frontend — Vercel

1. Conecte o repositório na [Vercel](https://vercel.com)
2. Build: `npm run build` · Output: `dist`
3. Em `vercel.json`, substitua `SEU-BACKEND.onrender.com` pela URL real da API
4. Variável: `VITE_API_URL=/api` (proxy via rewrite)

### Backend — Render

1. Crie um **Web Service** no [Render](https://render.com)
2. Use o arquivo `render.yaml` ou configure manualmente:
   - Build: `cd backend && npm install && npm run build`
   - Start: `cd backend && npm start`
3. Defina `JWT_SECRET` e `CORS_ORIGIN` (URL do frontend na Vercel)

### Fallback offline

Se a API não estiver disponível, o frontend usa `localStorage` automaticamente (modo local).

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com hero e serviços em destaque |
| `/cadastro` | Formulário completo de matrícula |
| `/login` | Autenticação (e-mail, CPF ou matrícula) |
| `/servicos` | Catálogo completo de serviços |
| `/dashboard` | Painel com estatísticas e dados dos usuários |

## Formulário de Cadastro

Campos incluídos:

- **Pessoais:** Nome, CPF, RG, data de nascimento, gênero, tipo de usuário
- **Contato:** E-mail, telefone, telefone secundário, senha
- **Endereço:** CEP, logradouro, número, complemento, bairro, cidade, UF
- **Veículo:** Placa, marca, modelo, ano, cor, quilometragem
- **Extras:** Observações, aceite de termos, newsletter

## Usuário Demo

Para testar o login:

- **E-mail:** demo@autoservice.com
- **Senha:** Demo@123

## Armazenamento de Dados

- **Com API online:** dados persistidos em `backend/data/users.json` com senhas bcrypt + JWT
- **Sem API:** fallback automático para `localStorage` no navegador

## Branding

- **Logo:** SVG com carro + chave inglesa (laranja sobre azul)
- **Avatar:** Emoji 🚗 na hero section
- **Ícones de serviço:** Emojis temáticos (🔧, 🛢️, ⚡, etc.)

## Próximos Passos

1. Banco de dados PostgreSQL ou MongoDB
2. Integração WhatsApp para OS e orçamentos
3. Deploy final (Vercel + Render)
4. CI/CD com GitHub Actions
