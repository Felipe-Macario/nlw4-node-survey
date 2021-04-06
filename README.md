<h1 align="center">🎲 NLW4 NPS</h1>
<p align="center">☕ Esse projeto foi desenvolvido durante a trilha de NodeJS, na quarta edição da NLW que consiste em um estudo sobre API feita em Node.js realizando uma pesquisa NPS via email</p>

# 🛠 Tecnologias usadas

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ethereal-Email](https://ethereal.email/)
- [TypeORM](https://typeorm.io/#/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)

# Criando o projeto

### Requisitos

- Node.js
- Yarn

### ⚙️ Como rodar a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/Felipe-Macario/nlw4-node-survey.git

# Instale as dependências
$ yarn install

# Rode as migrations
$ yarn typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# Rode os testes
$ yarn test
```

O servidor iniciará na porta 3333, para acessar a aplicação utilize a url [`https://localhost:3333`](https://localhost:3333)