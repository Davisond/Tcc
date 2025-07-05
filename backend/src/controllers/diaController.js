const diaController = require('../models/diaModel');

//GET
const getDias = async (request, response) => {
    const dias = await diaController.getDias();
    return response.status(200).json(dias);
};
//GET BY ID
const getDiaById = async (request, response) => {
    const { idUsuario } = request.params;
    const dia = await diaController.getDiaById(idUsuario);
    return response.status(200).json(dia)
}
//POST
const criarDia = async (request, response) => {
    const diaCriado = await diaController.criarDia(request.body);
    return response.status(201).json(diaCriado);
};
//PUT
const atualizaDia = async (request, response) => {
    const { id } = request.params;
    const diaAtualizado = await diaController.atualizaDia(id ,request.body);
    return response.status(204).json(diaAtualizado);
}

//DELETE
const deletaDia = async () => {
    const { id } = request.params;
    const diaDeletado = await diaController.deletaDia(id);
    return response.status(202).json(diaDeletado);
}


module.exports = {
    getDias, getDiaById, criarDia, atualizaDia, deletaDia

}