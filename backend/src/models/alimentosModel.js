const connection = require('./connection');

    //ALIMENTO
//GET
const getAlimentos =  async () => {
    const alimentos = await connection.execute('SELECT * FROM alimentos');
    return alimentos;
};
//POST
const criarAlimento = async (alimento) => {
    const { nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade} = alimento;
    const query = 'INSERT INTO alimentos(nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade) VALUES (?,?,?,?,?,?,?)';
    const [alimentoCriado] = await connection.execute(query, [nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade]);
    return alimentoCriado;
}   
//PUT
const atualizarAlimento = async (id, alimento) => {
        const { nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade} = alimento;
        const query = 'UPDATE alimentos SET nome = ?, carbohidrato = ?, proteina = ?, gordura = ?, caloria = ?, porcao = ?, quantidade = ? WHERE id = ?';
        const alimentoAtualizado = await connection.execute(query, [ nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade, id]);
        return alimentoAtualizado;
}
//DELETE
const deletarAlimento = async (id) => {
    const alimentoDeletado = await connection.execute('DELETE FROM alimentos WHERE id = ?', [id]);
    return alimentoDeletado; 
}
    //USUARIO
//GET
const getUsuarios = async () => {
    const usuarios = await connection.execute('SELECT * FROM usuario');
    return usuarios;
//GET ID





//POST
};
const criarUsuario = async (usuario) => {
    const {nome, email, senha, idade, sexo, peso, altura, objetivo} = usuario;
    const query = 'INSERT INTO usuario(nome, email, senha, idade, sexo, peso, altura, objetivo) VALUES (?,?,?,?,?,?,?,?)';
    const [usuarioCriado] = await connection.execute(query, [nome, email, senha, idade, sexo, peso, altura, objetivo]);
    return usuarioCriado;
};   
//PUT
const atualizarUsuario = async (id, usuario) => {
        const {nome, email, senha, idade, sexo, peso, altura, objetivo} = usuario;
        const query = 'UPDATE usuario SET nome = ?, email = ?, senha = ?, idade = ?, sexo = ?, peso = ?, altura = ?, objetivo = ? WHERE id = ?';
        const usuarioAtualizado = await connection.execute(query, [ nome, email, senha, idade, sexo, peso, altura, objetivo, id]);
        return usuarioAtualizado;
}
//DELETE




module.exports = {
    getAlimentos, criarAlimento, atualizarAlimento, deletarAlimento,
    getUsuarios, criarUsuario, atualizarUsuario

};