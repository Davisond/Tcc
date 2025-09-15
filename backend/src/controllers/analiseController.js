const { gerarInsights } = require('../middlewares/analiseMiddleware');

const getFeedbackAnalise = async (req, res) => {
    try{
        const insights = await gerarInsights();
        res.json(insights);

    } catch (err) {
        console.error('erro em analiseController.js: ', err);
        res.status(500).json({erro: "erro na analise"});
    }
};

module.exports = { getFeedbackAnalise }