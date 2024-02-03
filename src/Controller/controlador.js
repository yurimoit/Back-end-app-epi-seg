const knex = require("../conexao");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const senhaJWT = require("../senhaJWT");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const usuario = { nome, email, senha: senhaCriptografada };
        const novoUsuario = await knex("usuarios").insert(usuario).returning("*");

        console.log(novoUsuario);

        // if (!novoUsuario) {
        //     return res.status(404).json({ mensagem: "Usuario não cadastrado!" })
        // }

        return res.status(201).json({ mensagem: "Usuário Cadastrado" });
    } catch (error) {
        return res.status(500).json({ error: "erro no servidor" });
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;


    try {
        const usuario = await knex("usuarios").where({ "email": email }).first();

        if (!usuario) {
            return res.status(404).json({ mensagem: "Email ou Senha inválido" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(404).json({ mensagem: "Email ou Senha inválido" });
        }

        const token = jwt.sign({ id: usuario.id }, senhaJWT, {
            expiresIn: "8h",
        });

        const { senha: _, ...usuarioLogado } = usuario;

        return res.status(200).json({ usuario: usuarioLogado, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "erro no servidor" });
    }
}

const atualizarUsuario = async (req, res) => {
    const { id, nome: nomeUsuario, email: emailUsuario, cpf: cpfUsuario, telefone: telefoneUsuario } = req.usuario;
    const { nome, email, novaSenha, cpf, telefone } = req.body;

    try {

        if (novaSenha) {
            const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
            const usuarioAtualizado = {
                nome: nome ? nome : nomeUsuario,
                email: email ? email : emailUsuario,
                senha: senhaCriptografada,
                cpf: cpf ? cpf : cpfUsuario,
                telefone: telefone ? telefone : telefoneUsuario
            }

            const id_usuario = Number(id);
            const atualizacao = await knex("usuarios").where({ id: id_usuario }).update(usuarioAtualizado).returning("*");

            return res.status(200).json(atualizacao);

        } else {
            const usuarioAtualizado = {
                nome: nome ? nome : nomeUsuario,
                email: email ? email : emailUsuario,
                cpf: cpf ? cpf : cpfUsuario,
                telefone: telefone ? telefone : telefoneUsuario
            }

            const id_usuario = Number(id);
            const atualizacao = await knex("usuarios").where({ id: id_usuario }).update(usuarioAtualizado).returning("*");

            return res.status(200).json({ mensagem: "Atualizacão concluida!!!" });
        }

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor!" });
    }
}

const obterUsuario = async (req, res) => {
    return res.status(200).json(req.usuario);
}

const cadastrarFuncionarios = async (req, res) => {
    const { nome, cargo, cpf, telefone, categoria } = req.body
    const { id: usuario_id } = req.usuario

    try {
        if (!nome || !cargo || !cpf || !telefone || !categoria) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatorios!!" })
        }
        const funcionario = { ...req.body, usuario_id }
        const cadastrar = await knex('funcionarios').insert(funcionario).returning('*')


        if (cadastrar.length < 1) {
            return res.status(400).json({ mensagem: "Não foi possivel cadastrar funcionario!" })
        }

        return res.status(201).json({ mensagem: "Cadastro efetuado com sucesso!!!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor!" });
    }
}

const obterListagemFuncionarios = async (req, res) => {
    const { id: usuario_id } = req.usuario

    try {
        const listaFuncionarios = await knex('funcionarios').where({ usuario_id })

        if (listaFuncionarios.length < 1) {
            return res.status(400).json({ mensagem: 'Error ao gera da lista' })
        }

        return res.status(200).json(listaFuncionarios.reverse())
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor!" });
    }
}


const atualizacaoFuncionario = async (req, res) => {
    const { id: funcionario_id } = req.params;

    const atualizacaoDadosfuncionario = {}

    for (let campo in req.body) {
        if (req.body[`${campo}`] !== "") {
            atualizacaoDadosfuncionario[`${campo}`] = req.body[`${campo}`]
        }
    }

    try {
        if (!atualizacaoDadosfuncionario) {
            return res.status(400).json({ mensagem: "Preencha ao menos um campo!" });
        }

        const id_funcionario = Number(funcionario_id);
        const atualizacao = await knex("funcionarios")
            .where({ id: id_funcionario })
            .update(atualizacaoDadosfuncionario)
            .returning("*");


        if (atualizacao.length === 0) {
            return res.status(404).json({ mensagem: "Funcionario não encontrado." });
        }

        return res.status(201).json({ mensagem: 'Cadastro atualizado!!!' });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor!" });
    }
}

const deletarCadastroFuncionario = async (req, res) => {
    const { id: funcionario_id } = req.params

    try {
        const excluirFuncionario = await knex('funcionarios').where({ id: Number(funcionario_id) }).delete().returning('*')


        if (excluirFuncionario.length < 1) {
            return res.status(400).json({ mensagem: "Não foi possivel excluir funcionario" })
        }

        return res.status(200).json({ mensagem: "Funcionario excluido!!!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor!" });
    }
}


const deletarCadastroUsuraio = async (req, res) => {
    const { id: usuario_id, email } = req.usuario
    const { senha } = req.query


    try {
        const usuario = await knex("usuarios").where({ "email": email }).first();

        if (!usuario) {
            return res.status(404).json({ mensagem: "Email ou Senha inválido" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(404).json({ mensagem: "Email ou Senha inválido" });
        }
        const excluirDadosTabelaFuncionario = await knex('funcionarios').where({ usuario_id: Number(usuario_id) }).delete()
        const excluirUsuario = await knex('usuarios').where({ id: Number(usuario_id) }).delete().returning('*')


        if (excluirUsuario.length < 1) {
            return res.status(400).json({ mensagem: "Não foi possivel excluir usuario" })
        }

        return res.status(200).json({ mensagem: "Usuario excluido!!!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor!" });
    }
}


const buscarFuncionarios = async (req, res) => {
    const { id } = req.usuario;
    const { busca } = req.query;

    try {
        let funcionarios;

        const query = knex("funcionarios").where("usuario_id", id);

        if (busca) {
            query.andWhere((builder) => {
                builder
                    .where("nome", "ilike", `%${busca}%`)
                    .orWhere("cpf", "ilike", `%${busca}%`)
                    .orWhere("cargo", "ilike", `%${busca}%`);
            });
        }


        funcionarios = await query;

        if (funcionarios.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum resultado encontrado." });
        }

        return res.status(200).json(funcionarios.reverse());
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor!" });
    }
};


module.exports = {
    cadastrarUsuario,
    login,
    atualizarUsuario,
    cadastrarFuncionarios,
    obterListagemFuncionarios,
    atualizacaoFuncionario,
    deletarCadastroFuncionario,
    buscarFuncionarios,
    deletarCadastroUsuraio,
    obterUsuario
}