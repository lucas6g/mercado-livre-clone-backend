<h1 align="center">
 Mercado Livre Clone 
</h1>

<h3 align="center">
Um Clone Com as Principais Funcionalidades do maior e-commerce da America Latina.
</h3>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a> | <a href="#computer-tecnologias">Tecnologias</a> | <a href="#books-guia-de-instalação-e-execução">Guia de instalação e execução</a> 
</p>

<img src="https://user-images.githubusercontent.com/54814274/140586879-19084ed6-8110-47ab-a506-f4a0154b520d.png">


## :rocket: Sobre o projeto

<p>Este é o repositório da API do projeto.</p>
<ul>
  <li>Para a versão web, <a href="https://github.com/lucas6g/mercado-livre-clone-front">clique aqui</a>.</li>
 
</ul>

## :computer: Tecnologias

Além das tecnologias abaixo, esta aplicação foi desenvolvida com as melhores práticas de desenvolvimento! 


    
- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://docs.nestjs.com)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint-Airbnb](https://eslint.org/), 
- [Stripe](https://stripe.com/br/), 
- [Prettier](https://prettier.io/) 
- [Dotenv](https://github.com/motdotla/dotenv)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [TypeORM](https://typeorm.io/#/)
- [Cors](https://github.com/expressjs/cors)
- [Class-transformer](https://github.com/typestack/class-transformer)
- [Tsyringe](https://github.com/microsoft/tsyringe)
## :books: Guia de instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) v10.20 ou maior
- [Yarn](https://yarnpkg.com/)
- [NestJs-cli](https://docs.nestjs.com)

- Uma instância de [PostgreSQL](https://www.postgresql.org/)

### Como executar

<i>Antes de executar estes passos, você precisa ter uma instância do banco acima.</i>0

- Clone o repositório ```git clone https://github.com/lucas6g/mercado-livre-clone-backend.git```
- Vá até o diretório ```cd mercado-livre-clone-backend```
- Execute ```yarn``` para instalar as dependências
- Crie um arquivo .env e preencha com suas variáveis de ambiente

- Abra o arquivo ormconfig.js e preencha com suas credenciais das instâncias dos bancos de dados
- Execute ```yarn migration:run``` para rodar as migrations 
- Execute ```yarn dev``` para rodar o servidor

Você pode realizar requisições REST através do Insomnia



