<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🚀 API NestJS – Sistema de Autenticação JWT

Projeto backend RESTful desenvolvido com [NestJS](https://nestjs.com/), utilizando autenticação via JWT, controle de acesso por roles, documentação Swagger e validação de dados com Zod.

---

## 🔐 Funcionalidades

- Login com email e senha
- Geração de token JWT
- Proteção global de rotas via JwtAuthGuard
- Controle de acesso por roles (`@Roles`)
- Marcação de rotas públicas (`@IsPublic`)
- Documentação Swagger
- Integração com banco de dados usando Prisma ORM
- Validação de dados com Zod

---

## 📦 Tecnologias

- NestJS
- Passport + JWT
- Prisma ORM (MySQL, PostgreSQL, etc.)
- Zod (validação)
- Swagger (documentação)
- TypeScript

---

## 📚 Documentação

Após iniciar o projeto, acesse:

http://localhost:3000/api

A interface Swagger mostrará todas as rotas disponíveis e permitirá testes diretamente na interface web.

---

## ⚙️ Instalação

1️⃣ **Clone o projeto**

```bash
git clone https://github.com/gabrielbatschauer/auth-nestjs/
cd auth-nestjs
```

2️⃣ **Instale as dependências**

```bash
npm install
```

3️⃣ **Configure o banco de dados**

Crie um arquivo .env baseado no .env.example:

```bash
cp .env.example .env
```

Configure a variável DATABASE_URL com a URL do seu banco de dados.

4️⃣ **Rode as migrations do Prisma**

```bash
npx prisma migrate dev
```

5️⃣ **Inicie o projeto**

```bash
npm run start:dev
```

---

## 🔑 Autenticação

Após o login, o cliente receberá um token JWT.

Para acessar rotas protegidas, envie o token no Authorization Header como:

```bash
Authorization: Bearer <seu-token>
```

Rotas públicas estão marcadas no código com o decorator @IsPublic().

---

## 🛠️ Scripts úteis

| Comando                  | Descrição                               |
| ------------------------ | --------------------------------------- |
| `npm run start:dev`      | Inicia a API em modo desenvolvimento    |
| `npx prisma studio`      | Acessa painel web do Prisma ORM         |
| `npx prisma migrate dev` | Executa as migrations no banco de dados |

---

🤝 Contribuição
Sinta-se à vontade para abrir Issues ou Pull Requests!
