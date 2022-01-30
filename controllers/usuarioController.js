const router = require('express').Router();
const Service = require('../services/usuarioService');

router.post('/usuario', async (req, res) => {
  const {nome, cpf} = req.body;
  const novoUsuario = await Service.findOrCreate(nome, cpf);

  if (!novoUsuario) return res.status(401).json({ mensagem: 'CPF já cadastrado' });

  res.status(200).json({novoUsuario});
});

router.get('/usuario', async (req, res) => {
  const { cpf } = req.body;
  const usuario = await Service.login(cpf);

  if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

  res.status(200).json({token: usuario})
})

module.exports = router