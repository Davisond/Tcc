## Dependencias necessárias

    npm
    Express
    mysql2
    nodemon -D 
    dotenv
    npx eslint --init
    xamp ou wamp

## iniciar servidor

    Precisa necessariamente criar um arquivo chamado .env com o seguinte modelo:
    PORT=
    MYSQL_HOST=
    MYSQL_USER=
    MYSQL_PASSWORD=
    MYSQL_DB=
    JWT_SECRET=

## Após criar o dotenv, pode colar o código abaixo no terminal:
    npm start ou node src/index.js


## router
    Executa as rotas existentes cuja lógica está em constrollers


## Model
    Funções que acessam diretamente ao banco de dados, aqui tem comandos como acessar, inserir, deletar e etc
