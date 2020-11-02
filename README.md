# HEY-FIT

# description
```bash

1 - Criar uma aplicação capaz de ler uma tabela de pessoas em um
banco de dados qualquer e realizar filtros.
2 - Listar essas informações em tabela simples. (conforme layout
escolhido)
3 - Permitir filtros.

Filtros desejados:

Pessoas acima do peso, no peso ideal e abaixo do peso.
Pessoas altas, medianas, baixas
Pessoas intolerantes a lactose
Pessoas atletas
Utilizar tabela abaixo para a relação:
1,80 < Altos
1,60 - 1,79 - Medianos
1,59 > - Baixos
90 < - Acima do peso
70 - 89 > Peso ideal
69 > Abaixo do peso
```

## client - (FRONT - nuxt)

```bash
# folder client
$ cd client

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
## server - (BACK - node)

```bash
# folder server
$ cd server

# install dependencies
$ npm install

# serve with hot reload at localhost:4000
$ node index

# config production 
$ copy the file .env.example to .env and set NODE_ENV=production and SECRET=any

# config database
$ config/config.json production

# db tables
$ config/tables.sql

# DONE !!!

```
