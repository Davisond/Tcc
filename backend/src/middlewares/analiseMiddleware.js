const { getAnaliseFeedback } = require('../models/analiseModel')

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
        insights.push({
            ...item,
            alerta: alerta
        });
    }
    return insights;
};