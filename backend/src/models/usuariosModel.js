const connection = require('./connection');

//GET
const getUsuarios = async () => {
    const usuarios = await connection.execute('SELECT * FROM usuario');
    return usuarios;
};

const getUsuarioById = async (id) => {
    const [getUsuarioById] = await connection.execute('SELECT * FROM usuario WHERE id = ?', [id]);
    return getUsuarioById;
}
//POST
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
const deletarUsuario = async (id) => {
    const usuarioDeletado = await connection.execute('DELETE FROM usuario WHERE id = ?', [id]);
    return usuarioDeletado; 
}

module.exports = {
    getUsuarios, getUsuarioById, criarUsuario, atualizarUsuario, deletarUsuario

};
