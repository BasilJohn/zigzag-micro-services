'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_bio', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      birthday: { type: Sequelize.DATEONLY, allowNull: true },
      showBirthday: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      pronouns: { type: Sequelize.STRING, allowNull: true },
      showPronouns: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      vibe: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      vibeWith: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      interests: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      availability: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      whyHere: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      bio: { type: Sequelize.TEXT, allowNull: true },
      photos: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_bio');
  }
};