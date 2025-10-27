const { getAnaliseFeedback } = require('../models/analiseModel')
const { gerarAnaliseIa } = require('../services/iaService')



const geraInsights = async () => {
    const dados = await getAnaliseFeedback();

    const insights = [];

    for (let i = 0; i < dados.length; i++){
        const item = dados[i];
        let alerta = "";

        if (item.qtd > 0) {
            const proporcaoNegativo = item.negativos/item.qtd;
            if (proporcaoNegativo > 0.6) {
                alerta = "muitos feedbacks negativos";
            } else {
                alerta = "geralmente bem aceito";
            }
        } else {
            alerta = "sem dados suficientes";
        }

        const analiseIa = await gerarAnaliseIa(item);


        insights.push({
            ...item,
            alerta: alerta,
            analiseIa
        });
    }
    return insights;
};

module.exports = { geraInsights };