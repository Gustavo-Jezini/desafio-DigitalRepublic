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
  console.log(transacao);
  if (transacao.mensagem) return res.status(401).json(transacao)

  res.status(200).json(transacao)
});

// router.get('/transacoes', async (req, res) => {
//   const todasTransacoes = await Service.todasTransacoes();

//   return res.status(200).json({ transacoes: todasTransacoes });
// })

module.exports = router;