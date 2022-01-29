const { Transacao, Usuario } = require('../models');

const encontrarUsuarios = async (cpfDoEmissor, cpfDoDestinatario) => {

  const emissor = await Usuario.findOne({ where: { cpf: cpfDoEmissor } });
  const destinatario = await Usuario.findOne({ where: { cpf: cpfDoDestinatario } });
  
  return {
    id_emissor: emissor.id,
    id_destinatario: destinatario.id,
  }
};

const attContaDestinatário = async (valor, cpfDoDestinatario) => {
  await Usuario.increment(
    {
      saldo: valor
    },
    { where: { cpf: cpfDoDestinatario }})
};

const attContaEmissor = async (valor, cpfDoEmissor) => {
  await Usuario.decrement(
    {
      saldo: valor
    },
    {where: { cpf: cpfDoEmissor } })
};

const realizarTransaçao = async (cpfDoEmissor, cpfDoDestinatario, valor) => {
  const { id_emissor, id_destinatario } = await encontrarUsuarios(cpfDoEmissor, cpfDoDestinatario);
  await attContaDestinatário(valor, cpfDoDestinatario);
  await attContaEmissor(valor, cpfDoEmissor);
  const data = new Date();

  const registrarTransacao = await Transacao.create({
    id_emissor,
    id_destinatario,
    valor,
    data,
  });

  return registrarTransacao;
};

// const todasTransacoes = async () => {
//   const transacoes = await Transacao.findAll();

//   return transacoes;
// }

module.exports = {
  realizarTransaçao,
  // todasTransacoes,
}