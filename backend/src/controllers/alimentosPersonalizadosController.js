const alimentosPersonalizadosModel = require('../models/alimentosPersonalizadosModel');


//POST
const criarAlimentoPersonalizado = async (req, res) => {
    try {
        const novoAlimento = await alimentosPersonalizadosModel.criarAlimentoPersonalizado(req.body);
        res.status(201).json(novoAlimento);
    } catch (error) {
        console.error("ERRO criarAlimentoPersonalizado:", error); 
        res.status(500).json({ message: 'Erro ao criar alimento personalizado', error: error.message });
    }
};

//GET
const listarAlimentosPersonalizados = async (req, res) => {
    try {
        const alimentos = await alimentosPersonalizadosModel.listarAlimentosPersonalizados();
        res.status(200).json(alimentos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar alimentos personalizados', error: error.message });
    }
};


//PUT
const atualizarAlimentoPersonalizado = async (req, res) => {
    try {
        const { id } = req.params;
        const alimentoAtualizado = await alimentosPersonalizadosModel.atualizarAlimentoPersonalizado(id, req.body);
        res.status(200).json(alimentoAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar alimento personalizado', error: error.message });
    }
};


//DELETE
const deletarAlimentoPersonalizado = async (req, res) => {
    try {
        const { id } = req.params;
        await alimentosPersonalizadosModel.deletarAlimentoPersonalizado(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar alimento personalizado', error: error.message });
    }
};

module.exports = {
    criarAlimentoPersonalizado,
    listarAlimentosPersonalizados,
    atualizarAlimentoPersonalizado,
    deletarAlimentoPersonalizado,
};
