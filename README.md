# 🏦 Sistema Bancário (Terminal)

Um sistema bancário desenvolvido em Node.js com integração ao MySQL, executado diretamente pelo terminal.

---

# 🎮 Sobre o Projeto

O projeto consiste em um sistema bancário completo via terminal, permitindo o gerenciamento de contas e movimentações financeiras com persistência em banco de dados.

O sistema foi desenvolvido com foco em:

- Prática de backend com Node.js
- Integração com MySQL
- Autenticação de usuários
- Segurança de senhas
- Regras de negócio bancárias
- Manipulação de transações
- Modularização de código
- Arquitetura organizada

Projeto desenvolvido de forma autoral para fins de estudo e prática de desenvolvimento backend.

---

# 🚀 Funcionalidades

- 👤 Cadastro de usuários
- 🔑 Sistema de login
- 🔒 Criptografia de senhas com bcrypt
- 💰 Consulta de saldo
- 📥 Depósito em conta
- 📤 Saque de valores
- 🔄 Transferência entre contas
- 📋 Histórico de transações
- ✏️ Alteração de nome
- 📩 Alteração de email
- 🔑 Alteração de senha
- ❌ Encerramento de conta
- ✅ Validação de saldo disponível
- ✅ Validação de credenciais
- ✅ Validação de dados informados
- 🎨 Interface organizada no terminal
- ⏸️ Sistema de pause e fluxo controlado
- 🛠️ Integração real com MySQL

---

# 🎮 Menu Principal

```txt
1. Criar usuário. ➕
2. Fazer login. 👤
0. Sair. ❌
```

---

# 🏦 Menu Bancário

```txt
1. Consultar saldo 💰
2. Depositar 📥
3. Sacar 📤
4. Transferir 🔄
5. Histórico 📋
6. Editar perfil ✏️
7. Fechar conta 🚫
0. Sair ❌
```

---

# 👤 Cadastro de Usuário

Durante o cadastro são solicitados:

```txt
👤 - Insira seu nome:
📩 - Insira seu email:
🔑 - Insira sua senha:
💵 - Insira o saldo da conta:
```

Após o cadastro:

```txt
Cadastro criado com sucesso! ✅
🆔 = 23
```

---

# 🔑 Sistema de Login

O login é realizado utilizando:

- Email
- Senha

Exemplo:

```txt
📩 - Insira seu email:
🔑 - Insira sua senha:
```

---

# ✅ Login Correto

```txt
Logado com sucesso! ✅
```

---

# ❌ Login Inválido

```txt
Senha incorreta! ❌
```

---

# 💰 Consulta de Saldo

Permite visualizar o saldo atual da conta diretamente do banco de dados.

Exemplo:

```txt
Saldo da conta 💰

R$ 1000.00
```

---

# 📥 Depósito

Permite adicionar saldo à conta.

Exemplo:

```txt
💵 - Informe o valor do depósito:
```

Após a operação:

```txt
Saldo após depósito: R$1500.00 💰
```

---

# 📤 Saque

Permite retirar saldo da conta.

Validações:

- Valor numérico
- Valor maior que zero
- Saldo suficiente

Exemplo:

```txt
💵 - Informe o valor do saque:
```

---

# 🔄 Transferência

Permite transferir valores entre contas cadastradas.

Validações:

- Conta destino existente
- Conta destino diferente da origem
- Saldo suficiente
- Valor válido

Exemplo:

```txt
🆔 - Informe o ID da conta destino:
💵 - Informe o valor:
```

Após a operação:

```txt
Transferência realizada com sucesso! ✅
```

---

# 📋 Histórico de Transações

Todas as movimentações ficam registradas no banco de dados.

Exemplo:

```txt
Depósito
Saque
Transferência
```

Informações armazenadas:

- ID da transação
- Tipo
- Valor
- Usuário de origem
- Usuário de destino
- Data

---

# ✏️ Editar Perfil

Menu de edição:

```txt
1. Editar nome 👤
2. Email 📩
3. Senha 🔑
0. Sair ❌
```

---

