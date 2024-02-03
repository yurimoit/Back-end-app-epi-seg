const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJWT');
const knex = require('../conexao');

const verificarUsuario = async (req, res, next) => {
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, senhaJwt);
        const resultado = await knex('usuarios').where({ id }).first();

        if (!resultado) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }
        const { senha: _, ...usuarioLogado } = resultado
        req.usuario = usuarioLogado;

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: `${error}` })
    }
}

module.exports = verificarUsuario;