'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Usuarios',
    [
      {
        nome: 'Leonardo',
        cpf: '46476676857',
        saldo: 15000.00,
        atualizado: Sequelize.literal('CURRENT_TIMESTAMP'),
        conta: 'usuario',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
      },
      {
        nome: 'JEduardo',
        cpf: '34336636798',
        saldo: 10000.00,
        atualizado: Sequelize.literal('CURRENT_TIMESTAMP'),
        conta: 'usuario',
      },
      {
        nome: 'Joao',
        cpf: '35364658212',
        saldo: 1000.00,
        atualizado: Sequelize.literal('CURRENT_TIMESTAMP'),
        conta: 'usuario',
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Usuarios', null, {}),
};