# 🔒 Segurança das Alterações

Para operações sensíveis o sistema exige validação da senha atual.

Exemplos:

- Alteração de senha
- Alteração de email
- Encerramento de conta

Isso garante que apenas o proprietário da conta possa realizar modificações importantes.

---

# ❌ Encerramento de Conta

Para encerrar uma conta é necessário informar a senha atual.

Exemplo:

```txt
🔑 - Insira a senha da conta para encerramento:
```

Após confirmação:

```txt
Conta fechada com sucesso! ✅
```

---

# 🔒 Segurança

O sistema utiliza:

- Senhas criptografadas com bcrypt
- Queries parametrizadas com `?`
- Comparação segura de hash
- Validação de saldo
- Validação de identidade do usuário
- Validação de operações financeiras

---

# 🗄️ Senhas no Banco de Dados

As senhas não são armazenadas em texto puro.

Exemplo:

| ID | Nome | Email | Senha |
|----|-------|--------|--------|
| 23 | Teste 1 | teste1@gmail.com | `$2b$10$xEFvnMXH1KZmMspy6J0f...` |

Fluxo da criptografia:

```txt
senha digitada
↓
bcrypt.hash()
↓
hash criptografado
↓
salvo no banco
```

Durante o login:

```txt
senha digitada
+
hash salvo no banco
↓
bcrypt.compare()
↓
true ou false
```

---

# 📂 Estrutura do Projeto

```txt
project/
├── database/
│   └── connection.js
│
├── models/
│   ├── Transaction.js
│   └── User.js
│
├── services/
│   ├── accountHistory.js
│   ├── checkBalance.js
│   ├── closeAccount.js
│   ├── deposit.js
│   ├── editEmail.js
│   ├── editName.js
│   ├── editPassword.js
│   ├── editProfile.js
│   ├── login.js
│   ├── pause.js
│   ├── registerUser.js
│   ├── saveUser.js
│   ├── transferBalance.js
│   └── withdraw.js
│
├── utils/
│   ├── awaitTime.js
│   ├── decryptPassword.js
│   └── encryptPassword.js
│
├── index.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

# 🧠 Conceitos Aplicados

- Integração com MySQL
- Sistema bancário
- Autenticação de usuários
- Criptografia de senhas
- Programação assíncrona (`async/await`)
- Queries SQL parametrizadas
- Modularização de código
- Separação de responsabilidades
- Manipulação de arrays e objetos
- Entrada de dados com `readline`
- Fluxo controlado com callbacks
- Regras de negócio
- Histórico de transações
- Persistência de dados
- Pool de conexões MySQL

---

# 🗄️ Operações SQL Utilizadas

```sql
SELECT
INSERT
UPDATE
DELETE
WHERE
```

---

# 🛠️ Tecnologias Utilizadas

- Node.js
- MySQL
- mysql2
- bcrypt
- readline

---

# ⚙️ Como Executar

## Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

## Entre na pasta do projeto

```bash
cd nome-do-projeto
```

## Instale as dependências

```bash
npm install
```

## Instale os pacotes necessários

```bash
npm install mysql2 bcrypt
```

---

# 🗄️ Configure o Banco de Dados

## Crie o banco

```sql
CREATE DATABASE banking_system;
```

---

## Crie a tabela de usuários

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10,2) NOT NULL
);
```

---

## Crie a tabela de transações

```sql
CREATE TABLE transactions (
    id_transaction INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    user_origin_id INT NOT NULL,
    user_destination_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔌 Configure a conexão

No arquivo:

```txt
database/connection.js
```

configure:

```js
host
user
password
database
```

---

# ▶️ Execute o Projeto

```bash
node index.js
```

---

# 📚 Objetivo do Projeto

Este projeto foi desenvolvido como prática de:

- Backend com Node.js
- SQL e MySQL
- Autenticação de usuários
- Criptografia de senhas
- Regras de negócio
- Movimentações financeiras
- Arquitetura modular
- Desenvolvimento CLI
- Segurança de aplicações
- Persistência de dados
- Manipulação de transações bancárias

---