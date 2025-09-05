'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_bio', [
      {
        userId: 1,  // Make sure this userId exists in your 'users' table
        birthday: '1995-06-15',
        showBirthday: true,
        pronouns: 'he/him',
        showPronouns: true,
        vibe: ['chill', 'adventurous'],
        vibeWith: ['kind', 'funny'],
        interests: ['coding', 'gaming', 'hiking'],
        availability: ['weekends', 'evenings'],
        whyHere: ['networking', 'friendship'],
        bio: 'Just a developer who loves coffee and mountains!',
        photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 2,
        birthday: '1990-02-10',
        showBirthday: false,
        pronouns: 'she/her',
        showPronouns: false,
        vibe: ['energetic', 'calm'],
        vibeWith: ['smart', 'fun'],
        interests: ['art', 'travel', 'music'],
        availability: ['mornings'],
        whyHere: ['business', 'collaboration'],
        bio: 'Artist exploring the beauty of everyday moments.',
        photos: ['https://example.com/photo3.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_bio', null, {});
  }
};