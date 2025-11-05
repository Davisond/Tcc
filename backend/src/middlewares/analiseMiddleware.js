const { getAnaliseFeedback } = require('../models/analiseModel');
const { gerarAnaliseIa } = require('../services/iaService');

const geraInsights = async () => {
  const dados = await getAnaliseFeedback();


    console.log('---------[analiseMiddleware] dados recebidos do model:', JSON.stringify(dados, null, 2));



  // Monta alertas básicos antes de mandar pra IA
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



    console.log('------- [analiseMiddleware] alimentosComAlertas:', JSON.stringify(alimentosComAlertas, null, 2));

  // Chama a IA uma única vez com todos os alimentos
  const analiseIa = await gerarAnaliseIa(alimentosComAlertas);

  // Retorna todos os dados com o texto da IA
  return {
    alimentos: alimentosComAlertas,
    insightIa: analiseIa
  };
};

module.exports = { geraInsights };
