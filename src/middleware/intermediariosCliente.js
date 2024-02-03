const { date } = require('joi');
const knex = require('../conexao');

const verificaExistenciaCpfOuEmail = async (req, res, next) => {
    const { cpf, email } = req.body;

    try {
        const verificaExistenciaEmail = await knex('clientes').where({ email });

        if (verificaExistenciaEmail.length >= 1) {
            return res.status(400).json({ mensagem: "Email de cliente já cadastrado!" });
        }
        const verificaExistenciaCpf = await knex('clientes').where({ cpf });

        if (verificaExistenciaCpf.length >= 1) {
            return res.status(400).json({ mensagem: "Cpf de cliente já cadastrado!" });
        }

        next();

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

const verificarData = async (req, res, next) => {
    const { vencimento, status_cobrancas } = req.body;
    const { id: cliente_id } = req.params;

    try {
        if (status_cobrancas === 'true') {
            req.statusData = "Paga"
            next()
            return;
        }

        const dataAtual = new Date();

        let DataVencimento = vencimento.trim().split("-");

        let ano = Number(DataVencimento[0]);

        let mes = Number(DataVencimento[1]) - 1;

        let dia = Number(DataVencimento[2]);

        DataVencimento = new Date(ano, mes, dia);

        if (+DataVencimento > +dataAtual) {
            req.statusData = 'Pendente'
        } else if (+DataVencimento < +dataAtual) {
            req.statusData = "Vencida";
            const cliente = await knex('clientes').where({ 'id': cliente_id }).update({ 'status': "Inadimplente" });
        }

        next()

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {
    verificaExistenciaCpfOuEmail,
    verificarData
}