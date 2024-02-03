require('dotenv').config()
const express = require('express')
const rotas = require('./rotas');
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())

app.use(rotas)


// const port = process.env.PORT || 8000

app.listen(3000, () => {
    console.log(`Servidor iniciado na porta:${3000}`);
})
