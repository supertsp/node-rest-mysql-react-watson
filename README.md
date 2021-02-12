# Como executar esse Projeto

[![node badge][node-img]][node]

[node-img]:        https://img.shields.io/badge/Node-%3E%3D14.15.4-green
[node]:            https://nodejs.org/en/


Este projeto foi criado utilizando as seguintes tecnologias:
* `node-rest-mysql-watson` (back-end): API Rest, baseada em Node.js, que integra MySQL e IBM Watson
* `site-react` (front-end): Webpage que consome os serviços Rest


## Como executar o projeto `node-rest-mysql-watson`

Para o projeto `node-rest-mysql-watson`, digite os seguintes comandos:

```sh
cd node-rest-mysql-watson/
npm install
npm start
```
Agora os seguintes enpoints estarão disponíveis:
* GET::[http://localhost:8080/api/v1/comments](http://localhost:8080/api/v1/comments): Listar
* POST::[http://localhost:8080/api/v1/comments](http://localhost:8080/api/v1/comments): Criar
* DELETE::[http://localhost:8080/api/v1/comments/idComment](http://localhost:8080/api/v1/comments/idComment): Apagar
* UPDATE::[http://localhost:8080/api/v1/comments/idComment](http://localhost:8080/api/v1/comments/idComment): Atualizar



## Como executar o projeto `site-react`

Para o projeto `site-react`, digite os seguintes comandos:

```sh
cd site-react/
npm install
npm start
```
Agora a webpage está disponível em:
* [http://localhost:3000](http://localhost:3000)

