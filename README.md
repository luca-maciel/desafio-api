# 🔐 Desafio de Autenticação --- API

API RESTful responsável pelo fluxo de autenticação do aplicativo mobile.

O projeto foi desenvolvido com **Node.js + Express + TypeScript + Prisma
ORM + SQLite**, utilizando **bcrypt** para armazenamento seguro de
senhas, **JWT** para autenticação e **Nodemailer/Gmail** para
recuperação de senha por e-mail.

------------------------------------------------------------------------

## 📌 Funcionalidades

-   Cadastro de usuário
-   Validação dos dados de cadastro
-   Hash de senha com bcrypt
-   Login
-   Geração de JWT
-   Middleware de autenticação
-   Rota privada
-   Recuperação de senha
-   Geração de código de verificação de 6 dígitos
-   Expiração do código após 10 minutos
-   Envio do código por e-mail
-   Invalidação do código anterior ao solicitar um novo
-   Código de recuperação de uso único
-   Alteração da senha com bcrypt
-   Banco de dados SQLite através do Prisma ORM

------------------------------------------------------------------------

## 🧱 Stack

  Tecnologia     Função
  -------------- ---------------------------
  Node.js        Runtime JavaScript
  TypeScript     Tipagem estática
  Express        API HTTP
  Prisma ORM     ORM e acesso ao banco
  SQLite         Banco de dados relacional
  bcrypt         Hash de senhas
  jsonwebtoken   JWT
  Zod            Validação de dados
  Nodemailer     Envio de e-mails
  dotenv         Variáveis de ambiente

------------------------------------------------------------------------

## 📁 Estrutura

Uma estrutura aproximada do backend:

``` text
desafio-api/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   └── passwordReset.repository.ts
│   │
│   ├── services/
│   │   └── emailService.ts
│   │
│   ├── routes/
│   │   └── auth.routes.ts
│   │
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

Os nomes exatos de alguns arquivos podem variar de acordo com a
organização final do projeto.

------------------------------------------------------------------------

# 🚀 Como executar

## 1. Pré-requisitos

Tenha instalado:

-   Node.js
-   npm
-   Git

Confira:

``` bash
node --version
npm --version
```

------------------------------------------------------------------------

## 2. Clonar o projeto

``` bash
git clone <URL_DO_REPOSITORIO>
cd desafio-api
```

------------------------------------------------------------------------

## 3. Instalar dependências

``` bash
npm install
```

------------------------------------------------------------------------

# 🔧 Configuração das variáveis de ambiente

Crie um arquivo `.env` na raiz da API:

``` env
DATABASE_URL="file:./dev.db"

JWT_SECRET="sua_chave_secreta"

EMAIL_USER="seuemail@gmail.com"
EMAIL_PASSWORD="sua_app_password"
```

### JWT_SECRET

É a chave usada para assinar os tokens JWT.

Use uma chave aleatória e forte.

Exemplo:

``` env
JWT_SECRET="uma-chave-grande-e-aleatoria"
```

### E-mail

O projeto utiliza Nodemailer com Gmail.

**Não utilize a senha normal da conta Google.**

É necessário utilizar uma **App Password**.

Acesse:

https://myaccount.google.com/apppasswords

Para utilizar App Passwords, a conta Google precisa ter a verificação em
duas etapas configurada.

Exemplo:

``` env
EMAIL_USER="seuemail@gmail.com"
EMAIL_PASSWORD="abcdefghijklmnop"
```

Não coloque espaços na App Password.

> Nunca envie o `.env` para o GitHub.

------------------------------------------------------------------------

# 🗄️ Configuração do Prisma

Depois de configurar o `.env`, execute:

``` bash
npx prisma migrate dev
```

Se estiver criando a migration de recuperação de senha pela primeira
vez:

``` bash
npx prisma migrate dev --name add_password_reset
```

Depois:

``` bash
npx prisma generate
```

O banco SQLite será criado de acordo com o `schema.prisma`.

------------------------------------------------------------------------

## 🔎 Prisma Studio

Para visualizar o banco:

``` bash
npx prisma studio
```

O Prisma Studio permite consultar os usuários e os registros de
recuperação de senha.

------------------------------------------------------------------------

# ▶️ Executando a API

Execute o script de desenvolvimento configurado no `package.json`.

Normalmente:

``` bash
npm run dev
```

A API estará disponível em:

``` text
http://localhost:8080
```

------------------------------------------------------------------------

# 🔐 Fluxo de autenticação

## Cadastro

``` http
POST /auth/register
```

Exemplo:

``` json
{
  "name": "Lucas",
  "email": "lucas@email.com",
  "password": "Senha123"
}
```

A senha nunca é armazenada em texto puro.

Ela passa por:

``` text
senha
  ↓
bcrypt.hash()
  ↓
hash
  ↓
SQLite
```

------------------------------------------------------------------------

## Login

``` http
POST /auth/login
```

Exemplo:

``` json
{
  "email": "lucas@email.com",
  "password": "Senha123"
}
```

Quando as credenciais são válidas, a API retorna um JWT.

O fluxo é:

``` text
email + senha
     ↓
busca usuário
     ↓
bcrypt.compare()
     ↓
credenciais válidas
     ↓
