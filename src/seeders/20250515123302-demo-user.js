'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('User',
      [
        {
          email: 'abc@gmail.com',
          password: '123',
          username: 'ABC'
        },
        {
          email: 'EFG@gmail.com',
          password: '123',
          username: 'EFG'
        },
        {
          email: 'XYZ@gmail.com',
          password: '123',
          username: 'XYZ'
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
