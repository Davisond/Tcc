const connection = require('./connection');

//GET
const getDias = async () => {
    const dias = await connection.execute('SELECT * FROM dia');
    return dias;
}

//GET BY ID
const getDiaById = async (idUsuario) => {
    const [getDia] = await connection.execute('SELECT * FROM dia WHERE idUsuario = ?', [idUsuario]);
    return getDia;
}
//POST
const criarDia = async (dia) => {
    const { data, idUsuario } = dia;
    const query = 'INSERT INTO * dia (data, idUsuario) VALUES (?,?)';
    const diaCriado = await connection.execute(query, [data, idUsuario]);
    return diaCriado;
}
//PUT 
const atualizaDia = async (dia, id) => {
    const { data } = dia;
    const query = 'UPDATE dia SET data = ? WHERE id = ?';
    const diaAtualizado = await connection.execute(query,[data, id]);
    return diaAtualizado;
}
//DELETE
    const deletaDia = async (id) => {
        const diaDeletado = await connection.execute('DELETE FROM dia WHERE dia = ?', [id]);
        return diaDeletado;

    }
module.exports = {
    getDias, getDiaById, criarDia, atualizaDia, deletaDia

};