JWT
```

------------------------------------------------------------------------

# 🛡️ Rotas privadas

As rotas protegidas utilizam o middleware de autenticação.

O cliente deve enviar:

``` http
Authorization: Bearer SEU_TOKEN
```

O middleware:

1.  verifica a existência do header;
2.  extrai o Bearer Token;
3.  verifica o JWT;
4.  permite ou bloqueia a requisição.

------------------------------------------------------------------------

# 🔑 Recuperação de senha

O fluxo possui três endpoints.

``` text
Forgot Password
      ↓
POST /auth/forgot-password
      ↓
código de 6 dígitos
      ↓
e-mail
      ↓
POST /auth/verify-reset-code
      ↓
código válido
      ↓
POST /auth/reset-password
      ↓
nova senha
```

------------------------------------------------------------------------

## 1. Solicitar código

``` http
POST /auth/forgot-password
```

Body:

``` json
{
  "email": "lucas@email.com"
}
```

A API:

1.  procura o usuário;
2.  gera um código aleatório de 6 dígitos usando `crypto.randomInt`;
3.  define validade de 10 minutos;
4.  remove códigos anteriores daquele e-mail;
5.  salva o novo código;
6.  envia o código por e-mail.

Exemplo de código:

``` text
731204
```

### Segurança

A resposta não revela se o e-mail está cadastrado.

``` json
{
  "message": "If this email is registered, a verification code has been sent."
}
```

Isso evita enumeração de usuários.

------------------------------------------------------------------------

## 2. Verificar código

``` http
POST /auth/verify-reset-code
```

Body:

``` json
{
  "email": "lucas@email.com",
  "code": "731204"
}
```

A API verifica:

-   se o código existe;
-   se pertence ao e-mail informado;
-   se não expirou.

Código expirado é removido do banco.

Resposta:

``` json
{
  "success": "Verification code is valid."
}
```

------------------------------------------------------------------------

## 3. Alterar senha

``` http
POST /auth/reset-password
```

Body:

``` json
{
  "email": "lucas@email.com",
  "code": "731204",
  "password": "NovaSenha123"
}
```

A API:

1.  valida os dados;
2.  verifica o código;
3.  verifica a expiração;
4.  encontra o usuário;
5.  gera o hash com bcrypt;
6.  atualiza a senha;
7.  remove o código utilizado.

Depois disso, o código não pode ser reutilizado.

------------------------------------------------------------------------

# 📧 Tratamento de falha no envio

O código é salvo antes do envio do e-mail.

Caso o Nodemailer falhe, o registro recém-criado é removido.

``` text
gera código
    ↓
salva banco
    ↓
tenta enviar e-mail
    ↓
 ┌──┴──┐
 OK   ERRO
 │      │
 ↓      ↓
fim   remove código
```

Isso evita que exista no banco um código que nunca foi enviado ao
usuário.

------------------------------------------------------------------------

# 🧪 Testando a API

Ferramentas recomendadas:

-   Insomnia
-   Postman
-   Thunder Client
-   curl

### Fluxo completo

#### 1. Cadastro

``` http
POST http://localhost:8080/auth/register
```

#### 2. Login

``` http
POST http://localhost:8080/auth/login
```

#### 3. Solicitar recuperação

``` http
POST http://localhost:8080/auth/forgot-password
```

#### 4. Conferir e-mail

Copie o código recebido.

#### 5. Validar código

``` http
POST http://localhost:8080/auth/verify-reset-code
```

#### 6. Alterar senha

``` http
POST http://localhost:8080/auth/reset-password
```

#### 7. Fazer login novamente

Utilize a nova senha.

------------------------------------------------------------------------

# 🧰 Problemas comuns

## Prisma Client não possui `passwordReset`

Erro parecido com:

``` text
Cannot read properties of undefined (reading 'create')
```

Execute:

``` bash
npx prisma migrate dev
npx prisma generate
```

Depois reinicie a API.

------------------------------------------------------------------------

## Gmail retorna `535-5.7.8`

Erro:

``` text
535-5.7.8 Username and Password not accepted
```

Verifique:

-   `EMAIL_USER`;
-   `EMAIL_PASSWORD`;
-   se está utilizando uma App Password;
-   se a verificação em duas etapas está habilitada;
-   se o `.env` foi carregado;
-   se a API foi reiniciada depois da alteração.

Não utilize a senha normal da conta Google.

------------------------------------------------------------------------

# 🔒 Boas práticas utilizadas

-   Senhas armazenadas com bcrypt
-   JWT com tempo de expiração
-   Variáveis sensíveis no `.env`
-   Validação com Zod
-   Códigos de recuperação aleatórios
-   Código de recuperação com validade limitada
-   Invalidação de códigos anteriores
-   Código de recuperação de uso único
-   Não exposição da existência de contas no endpoint de recuperação
-   Tratamento de erros de envio de e-mail

------------------------------------------------------------------------

# 📝 Observações

Este projeto foi desenvolvido como um desafio técnico de autenticação e
prioriza clareza, segurança e separação de responsabilidades.

Em um ambiente de produção, ainda poderiam ser adicionados recursos
como:

-   rate limiting;
-   limite de tentativas para códigos;
-   refresh tokens;
-   logs estruturados;
-   serviço transacional de e-mail;
-   HTTPS;
-   CORS configurado por ambiente;
-   banco PostgreSQL;
-   testes automatizados;
-   Docker;
-   gerenciamento de sessões;
-   monitoramento.

------------------------------------------------------------------------

# 👨‍💻 Autor

Lucas

Projeto desenvolvido para estudo e avaliação técnica.
