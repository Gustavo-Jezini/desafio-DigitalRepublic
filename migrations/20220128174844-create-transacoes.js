'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transações', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_emissor: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_destinatario: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      valor: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    { timestamp: false });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transações');
  }
};