//pega os dados do banco, coloca mensagem de alerta onde feedback for negativo, coloca a IA p trabalhar nisso.

const { getAnaliseFeedback } = require('../models/analiseModel'); //pega os dados do banco
const { gerarAnaliseIa } = require('../services/iaService'); //importa a função que comunica com a IA

const geraInsights = async () => {
    const dados = await getAnaliseFeedback(); //Obtém o array de alimentos já agregados por feedback do banco de dados (via analiseModel.js).

    console.log('[analiseMiddleware] dados recebidos do analiseModel:', JSON.stringify(dados, null, 2));

    // Montar alertas básicos antes de mandar pra IA
    const alimentosComAlertas = dados.map(item => { //Itera sobre os dados do banco e adiciona uma nova chave (alerta) baseada na proporção de feedbacks negativos. Isso fornece contexto adicional p a IA.
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

    console.log('------- [analiseMiddleware] alimentosComAlertas:', JSON.stringify(alimentosComAlertas, null, 2));

    // Chama a IA e recebe o OBJETO JSON ou um OBJETO DE ERRO
    const objetoAnaliseIa = await gerarAnaliseIa(alimentosComAlertas); //Chama a IA: Passa os dados enriquecidos com alerta para o iaService. Espera de volta o objeto JSON da análise ou o objeto de erro.

    // Retorna o objeto (que o iaFeedbacks.vue vai consumir)
    return objetoAnaliseIa; // Retorna o objeto (análise ou erro) diretamente para o controlador, que por sua vez enviará como resposta HTTP para o frontend.
};

module.exports = { geraInsights };