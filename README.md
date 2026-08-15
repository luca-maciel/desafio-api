# 🔐 Desafio Técnico — Authentication API

Backend da aplicação de autenticação do desafio técnico, desenvolvido com **Node.js + Express + TypeScript**, utilizando **Prisma ORM + SQLite** para persistência de dados.

O projeto implementa, até o momento, cadastro de usuários, validação com Zod, hash de senhas com bcrypt, login, geração de JWT, middleware de autenticação, rotas protegidas e consulta do usuário autenticado.

> **Status atual:** backend funcional para cadastro, login, JWT, middleware e `/auth/me`. A recuperação de senha está em desenvolvimento.

---

## 📚 Sumário

- [1. Objetivo](#1--objetivo)
- [2. Funcionalidades](#2--funcionalidades)
- [3. Stack](#3--stack)
- [4. Pré-requisitos](#4--pré-requisitos)
- [5. Clonando o projeto](#5--clonando-o-projeto)
- [6. Instalação das dependências](#6--instalação-das-dependências)
- [7. Variáveis de ambiente](#7--variáveis-de-ambiente)
- [8. Configuração do Prisma 7](#8--configuração-do-prisma-7)
- [9. Banco de dados e migrations](#9--banco-de-dados-e-migrations)
- [10. Estrutura do projeto](#10--estrutura-do-projeto)
- [11. Arquitetura e responsabilidades](#11--arquitetura-e-responsabilidades)
- [12. Configuração do Express](#12--configuração-do-express)
- [13. Executando a API](#13--executando-a-api)
- [14. Acesso pela rede local](#14--acesso-pela-rede-local)
- [15. Endpoints](#15--endpoints)
- [16. Cadastro](#16--cadastro)
- [17. Login](#17--login)
- [18. JWT](#18--jwt)
- [19. Middleware de autenticação](#19--middleware-de-autenticação)
- [20. Rotas protegidas](#20--rotas-protegidas)
- [21. Usuário autenticado](#21--usuário-autenticado)
- [22. Testando com cURL](#22--testando-com-curl)
- [23. Testando com Prisma Studio](#23--testando-com-prisma-studio)
- [24. Tratamento de erros](#24--tratamento-de-erros)
- [25. Segurança](#25--segurança)
- [26. Problemas comuns](#26--problemas-comuns)
- [27. Fluxo completo atual](#27--fluxo-completo-atual)
- [28. Status](#28--status)
- [29. Próximos passos](#29--próximos-passos)
- [30. Licença](#30--licença)

---

# 1. 🎯 Objetivo

A API foi criada para atender ao backend de um aplicativo mobile de autenticação.

O objetivo do desafio é demonstrar capacidade de implementar um fluxo de autenticação completo, incluindo:

- criação de usuários;
- validação de dados;
- armazenamento seguro de senhas;
- login;
- emissão de token JWT;
- autenticação de requisições protegidas;
- identificação do usuário autenticado;
- integração com um banco relacional.

A aplicação foi desenvolvida para funcionar sem Docker e sem a necessidade de instalar um servidor de banco separado, utilizando **SQLite**.

---

# 2. ✅ Funcionalidades

## Implementadas

- [x] Cadastro de usuário
- [x] Validação de cadastro com Zod
- [x] Verificação de e-mail duplicado
- [x] Hash de senha com bcrypt
- [x] Login
- [x] Comparação de senha com `bcrypt.compare()`
- [x] Geração de JWT
- [x] Middleware de autenticação
- [x] Rotas protegidas
- [x] Endpoint `/auth/me`
- [x] CORS
- [x] Persistência com SQLite
- [x] Prisma ORM
- [x] Testes manuais com cURL

## Em desenvolvimento

- [ ] Recuperação de senha
- [ ] Geração de token/código de recuperação
- [ ] Reset de senha
- [ ] Logout
- [ ] Testes automatizados
- [ ] Refatoração final

---

# 3. 🧰 Stack

| Tecnologia | Utilização |
|---|---|
| Node.js | Runtime do backend |
| TypeScript | Tipagem e desenvolvimento |
| Express | Servidor HTTP e roteamento |
| Prisma 7 | ORM |
| SQLite | Banco de dados |
| better-sqlite3 | Adapter do SQLite para Prisma 7 |
| bcrypt | Hash e comparação de senhas |
| jsonwebtoken | Geração e validação de JWT |
| Zod | Validação dos dados de entrada |
| CORS | Permitir comunicação do frontend |
| dotenv | Variáveis de ambiente |
| tsx | Execução do TypeScript em desenvolvimento |
| nodemon | Reinicialização automática |

---

# 4. 📋 Pré-requisitos

É necessário ter instalado:

- **Node.js**
- **npm**
- **Git**

Verifique:

```bash
node --version
npm --version
git --version
```

O projeto foi desenvolvido com Node.js recente e TypeScript 5.x.

---

# 5. 📥 Clonando o projeto

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do backend:

```bash
cd desafio-api
```

---

# 6. 📦 Instalação das dependências

Instale todas as dependências:

```bash
npm install
```

O `npm install` instala, entre outras, as bibliotecas principais utilizadas pela API:

```text
express
prisma
@prisma/client
@prisma/adapter-better-sqlite3
better-sqlite3
bcrypt
jsonwebtoken
zod
cors
dotenv
nodemon
tsx
typescript
```

---

# 7. 🔐 Variáveis de ambiente

O projeto utiliza um arquivo `.env` na raiz da API.

Estrutura:

```text
desafio-api/
├── .env
├── .env.example
├── prisma.config.ts
├── package.json
└── ...
```

Crie o `.env` a partir do exemplo.

## Linux/macOS/Git Bash

```bash
cp .env.example .env
```

## Windows PowerShell

```powershell
Copy-Item .env.example .env
```

O arquivo `.env.example` deve ser versionado. O `.env` real não deve ser enviado ao Git.

## Conteúdo do `.env`

```env
JWT_SECRET=your_super_secret_jwt_key
DATABASE_URL="file:./dev.db"
```

### `JWT_SECRET`

Chave secreta utilizada para assinar e validar os tokens JWT.

Exemplo:

```env
JWT_SECRET=my-super-secret-key-change-me
```

Em um ambiente real, utilize uma chave longa, aleatória e privada.

### `DATABASE_URL`

Define a localização do SQLite:

```env
DATABASE_URL="file:./dev.db"
```

---

# 8. ⚙️ Configuração do Prisma 7

O projeto utiliza o Prisma 7 e o novo fluxo de configuração através do arquivo:

```text
prisma.config.ts
```

A URL do banco é carregada pela configuração do Prisma.

O schema fica em:

```text
prisma/schema.prisma
```

O client é gerado em:

```text
generated/prisma
```

Por isso, imports do client gerado seguem o caminho local, por exemplo:

```ts
import { PrismaClient } from "../../generated/prisma/client";
```

> Não use `@prisma/client` para importar o `PrismaClient` gerado neste projeto, pois o projeto utiliza o generator `prisma-client` com `output` customizado.

---

# 9. 🗄️ Banco de dados e migrations

Depois de criar o `.env`, gere o client:

```bash
npx prisma generate
```

Crie/aplique as migrations:

```bash
npx prisma migrate dev --name init
```

Quando o schema mudar, crie uma nova migration:

```bash
npx prisma migrate dev --name nome_da_alteracao
```

Depois, se necessário:

```bash
npx prisma generate
```

## Ver o banco no Prisma Studio

```bash
npx prisma studio
```

O Prisma Studio permite visualizar e editar os registros do SQLite pela interface web.

## Resetar o banco durante o desenvolvimento

```bash
npx prisma migrate reset
```

> **Atenção:** o comando apaga os dados atuais do banco e reaplica as migrations.

---

# 10. 📁 Estrutura do projeto

```text
desafio-api/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── generated/
│   └── prisma/
│
├── src/
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   │
│   ├── repositories/
│   │   └── user.repository.ts
│   │
│   ├── routes/
│   │   └── auth.routes.ts
│   │
│   ├── schemas/
│   │   └── auth.schema.ts
│   │
│   ├── services/
│   │   └── user.service.ts
│   │
│   ├── utils/
│   │   └── jwt.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

---

# 11. 🧱 Arquitetura e responsabilidades

O backend utiliza uma separação simples em camadas.

```text
HTTP Request
     ↓
   Route
     ↓
  Service
     ↓
Repository
     ↓
  Prisma
     ↓
  SQLite
```

## `routes/`

Define os endpoints HTTP.

Exemplo:

```text
src/routes/auth.routes.ts
```

Responsável por receber `req`, executar a camada adequada e retornar `res`.

## `schemas/`

Define as regras de validação com Zod.

Exemplo:

```text
src/schemas/auth.schema.ts
```

## `services/`

Concentra regras de negócio.

Exemplo: cadastro, hash da senha e verificação de usuário existente.

## `repositories/`

Centraliza o acesso ao Prisma/banco.

Exemplo:

```ts
getUserByEmail(email)
getUserById(id)
newUser(name, email, password)
```

## `middlewares/`

Processamento intermediário das requisições.

O middleware atual valida o JWT e disponibiliza o ID do usuário em:

```ts
req.userId
```

## `utils/`

Funções auxiliares, como geração do JWT.

---

# 12. 🌐 Configuração do Express

A API utiliza CORS e JSON:

```ts
app.use(cors());
app.use(express.json());
```

O CORS foi necessário porque o cliente mobile/web precisa realizar requisições à API.

O servidor é iniciado aceitando conexões externas da rede local:

```ts
app.listen(PORT, "0.0.0.0", ...)
```

Isso permite que dispositivos ou emuladores alcancem a API pelo IP da máquina.

---

# 13. ▶️ Executando a API

## Desenvolvimento

```bash
npm run dev
```

Script configurado atualmente:

```json
"dev": "nodemon --exec tsx ./src/server.ts"
```

## Execução normal

```bash
npm start
```

Script:

```json
"start": "tsx ./src/server.ts"
```

A API utiliza a porta `8080`.

---

# 14. 🌐 Acesso pela rede local

Quando a API precisa ser acessada por outro processo/dispositivo, use o IP local da máquina.

Exemplo:

```text
http://10.0.0.9:8080
```

Descubra o IP no Linux:

```bash
ip addr
```

Verifique a porta:

```bash
ss -ltnp | grep 8080
```

Resultado esperado:

```text
LISTEN ... *:8080 ...
```

Também é possível testar diretamente:

```bash
curl http://10.0.0.9:8080
```

---

# 15. 📡 Endpoints

| Método | Endpoint | Auth | Objetivo |
|---|---|---|---|
| POST | `/auth/register` | Não | Criar conta |
| POST | `/auth/login` | Não | Autenticar usuário |
| GET | `/auth/privateTest` | Sim | Testar middleware |
| GET | `/auth/me` | Sim | Obter usuário autenticado |
| POST | `/auth/forgot-password` | Futuro | Recuperação |
| POST | `/auth/reset-password` | Futuro | Alterar senha |

> Os endpoints de recuperação ainda não estão implementados no backend atual.

---

# 16. 👤 Cadastro

## `POST /auth/register`

Cria um novo usuário.

### Exemplo

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "Admin123."
}
```

### Fluxo

```text
Request
  ↓
RegisterSchema
  ↓
E-mail já existe?
  ├── Sim → 409
  └── Não
       ↓
 bcrypt.hash()
       ↓
 newUser()
       ↓
 Prisma
       ↓
 SQLite
```

### Validação

`name`:

- mínimo: 3 caracteres;
- máximo: 100 caracteres.

`email`:

- formato válido.

`password`:

- mínimo: 8;
- máximo: 50;
- uma maiúscula;
- uma minúscula;
- um número;
- um caractere especial.

### Sucesso

HTTP `201 Created`.

### Possíveis erros

- `400` — dados inválidos;
- `409` — e-mail já cadastrado;
- `500` — erro interno.

---

# 17. 🔑 Login

## `POST /auth/login`

Autentica o usuário.

### Exemplo

```json
{
  "email": "admin@gmail.com",
  "password": "Admin123."
}
```

### Fluxo

```text
Request
  ↓
getUserByEmail()
  ↓
Usuário existe?
  ↓
bcrypt.compare()
  ↓
Senha correta?
  ↓
generateToken()
  ↓
JWT
```

### Sucesso

HTTP `200 OK`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Credenciais inválidas

HTTP `401 Unauthorized`:

```json
{
  "error": "Invalid email or password"
}
```

A mesma mensagem é utilizada para e-mail ou senha incorretos, evitando revelar qual credencial falhou.

---

# 18. 🔐 JWT

O JWT é criado através de `jsonwebtoken`.

Payload atual:

```json
{
  "userId": "USER_ID"
}
```

Exemplo conceitual:

```ts
jwt.sign(
  { userId },
  JWT_SECRET,
  { expiresIn: "1h" }
);
```

O `JWT_SECRET` vem do `.env`.

Nunca coloque senha ou hash da senha no payload do JWT.

---

# 19. 🛡️ Middleware de autenticação

Arquivo:

```text
src/middlewares/auth.middleware.ts
```

O middleware espera:

```http
Authorization: Bearer <TOKEN>
```

Depois:

1. verifica a existência do header;
2. separa `Bearer` e token;
3. executa `jwt.verify()`;
4. obtém `decoded.userId`;
5. salva em `req.userId`;
6. chama `next()`.

Se o token for inválido ou expirado, retorna `401`.

> Importante: o `next()` é chamado sem argumento quando a requisição é válida. Passar o objeto decodificado para `next(decoded)` faria o Express tratar esse objeto como erro.

---

# 20. 🔒 Rotas protegidas

## `GET /auth/privateTest`

Essa rota existe para validar o middleware.

Exemplo:

```bash
curl -i http://localhost:8080/auth/privateTest \
  -H "Authorization: Bearer SEU_TOKEN"
```

Sucesso:

```json
{
  "message": "rota privada acessada"
}
```

---

# 21. 👤 Usuário autenticado

## `GET /auth/me`

A rota identifica o usuário através do `userId` do JWT.

Fluxo:

```text
JWT
 ↓
jwt.verify()
 ↓
req.userId
 ↓
getUserById()
 ↓
Prisma
 ↓
User
```

Exemplo:

```bash
curl -i http://localhost:8080/auth/me \
  -H "Authorization: Bearer SEU_TOKEN"
```

Resposta:

```json
{
  "id": "cmsmjnfj40000pbxat759ucn6",
  "name": "Admin",
  "email": "admin@gmail.com",
  "createdAt": "2026-08-10T01:19:37.312Z"
}
```

A senha não é retornada.

---

# 22. 🧪 Testando com cURL

## Teste 1 — Cadastro

```bash
curl -i -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Admin",
    "email":"admin@gmail.com",
    "password":"Admin123."
  }'
```

## Teste 2 — Cadastro inválido

```bash
curl -i -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"A",
    "email":"admin",
    "password":"123"
  }'
```

## Teste 3 — Login

```bash
curl -i -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@gmail.com",
    "password":"Admin123."
  }'
```

Copie o `token` retornado.

## Teste 4 — Rota privada

```bash
curl -i http://localhost:8080/auth/privateTest \
  -H "Authorization: Bearer SEU_TOKEN"
```

## Teste 5 — Usuário autenticado

```bash
curl -i http://localhost:8080/auth/me \
  -H "Authorization: Bearer SEU_TOKEN"
```

## Teste 6 — Sem token

```bash
curl -i http://localhost:8080/auth/me
```

Esperado:

```text
401 Unauthorized
```

## Teste 7 — Token inválido

```bash
curl -i http://localhost:8080/auth/me \
  -H "Authorization: Bearer abc123"
```

Esperado:

```text
401 Unauthorized
```

---

# 23. 🧪 Testando com Prisma Studio

Execute:

```bash
npx prisma studio
```

A interface permite visualizar a tabela `User` e confirmar:

- ID gerado;
- nome;
- e-mail;
- hash da senha;
- data de criação.

A senha armazenada deve ser um hash bcrypt, não a senha original.

---

# 24. ⚠️ Tratamento de erros

Principais status utilizados:

| Status | Significado |
|---|---|
| `200` | Operação realizada |
| `201` | Recurso criado |
| `400` | Dados inválidos |
| `401` | Não autenticado / credencial inválida |
| `404` | Recurso não encontrado |
| `409` | Conflito, por exemplo e-mail duplicado |
| `500` | Erro interno |

---

# 25. 🔒 Segurança

## Senhas

Senhas são processadas com:

```ts
bcrypt.hash(password, 10)
```

No login:

```ts
bcrypt.compare(password, hash)
```

## JWT

- segredo fora do código;
- expiração configurada;
- somente `userId` no payload atual;
- não armazenar senha no token.

## Respostas

A API não deve devolver o hash da senha ao cliente.

## CORS

O backend utiliza CORS para permitir a comunicação com o aplicativo cliente.

---

# 26. 🛠️ Problemas comuns

## `EADDRINUSE: address already in use :8080`

Outra aplicação está usando a porta.

Descubra:

```bash
sudo lsof -i :8080
```

Ou:

```bash
sudo fuser -k 8080/tcp
```

Depois:

```bash
npm run dev
```

## Prisma não encontra `DATABASE_URL`

Confirme que `.env` está na raiz:

```text
desafio-api/.env
```

E contém:

```env
DATABASE_URL="file:./dev.db"
```

## `PrismaClient` não existe em `@prisma/client`

O projeto utiliza Prisma 7 com client gerado em `generated/prisma`.

Use o import apontando para o client gerado:

```ts
import { PrismaClient } from "../../generated/prisma/client";
```

## `exports is not defined in ES module scope`

O projeto utiliza `tsx` para executar o TypeScript.

Utilize:

```bash
npm run dev
```

em vez de executar o servidor com uma configuração CommonJS incompatível com o client gerado.

## `Cannot read properties of undefined (reading 'replace')`

Geralmente indica que a URL não chegou ao adapter SQLite.

Confirme:

```env
DATABASE_URL="file:./dev.db"
```

E que o `.env` é carregado antes de criar o adapter.

## CORS bloqueando o frontend

Confirme que o backend possui:

```ts
app.use(cors());
```

antes das rotas.

## Porta aberta localmente mas o mobile não conecta

Confirme:

```bash
ss -ltnp | grep 8080
```

E utilize o IP da máquina, não `localhost`, quando o cliente estiver em outro dispositivo.

---

# 27. 🔄 Fluxo completo atual

## Cadastro

```text
React Native
    ↓
POST /auth/register
    ↓
Zod
    ↓
getUserByEmail()
    ↓
bcrypt.hash()
    ↓
Repository
    ↓
Prisma
    ↓
SQLite
```

## Login

```text
React Native
    ↓
POST /auth/login
    ↓
getUserByEmail()
    ↓
bcrypt.compare()
    ↓
generateToken()
    ↓
JWT
    ↓
Mobile
```

## Requisição autenticada

```text
Mobile
    ↓
Authorization: Bearer JWT
    ↓
authMiddleware
    ↓
jwt.verify()
    ↓
req.userId
    ↓
getUserById()
    ↓
Prisma
    ↓
Resposta protegida
```

---

# 28. 📊 Status

### Backend

- [x] Node.js
- [x] Express
- [x] TypeScript
- [x] Prisma 7
- [x] SQLite
- [x] Prisma Client custom output
- [x] `.env`
- [x] CORS
- [x] Cadastro
- [x] Zod
- [x] bcrypt
- [x] Login
- [x] JWT
- [x] Middleware
- [x] Rota protegida
- [x] `/auth/me`
- [x] Testes manuais com cURL
- [ ] Recuperação de senha
- [ ] Reset de senha
- [ ] Logout
- [ ] Testes automatizados

---

# 29. 🚧 Próximos passos

1. Implementar a estrutura de recuperação de senha no Prisma.
2. Criar `/auth/forgot-password`.
3. Gerar token/código de recuperação.
4. Criar `/auth/reset-password`.
5. Atualizar a senha com bcrypt.
6. Invalidar o token de recuperação.
7. Integrar o fluxo com React Native.
8. Implementar logout.
9. Finalizar proteção das rotas no frontend.
10. Centralizar a URL da API em variável de ambiente.
11. Realizar testes completos.
12. Fazer revisão final e entrega.

---

# 30. 📄 Licença

Projeto desenvolvido para fins de desafio técnico e demonstração de conhecimentos em desenvolvimento de APIs, autenticação e integração com aplicações mobile.
