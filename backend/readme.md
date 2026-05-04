
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

## 1 - Criar usuário
No insomnia:<br>
    método POST:  URL = http://localhost:3333/usuarios
```Json
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
```

## 2 - Gerar dia
No insomnia:<br>
método POST:  URL = http://localhost:3333/dias
```Json
{
"data": "2025-07-05",
"idUsuario": 1
}
```

##  3 - Criar uma refeição
No insomnia:<br>
    método POST:  URL = http://localhost:3333/refeicao
```Json
    {
    "quantidade": 150,
    "data": "2025-07-05",
    "tipo": "almoço",
    "idUsuario": 1,
    "idDia": 1
    }
  ```
##  4 - Adicionar alimentos a composicaoRefeicao
 No insomnia:<br>
    método POST:  URL = http://localhost:3333/composicao/
```Json
   {
    "idRefeicao": 1,
    "idUsuario": 1,
    "idAlimento": 1,
    "idAlimentoPersonalizado": null,
    "quantidade": 150
    }
```
## 5 - Rodar o endpoint de resumo
No insomnia:<br>
método GET:  URL = GET http://localhost:3333/resumoDia/1<br>
    
json recebido (valores fictícios de exemplo):
```Json
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
```

## Contexto da aplicação de análise por API de IA

### Estruturação dos dados:

O Primeiro passo para a implementação de uma avaliação inteligente funcional trata-se de
alimentar a IA com dados que possam ser avaliados, com este objetivo, o sistema buscará no
banco de dados todos os alimentos consumidos pelo usuário, através das refeições e feebacks
relacionados.

```Node.js
const getResumoMes = async (idUsuario) => {
    const [dias] = await connection.execute(
    `SELECT id, data FROM dia 
     WHERE idUsuario = ? 
     AND MONTH(data) = MONTH(CURDATE()) 
     AND YEAR(data) = YEAR(CURDATE())`,
    [idUsuario]
);
let refeicoesCompletas = [];
for (const dia of dias){
    const [refeicoes] = await connection.execute(
    'SELECT id, data FROM refeicao WHERE idDia = ?',
    [dia.id]
);
for (const refeicao of refeicoes) {
    const [alimentos] = await connection.execute(
    `SELECT a.nome, cr.quantidade
        FROM composicaoRefeicao cr
        JOIN alimentos a ON cr.idAlimento = a.id
        WHERE cr.idRefeicao = ?`,
    [refeicao.id]
    );
const [feedbacks] = await connection.execute(
`SELECT descricao, sensacao 
    FROM feedback 
    WHERE idUsuario = ? AND idRefeicao = ?`,
[idUsuario, refeicao.id]
    );
```

**Descrição da função de Coleta de Dados:** O trecho de código apresentado define a função
getResumoMes, que é o módulo central de coleta e agregação de dados do sistema em um período de 1 mês.<br>

O fluxo de execução da função é sequencial e baseado em consultas aninhadas ao banco de
dados:<br>
- **Filtro do período de tempo e Usuário:** Inicialmente, a função realiza uma consulta à tabela
dia para recuperar todos os identificadores (id) e datas que correspondem ao usuário autenticado
(idUsuario) e que estão contidos dentro dos limites do mês e ano atuais (MONTH(CURDATE())
e YEAR(CURDATE())).
- **Busca por Refeição:** A seguir, o código itera sobre cada dia recuperado. Para cada dia,
é executada uma nova consulta à tabela refeicao para obter todas as refeições associadas ao
respectivo idDia.<br>
- **Detalhamento dos Alimentos:** Para cada refeicao identificada, o sistema realiza uma consulta JOIN com a tabela composicaoRefeicao e a tabela alimentos. Este passo é necessário para
detalhar o conteúdo da refeição, permitindo a recuperação do nome e da quantidade de cada
alimento consumido.<br>
- **Recuperação de Feedbacks do usuário sobre às refeições:** Em seguida, é efetuada uma
consulta à tabela feedback para associar as informações de bem-estar. O objetivo é obter a
descricao e a sensacao registradas para a idRefeicao e o idUsuario em questão.<br>
- **Estruturação de dados:** Após a recuperação dos componentes, a função procede à fase de
agregação<br>
- **Criação do Objeto:** O código constrói um objeto refeicoesCompletas que encapsula o
agrupamento de idRefeicao, data, o array de alimentos consumidos e os respectivos feedbacks
associados.

### Módulo de comunicação com a IA

Com o intuito de gerar uma avaliação inteligente a respeito dos dados armazenados foi
estudado e percebido que fazer o uso de uma API de IA seria muito mais viável e apresentaria
resultados bastante satisfatórios.<br>

Para a implementação do módulo de recomendações, optou-se pela integração com modelos
de linguagem de grande escala via API, em detrimento do treinamento de um modelo proprietário. Esta decisão de engenharia baseou-se na capacidade superior de processamento semântico
de modelos pré-treinados, que permitem interpretar o contexto dos feedbacks subjetivos (como
’indisposição’ ou ’cansaço’) com maior precisão do que modelos tradicionais em contextos de
poucos dados.<br>

A IA selecionada para a conclusão da tarefa foi o Deepseek devido à competência, desempenho e custo-beneficio da mesma<br>

