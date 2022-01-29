const checkCPF = (cpf) => {
  if (!cpf || cpf.length !== 11) return null;

  // função adaptada do site https://www.devmedia.com.br/validar-cpf-com-javascript/23916
  // let Soma;
  // let Resto;
  // Soma = 0;
  // if (cpf == "00000000000") return false;

  // for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  // Resto = (Soma * 10) % 11;

  // if ((Resto == 10) || (Resto == 11))  Resto = 0;
  // if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

  // Soma = 0;
  //   for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
  //   Resto = (Soma * 10) % 11;

  // if ((Resto == 10) || (Resto == 11))  Resto = 0;
  // if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
  return true;
};

const validation = (cpf, nome) => {
  if (!cpf || cpf === '') return { mensagem: 'É necessario informar um CPF'};
  if (!nome || nome === '') return { mensagem: 'É necessario informar um nome'};
   return true;
 };
 


const isValidInfo = (req, res, next) => {
  const { cpf, nome } = req.body;
  const isValidCpf = checkCPF(cpf)
  const isValid = validation(cpf, nome);
 
  if (isValid.mensagem) return res.status(401).json({erro: isValid.mensagem});
  if (isValidCpf === null) return res.status(401).json({ erro: 'Envie somente os números de um CPF válido!!!' });
  if (isValidCpf === false) return res.status(401).json({ erro: 'CPF inválido' });

  next();
}

module.exports = {
  isValidInfo,
}