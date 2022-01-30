const validation = (cpf, valor) => {
 if (!cpf || cpf === '') return { mensagem: 'É necessario informar um CPF'};
 if (!valor || valor === '') return { mensagem: 'É necessario informar um valor'};
 if (valor <= 0) return { mensagem: 'Impossível enviar valores negativos'};
 if (valor > 2000) return { mensagem: 'Por questões de seguranã, é proibido enviar valor maior que 2000'};
  return true;
};

const isValidBody = (req, res, next) => {
  const { cpf, valor } = req.body;

  const isValid = validation(cpf, valor);

  if (isValid.mensagem) return res.status(401).json({erro: isValid.mensagem});

  next();
}

module.exports = {
  isValidBody,
}