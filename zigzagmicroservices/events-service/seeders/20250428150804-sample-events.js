'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('events', [
      {
        title: 'Summer Fest 2025',
        shortDescription: 'A fun summer gathering!',
        longDescription: 'Join us for an amazing summer festival with music, food, and games.',
        tagline: 'Let’s make memories!',
        address1: '123 Main Street',
        address2: 'Building 5',
        city: 'New York',
        postCode: '10001',
        country: 'USA',
        latitude: '40.7128',
        longitude: '-74.0060',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Tech Conference 2025',
        shortDescription: 'Innovate and Inspire!',
        longDescription: 'The biggest tech conference featuring industry leaders and innovators.',
        tagline: 'Shape the Future',
        address1: '456 Innovation Road',
        address2: null,
        city: 'San Francisco',
        postCode: '94105',
        country: 'USA',
        latitude: '37.7749',
        longitude: '-122.4194',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {});
  }
};