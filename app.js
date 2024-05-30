require('dotenv').config();

const port = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const itemRoutes = require('./controllers');
const db = require('./data/db');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

app.use('/api', itemRoutes); // Use '/api' como prefixo para todas as rotas da API

app.get('/', (req, res) => {
    res.send('Bem vindo! api')
});

app.listen(port, () => {
    console.log(`servidor rodando na ${port}`);
});