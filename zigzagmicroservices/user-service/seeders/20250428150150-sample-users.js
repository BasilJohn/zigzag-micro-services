'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Alice',
        username: 'alice1',
        email: 'alice@example.com',
        password: 'password1',
        accountType: 'personal',
        createdAt: new Date()
      },
      {
        name: 'Bob',
        username: 'bob2',
        email: 'bob@example.com',
        password: 'password2',
        accountType: 'business',
        createdAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};