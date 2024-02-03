const knex = require("../conexao");

const verificarEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const verificaExistenciaEmail = await knex("usuarios").where({ email });

    if (verificaExistenciaEmail.length >= 1) {
      return res
        .status(400)
        .json({ mensagem: "Email de cliente já cadastrado!" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};


module.exports = {
  verificarEmail,
};
