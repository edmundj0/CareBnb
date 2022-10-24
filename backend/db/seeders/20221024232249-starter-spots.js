'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Spots', [
    {
      ownerId: 1,
      address: '1 Main St. test',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      lat: 37.77,
      lng: 122.4,
      name: 'Japantown suite',
      description: 'overpriced and bad quality',
      price: 200.20,
    },
    {
      ownerId: 1,
      address: '99 Wall Street test',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      lat: 40.71,
      lng: 74.0,
      name: 'Koreatown',
      description: 'also overpriced',
      price: 500.20,
    },
    {
      ownerId: 2,
      address: '50 Bull Street test',
      city: 'Austin',
      state: 'TX',
      country: 'United States',
      lat: 30.27,
      lng: 97.74,
      name: 'Campus',
      description: 'good views',
      price: 300.50,
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['1 Main St. test', '99 Wall Street test', '50 Bull Street test']}
    })
  }
};
