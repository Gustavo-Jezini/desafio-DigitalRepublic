const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const usuarioRotas = require('./controllers/usuarioController');
const transacoesRotas = require('./controllers/transacaoController');
const { isValidInfo } = require('./middlewares/usuarioMiddlewares');
const verifyToken = require('./authorization/verifyToken');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Ok!');
})

app.use('/', verifyToken ,isValidInfo, usuarioRotas)

app.use('/', transacoesRotas)

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));