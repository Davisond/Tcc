## Dependencias necessárias

    npm
    Express
    mysql2
    nodemon -D 
    dotenv
    npx eslint --init
    xamp ou wamp

## .env: Requisito para iniciar o servidor

    Precisa necessariamente criar um arquivo chamado .env com o seguinte modelo:
    PORT=
    MYSQL_HOST=
    MYSQL_USER=
    MYSQL_PASSWORD=
    MYSQL_DB=
    JWT_SECRET=

## Iniciar o servidor
    npm start ou node src/index.js

## Passo a passo para simulação da API

#   1 - Criar usuário
        No insomnia:
            método POST:  URL = http://localhost:3333/usuarios
        Json:
            {
            "nome": "example",
            "email": "example@email.com",
            "senha": "12345678",
            "idade": 20,
            "sexo": "M",
            "peso": 70,
            "altura": 1.75,
            "objetivo": "ganho de massa muscular"
            }

#   2 - Criar dia
        No insomnia:
            método POST:  URL = http://localhost:3333/dias
        Json:
            {
            "data": "2025-07-05",
            "idUsuario": 1
            }

#   3 - Criar uma refeição
        No insomnia:
            método POST:  URL = http://localhost:3333/refeicao
        Json:
            {
            "quantidade": 150,
            "data": "2025-07-05",
            "tipo": "almoço",
            "idUsuario": 1,
            "idDia": 1
            }
  
#   4 - Adicionar alimentos a composicaoRefeicao
         No insomnia:
            método POST:  URL = http://localhost:3333/composicao/
        Json:
           {
            "idRefeicao": 1,
            "idUsuario": 1,
            "idAlimento": 1,
            "idAlimentoPersonalizado": null,
            "quantidade": 150
            }
#   5 - Rodar o endpoint de resumo
         No insomnia:
            método GET:  URL = GET http://localhost:3333/resumoDia/1
        json recebido (valores fictícios de exemplo):
        {
            "objetivos": {
                "objetivoProteina": 150,
                "objetivoCarboidrato": 250,
                "objetivoGordura": 70
            },
            "consumido": {
                "proteina": 3.0,
                "carboidrato": 45.0,
                "gordura": 0.5
            }
        }





