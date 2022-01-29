const router = require('express').Router();
const Service = require('../services/transacaoService');

router.post('/transacoes', async (req, res) => {
  // O CPF de quem faz o deposito eu consigo pelo Token,
  // pois quem está enviando dinheiro é quem esta logado na conta// acabou de criar  a conta
  const cpfDoEmissor = req.tokenInfo;
  // O CPF do destinatario é passado pelo corpo da requisição.
  // O emissor decide para quem ele quer enviar o dinheiro.
  const cpfDoDestinatario = req.body.cpf;
  const { valor } = req.body;
  const transacao = await Service.realizarTransaçao(cpfDoEmissor, cpfDoDestinatario, valor);
});

module.exports = router;