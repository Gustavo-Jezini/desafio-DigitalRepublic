const router = require('express').Router();
const Service = require('../services/transacaoService');

router.post('/transacoes', async (req, res) => {
  const { cpf } = req.body;
  // const realizarTransaçao;
});

module.exports = router;