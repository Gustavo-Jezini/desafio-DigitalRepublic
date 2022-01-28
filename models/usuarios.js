module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: DataTypes.STRING,
      cpf: DataTypes.STRING,
      saldo: DataTypes.DOUBLE,
      atualizado: DataTypes.DATE,
      conta: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Usuarios',
    });

  return Usuario;
};