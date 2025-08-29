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
      userid: {
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
      userVibe: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      othersVibe: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      eventInterests: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      availability: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      purpose: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      bio: { type: Sequelize.TEXT, allowNull: true },
      profilePicture: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_bio');
  }
};