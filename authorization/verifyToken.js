const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredinho123';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token inválido' });

  const token = authorization;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: 'Token inválido ou expirado'})
    const { cpf } = decoded.payload;
    req.tokenInfo = cpf;
    next();
  });
};

module.exports = verifyToken;