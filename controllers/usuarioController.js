const router = require('express').Router();
const Service = require('../services/usuarioService');

router.post('/usuario', async (req, res) => {
  const {nome, cpf} = req.body;
  const novoUsuario = await Service.findOrCreate(nome, cpf);
  res.status(200).json({novoUsuario});
});

router.get('/usuario', async (req, res) => {
  const { cpf } = req.body;
  const usuario = await Service.login(cpf);

  res.status(200).json({token: usuario})
})

module.exports = router