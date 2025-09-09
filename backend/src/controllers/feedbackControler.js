const feedbackModel = require('../models/feedbackModel');

// GET 
const getFeedback = async (request, response) => {
    const feedback = await feedbackModel.getFeedback();
    return response.status(200).json(feedback);
};

// POST
const criarFeedback = async (request, response) => {
    const feedbackCriado = await feedbackModel.criarFeedback(request.body);
    return response.status(201).json(feedbackCriado);
};

// PUT
// const atualizarFeedback = async (request, response) => {
//     const { id } = request.params;
//     const feedbackAtualizado = await feedbackModel.atualizarFeedback(id, request.body);
//     return response.status(204).json(feedbackAtualizado);
// };

// // DELETE
// const deletarFeedback = async (request, response) => {
//     const { id } = request.params;
//     const feedbackDeletado = await feedbackModel.deletarFeedback(id);
//     return response.status(202).json(feedbackDeletado);
// };

module.exports = {
    getFeedback,
    criarFeedback,
    // atualizarFeedback,
    // deletarFeedback
};
