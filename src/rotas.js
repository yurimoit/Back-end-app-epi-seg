const express = require('express')
const verificarUsuario = require('./autenticacao/autorize');
const validarCorpoRequisicao = require("./middleware/validarCorpoRequisicao");
const { verificarEmail } = require("./middleware/intermediarioUsuario");

const {
    schemaUsuario,
    schemaLogin,
    schemaUpdateUsuario
} = require("./validacoes/shemaUsuario");

const {
    schemaFuncionario,
    schemaAtualizarFuncionario
} = require('./validacoes/shemaFuncionarios')

const {
    login,
    cadastrarUsuario,
    cadastrarFuncionarios,
    obterListagemFuncionarios,
    atualizacaoFuncionario,
    deletarCadastroFuncionario,
    buscarFuncionarios,
    obterUsuario,
    atualizarUsuario,
    deletarCadastroUsuraio
} = require('./Controller/controlador');

const validarCPF = require('./validacoes/validaCpf');

const rotas = express()

rotas.post(
    "/cadastrar/usuario",
    validarCorpoRequisicao(schemaUsuario),
    verificarEmail,
    cadastrarUsuario
);

rotas.get('/aqui', (req, res) => {
    res.json({ mensagem: 'Funcionando na porta 8000' })
})

rotas.post("/login", validarCorpoRequisicao(schemaLogin), login);

rotas.use(verificarUsuario)

rotas.post('/cadastrar/funcionario', validarCorpoRequisicao(schemaFuncionario), validarCPF, cadastrarFuncionarios)
rotas.post('/atualizar/funcionario/:id', validarCorpoRequisicao(schemaAtualizarFuncionario), validarCPF, atualizacaoFuncionario)
rotas.get('/listagem/funcionarios', obterListagemFuncionarios)
rotas.delete('/excluir/funcionario/:id', deletarCadastroFuncionario)
rotas.get('/buscar/funcionarios', buscarFuncionarios)



rotas.get('/buscar/usuario', obterUsuario)
rotas.post('/atualizar/usuario', validarCorpoRequisicao(schemaUpdateUsuario), validarCPF, atualizarUsuario)
rotas.delete('/excluir/usuario', deletarCadastroUsuraio)

module.exports = rotas;