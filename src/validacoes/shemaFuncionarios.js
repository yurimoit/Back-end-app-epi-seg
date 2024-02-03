const joi = require('joi')

const schemaFuncionario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
    }),

    cargo: joi.string().required().messages({
        'any.required': 'O campo cargo é obrigatório',
        'string.empty': 'O campo cargo é obrigatório',
    }),

    cpf: joi.string().length(11).required().messages({
        'string.empty': 'O campo cpf é obrigatório',
        'any.required': 'O campo cpf é obrigatório',
        'string.length': 'O cpf precisa conter, no mínimo, 11 digitos!',
    }),

    telefone: joi.string().length(11).required().messages({
        'string.empty': 'O campo telefone é obrigatório',
        'any.required': 'O campo telefono é obrigatório',
        'string.length': 'O telefone precisa conter 11 digitos!',
    }),


    categoria: joi.array().required().messages({
        'array.empty': 'O campo categoria é obrigatório',
        'any.required': 'O campo categoria é obrigatório',
    }),

    usuario_id: joi.number().allow('').positive().messages({
        'number.positive': 'O campo id precisa ser um número positivo',
        'number.base': 'O campo id precisa ser um número',
    })

});

const schemaAtualizarFuncionario = joi.object({
    nome: joi.string().allow('').max(255).messages({
        'string.max': 'O telefone precisa conter, no maximo, 255 caracteres',
    }),

    cargo: joi.string().allow('').messages({
        'string.empty': 'O campo cargo precisa ter um formato válido',
    }),

    cpf: joi.string().length(11).allow('').messages({
        'string.length': 'O cpf precisa conter, no mínimo, 11 digitos!',
    }),

    telefone: joi.string().length(11).allow('').messages({
        'string.length': 'O telefone precisa conter 11 digitos!',
    }),

    categoria: joi.array().allow('').messages({
        'array.empty': 'O campo categoria é obrigatório',
        'any.required': 'O campo categoria é obrigatório',
    }),

    usuario_id: joi.number().allow('').positive().messages({
        'number.positive': 'O campo id precisa ser um número positivo',
        'number.base': 'O campo id precisa ser um número',
    })

})

module.exports = {
    schemaAtualizarFuncionario,
    schemaFuncionario
};