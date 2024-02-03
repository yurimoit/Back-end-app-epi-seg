const joi = require("joi");

const schemaUsuario = joi.object({
  nome: joi.string().required().max(255).messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    'string.max': 'O campo nome suporta ate 255 caracteres!'
  }),

  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  senha: joi.string().required().min(8).messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.min": "A senha deve ter pelo menos 8 caracteres",
  }),

  cpf: joi.string().min(11).max(11).messages({
    'string.min': 'O cpf precisa conter, no mínimo, 11 digitos, sem pontuação!',
    'string.max': 'O cpf precisa conter, no mínimo, 11 digitos, sem pontuação!',
  }),

  telefone: joi.string().min(11).max(11).messages({
    'string.min': 'O telefone precisa conter 11 digitos, sem pontuação!',
    'string.max': 'O telefone precisa conter 11 digitos, sem pontuação!',
  }),

});

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
  }),
});

const schemaUpdateUsuario = joi.object({
  nome: joi.string().max(255).required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    'string.max': 'O cpf precisa conter, no mínimo, 255 digitos com pontuação',
  }),

  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.email": "O campo email precisa ter um formato válido",
  }),

  novaSenha: joi.allow(''),

  cpf: joi.string().allow('').length(11).messages({
    'string.length': 'O campo CPF deve ter exatamente 11 caracteres',
  }),

  telefone: joi.string().allow('').length(11).messages({
    'string.length': 'O campo Telefone deve ter exatamente 11 caracteres',
  })
});

module.exports = { schemaUsuario, schemaLogin, schemaUpdateUsuario };
