const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredinho123';

const findOrCreate = async (nome, cpf) => {
  const date = new Date();
  const [usuario, created] = await Usuario.findOrCreate({
    where: { cpf },
    defaults: {
      nome, 
      cpf, 
      saldo: 1000.94, 
      conta: 'usuario',
      atualizado: date,
    },
  });
  // retorna null caso ja exista um usuario com esse cpf
  if (!created) {
    return null;
  };

  // cria token de autenticaçao
  const token =  jwt.sign({
    payload: { cpf },
  },
  JWT_SECRET
  );

  return {usuario, token};
};

module.exports = {
  findOrCreate,
}