const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const usuarioRotas = require('./controllers/usuarioController');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Ok!');
})

app.use('/', usuarioRotas)

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));