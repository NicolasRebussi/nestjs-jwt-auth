🛡️ NestJS JWT Auth API
Este é um projeto de API de autenticação com JWT desenvolvida em NestJS usando Prisma ORM e MySQL como banco de dados.
Ideal para aprender como proteger rotas, cadastrar e autenticar usuários com segurança usando bcrypt e JSON Web Tokens.

🧠 Objetivo
Este projeto tem fins educativos. Estou aprendendo NestJS e os principais conceitos de autenticação com JWT.
A intenção é evoluir o projeto com novas funcionalidades, como:

Refresh Tokens

Rotas protegidas com Guards

Perfis de usuários (admin, user)

Testes automatizados

# 🔐 NestJS JWT Auth API

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-v10-red)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-yellow)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)

## 📘 Descrição

API de autenticação construída com [NestJS](https://nestjs.com/), usando [JWT](https://jwt.io/) para login seguro e [Prisma](https://www.prisma.io/) como ORM para acesso ao banco de dados MySQL. Ideal para estudar autenticação moderna em aplicações backend.

---

## 🚀 Funcionalidades

- Cadastro de usuários (`/auth/signup`)
- Login com e-mail e senha (`/auth/signin`)
- Geração de token JWT
- Hash de senhas com Bcrypt
- Validações com class-validator
- Estrutura modular com NestJS

---

## 🧱 Tecnologias

- [NestJS](https://nestjs.com/)
- [JWT](https://jwt.io/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Class-validator](https://github.com/typestack/class-validator)

---

## 🛠️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