O arquivo iaService.js traz consigo a representação de uma camada de comunicação direta
com o modelo de IA selecionado, a principal função deste arquivo é garantir uma comunica-
ção direta com o provedor de IA (Deepseek), garantindo uma solicitação e resposta que seja corretamente formatada e validada.

```Node.js
const apiKey = '#';
const url = '#';

async function gerarAnaliseIa(dados) {

try {
    const listaAlimentos = dados.map(a => `
        Nome: ${a.nome}
        - Total de feedbacks: ${a.qtd}
        - Feedbacks negativos: ${a.negativos ?? 0}
        - Feedbacks positivos: ${a.positivos ?? 0}
        - Alerta: ${a.alerta ?? 'N/A'}
    `).join('\n\n');
         const prompt = `#`
        const body = {
        model: 'deepseek-chat',
        stream: false,
        messages: [
            { role: 'system', content: `#`},
                        { role: 'user', content: prompt }
        ]
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    const iaResponseString = data?.choices?.[0]?.message?.content;
    if (iaResponseString) {
        try {
            // Tenta decodificar o JSON
            return JSON.parse(iaResponseString); 
        } catch (e) {
            console.error('[iaService] ERRO ao decodificar JSON da IA:', e);
            return { erro
            };
        }
```

O modelo de código acima representa o modelo de comunicação com a API utilizado, o
mesmo inicia-se solicitando as credenciais para a conexão com a API, seguindo da função
principal responsável por gerar a análise de IA.<br
- **função gerarAnaliseIa:** A função responsável por gerar a análise inicia-se efetuando as
devidas validações, verificando se os dados estão em formato de array, e verificando a integridade dos objetos dentro do array, em seguida contém a const prompt, onde o sistema interage
diretamente com a IA, então é necessário indicar os dados que a IA deve analisar, descrever para
a IA de que forma ela deve analisar, indicando que tipo de avaliação deve ser feita, e também
que tipo de resposta se espera, sendo inclusive necessário indicar o formato de resposta que se
espera, podendo indicar exemplos.<br>
- **Chamada da API:** A comunicação com o serviço externo é estabelecida por meio de uma
requisição do tipo HTTP POST. A principal característica desta requisição reside na sua seção
de mensagens (messages), que é essencial para definir e controlar o comportamento e as regras
de output da IA.<br>
- **Instrução User:** O prompt de usuário detalha as exigências da aplicação: identificar correlações não óbvias, propor sugestões de substituição que mantenham a paridade nutricional e
sumarizar o padrão predominante, como intolerância a um macronutriente ou padrão de horário
no campo.<br>
- **Instrução System:** Esta é a seção de controle do formato. Utilizando linguagem imperativa,
o módulo impõe regras estritas à IA: o retorno deve ser EXCLUSIVAMENTE o objeto JSON
puro, sem qualquer texto introdutório, markdown ou explicações. Além disso, garante que
o array insights seja preenchido com objetos que contenham as chaves obrigatórias titulo e
descricao, resolvendo problemas de output vazio.<br>
- **decodificação:** A string de resposta da IA é extraída e submetida à função JSON.parse().
Este processo tenta converter o texto bruto em um objeto JavaScript consumível.

### Coordenação de dados:

O arquivo analiseMiddleware.js desempenha o papel de coordenar os dados, atuando como
um intermediário entre os dados que entram e a IA.

```Node.js
const geraInsights = async () => {
    const dados = await getAnaliseFeedback(); 

    const alimentosComAlertas = dados.map(item => {
        let alerta = '';
        if (item.qtd > 0) {
            const proporcaoNegativo = item.negativos / item.qtd;
            alerta = proporcaoNegativo > 0.6
                ? 'muitos feedbacks negativos'
                : 'geralmente bem aceito';
        } else {
            alerta = 'sem dados suficientes';
        }
        return { ...item, alerta };
    });
    const objetoAnaliseIa = await gerarAnaliseIa(alimentosComAlertas); 
    return objetoAnaliseIa; 
};
```
- **função geraInsights()** é a função principal deste módulo e pode ser vista a partir do seu
fluxo de chamadas:<br>
É chamada a função getAnaliseFeedback para obter os dados agregados dos alimentos,
como contagem total de vezes em que um determinado alimento aparece, quantas vezes ele está
associado a um feedback positivo e quantas vezes está associado a um feedback negativo.
Enriquecimento dos dados para facilitar a aplicação à IA: Após ser obtido os dados
agregados dos alimentos, é utilizado um map nos mesmos para adicionar a chave ’alerta’ em
cada registro. O algoritmo verifica a proporção de feedbacks negativos em relação ao total. Se
essa proporção for superior a 60%, o alimento recebe um alerta de "muitos feedbacks negativos".
Caso contrário, é classificado como "geralmente bem aceito", esta verificação de proporção de
feedbacks auxilia a IA a efetuar uma avaliação com precisão.<br>
- **Chamada do servico de IA:** O array criado no enriquecimento de dados (alimentosComAlertas) é então passado como argumento para a função gerarAnaliseIa, por fim, o módulo retorna
o objeto de análise ou de erro recebido do serviço de IA, permitindo o envio da resposta para o
front-end para que o usuário possa visualizar o retorno no component Vue iaFeedbacks.vue.






