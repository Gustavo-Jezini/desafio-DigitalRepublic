const { Transacao, Usuario } = require('../models');

const encontrarUsuarios = async (cpfDoEmissor, cpfDoDestinatario) => {

  const emissor = await Usuario.findOne({ where: { cpf: cpfDoEmissor } });
  const destinatario = await Usuario.findOne({ where: { cpf: cpfDoDestinatario } });
  
  return {
    id_emissor: emissor.id,
    id_destinatario: destinatario.id,
  }
};

const realizarTransaçao = async (cpfDoEmissor, cpfDoDestinatario, valor) => {
  const { id_emissor, id_destinatario } = await encontrarUsuarios(cpfDoEmissor, cpfDoDestinatario);
  const teste = await attContaDestinatário(valor, cpfDoDestinatario);
  const teste2 = await attContaEmissor(valor, cpfDoEmissor);
  const data = new Date();

  const registrarTransacao = await Transacao.create({
    id_emissor,
    id_destinatario,
    valor,
    data,
  });

  return registrarTransacao;
};

const attContaDestinatário = async (valor, cpfDoDestinatario) => {
  await Usuario.increment({saldo: valor}, { where: { cpf: cpfDoDestinatario }})
};

const attContaEmissor = async (valor, cpfDoEmissor) => {
  const saldoAntes = await Usuario.findOne({ cpfDoEmissor });
  console.log(saldoAntes.dataValues);
  const decrementValue = (0 - valor)
  console.log(decrementValue);
  await Usuario.decrement('saldo',{ by: decrementValue, where: { cpf: cpfDoEmissor }})

  const saldoDepois = await Usuario.findOne({ cpfDoEmissor });
  console.log(saldoDepois.dataValues);
};

module.exports = {
  realizarTransaçao,
}