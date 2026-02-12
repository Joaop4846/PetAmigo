# PetAmigo 

Sistema de gestão de clientes e pets para petshop. Substitui planilhas e anotações com um CRUD completo, interface moderna e API REST.

## Tecnologias

**Backend:** Node.js, Express, SQLite (better-sqlite3), UUID

**Frontend:** React 19, Vite, React Router DOM, Axios, CSS puro

## Como instalar e rodar

Pré-requisitos: [Node.js](https://nodejs.org/) instalado (v18+).

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/PetAmigo.git
cd PetAmigo

# 2. Instale e rode o backend
cd server
npm install
npm run dev
# API disponível em http://localhost:3000

# 3. Em outro terminal, instale e rode o frontend
cd client
npm install
npm run dev
# App disponível em http://localhost:5173
```

O banco é SQLite e é criado automaticamente em `server/data/petamigo.db` na primeira execução.

## Páginas

**Home** — Página inicial com apresentação do sistema e links rápidos para as seções.

**Dashboard** — Visão geral com contagem de clientes e pets cadastrados + lista dos 5 cadastros mais recentes.

**Clientes** — Listagem de todos os clientes com busca por nome e ordenação A-Z / Z-A. Permite cadastrar, editar, ver detalhes (com os pets do cliente) e excluir.

**Pets** — Listagem de todos os pets com busca e ordenação. Cada pet tem foto (com upload por drag-and-drop), espécie, raça, idade e tutor vinculado. Permite cadastrar, editar e excluir.

## API

**Clientes**

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/clientes` | Lista todos (aceita `search`, `sortBy`, `sortOrder`) |
| GET | `/api/clientes/:id` | Busca por ID |
| GET | `/api/clientes/:id/pets` | Lista os pets do cliente |
| POST | `/api/clientes` | Cadastra novo cliente |
| PUT | `/api/clientes/:id` | Atualiza cliente |
| DELETE | `/api/clientes/:id` | Exclui cliente (aceita `forcarExclusao=true`) |

**Pets**

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pets` | Lista todos (aceita `search`, `sortBy`, `sortOrder`) |
| GET | `/api/pets/:id` | Busca por ID |
| POST | `/api/pets` | Cadastra novo pet |
| PUT | `/api/pets/:id` | Atualiza pet |
| DELETE | `/api/pets/:id` | Exclui pet |

## Estrutura

```
server/src/
  config/database.js
  models/ controllers/ services/ routes/ middlewares/
  app.js  server.js

client/src/
  components/ (layout, ui, clientes, pets)
  pages/ services/ hooks/ styles/
  App.jsx  main.jsx
```
