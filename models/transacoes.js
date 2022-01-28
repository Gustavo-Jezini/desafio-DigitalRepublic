module.exports = (sequelize, DataTypes) => {
  const Transacao = sequelize.define('Transacao', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_emissor: DataTypes.INTEGER,
      id_destinatario: DataTypes.INTEGER,
      valor: DataTypes.DOUBLE,
      data: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: 'Transações',
    });

  return Transacao;
};