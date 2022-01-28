'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Transações',
    [
      {
        id_emissor: 1,
        id_destinatario: 2,
        data: Sequelize.literal('CURRENT_TIMESTAMP'),
        valor: 100.00,
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Transações', null, {}),
};