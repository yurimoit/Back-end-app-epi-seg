const validarCPF = (req, res, next) => {
    let { cpf } = req.body;

    try {

        if (!cpf) {
            return next()
        }

        cpf = cpf.replace(/[^\d]/g, '');


        if (cpf.length !== 11) {
            return res.status(400).json({ mensagem: "Cpf é invalido!" });
        }


        if (/^(\d)\1+$/.test(cpf)) {
            return res.status(400).json({ mensagem: "Cpf é invalido!" });
        }


        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digito1 = (resto === 10 || resto === 11) ? 0 : resto;

        if (digito1 !== parseInt(cpf.charAt(9))) {
            return res.status(400).json({ mensagem: "Cpf é invalido!" });
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digito2 = (resto === 10 || resto === 11) ? 0 : resto;

        if (digito2 !== parseInt(cpf.charAt(10))) {
            return res.status(400).json({ mensagem: "Cpf é invalido!" });
        }

        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

}


module.exports = validarCPF;
