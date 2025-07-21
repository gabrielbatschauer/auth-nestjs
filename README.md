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

## Dúvidas

<details>
  <summary><strong>Para que serve / Como funciona cada Guard?</strong></summary>
  <ul>
    <li><strong>Jwt Auth Guard</strong> – Intercepta as requisições e verifica se é um token válido. Usado para bloquear rotas protegidas pelo token.</li>
    <li><strong>Local Auth Guard</strong> – Usado somente no login. Valida o usuário pelo e-mail e senha fornecidos no body, usando o <code>passport-local</code>.</li>
    <li><strong>Role Guard</strong> – Intercepta as rotas e verifica se o payload do usuário possui a role necessária para acessar a rota, definida com <code>@Roles('ADMIN')</code>.</li>
  </ul>
</details>

<details>
  <summary><strong>Quais são todos os decorators que preciso usar?</strong></summary>
  <ul>
    <li><code>@IsPublic()</code> – Por padrão, todas as rotas são protegidas pelo Jwt Auth Guard (necessitam de token). Com este decorator, a rota se torna pública.</li>
    <li><code>@UseGuards()</code> – Define quais guards serão utilizados no controller.</li>
    <li><code>@Roles('USER')</code> – Define a role necessária para acessar uma rota (utilizado junto com <code>@UseGuards(RoleGuard)</code> acima do <code>@Controller</code>).</li>
  </ul>
</details>

<details>
  <summary><strong>Para que serve / Como funciona cada Strategy?</strong></summary>
  <ul>
    <li><strong>Jwt Strategy</strong> – Acionado pelo Jwt Auth Guard. Extrai o token do Authorization Header e valida a assinatura.</li>
    <li><strong>Local Strategy</strong> – Acionado pelo Local Auth Guard. Verifica se existe um usuário com o e-mail e se a senha está correta. Caso esteja, retorna um token e um refresh token para o usuário.</li>
  </ul>
</details>

<details>
  <summary><strong>Para que serve o Refresh Token?</strong></summary>
  <p>O Refresh Token é usado para obter um novo Access Token sem que o usuário precise fazer login novamente. Ele geralmente possui um tempo de expiração mais longo que o Access Token e é enviado em uma rota protegida específica para renovação do token.</p>
</details>

<details>
  <summary><strong>Onde fica salvo o payload e como posso adicionar algo nele?</strong></summary>

O **payload** do token JWT não é salvo no servidor. Ele é embutido dentro do próprio token JWT (codificado em Base64) e entregue ao cliente. Sempre que o token é enviado de volta (no header Authorization), o NestJS decodifica esse token usando a **JwtStrategy** e recupera o payload diretamente dele.

O conteúdo do payload fica acessível na API como `req.user`.

---

### 🛠️ Como adicionar algo novo no payload

Passo a passo para adicionar um campo (ex.: `companyId`) ao payload do JWT:

---

**1️⃣ Atualize o tipo do payload**

Arquivo: `src/auth/model/UserPayLoad.ts`

```typescript
export type UserPayload = {
  sub: number;
  email: string;
  role: string;
  companyId: number; // Novo campo adicionado
};
```

**2️⃣ Inclua o campo na geração do token**

Arquivo: `src/auth/auth.service.ts`

```typescript
const payload: UserPayload = {
  sub: user.id,
  email: user.email,
  role: user.role,
  companyId: user.companyId, // Adicionando novo dado
};

return this.jwtService.sign(payload);
```

</details>

---

🤝 Contribuição
Sinta-se à vontade para abrir Issues ou Pull Requests!
