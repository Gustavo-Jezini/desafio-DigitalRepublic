const router = require('express').Router();
const Service = require('../services/usuarioService');

router.post('/usuario', async (req, res) => {
  const {nome, cpf} = req.body;
  const novoUsuario = await Service.findOrCreate(nome, cpf);
  console.log('passou por aqui');
  res.status(200).json({novoUsuario});
})

module.exports = router