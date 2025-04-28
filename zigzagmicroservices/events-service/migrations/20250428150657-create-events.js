'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      shortDescription: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      longDescription: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tagline: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      address1: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      address2: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      postCode: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      latitude: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      longitude: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};