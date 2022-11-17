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
      address: '120 Glacier Rte 1 Road',
      city: 'West Glacier',
      state: 'MT',
      country: 'United States',
      lat: 48.54,
      lng: -113.96,
      name: 'Glacier National Park Cozy Spot',
      description: 'Come check out this amazing spot near the park!',
      price: 200.20,
    },
    {
      ownerId: 2,
      address: '3000 Mt. Angeles Road',
      city: 'Port Angeles',
      state: 'Washington',
      country: 'United States',
      lat: 48.10,
      lng: -123.43,
      name: 'Olympic National Park in Port Angeles',
      description: 'Great central location!',
      price: 500.20,
    },
    {
      ownerId: 2,
      address: '2367 Wandering Way',
      city: 'Sulphur',
      state: 'Oklahoma',
      country: 'United States',
      lat: 34.46,
      lng: -96.99,
      name: 'Chickasaw National Recreation Home',
      description: 'Good views at this newly remodeled location',
      price: 300.50,
    },
    {
      ownerId: 1,
      address: '760 Park Ave',
      city: 'Hot Springs',
      state: 'Arkansas',
      country: 'United States',
      lat: 34.53,
      lng: -93.05,
      name: 'Hot Springs National Park Cabin',
      description: 'Great spot close to attractions',
      price: 149.99,
    },
    {
      ownerId: 2,
      address: '77 Old Marina Road',
      city: 'Yellowstone',
      state: 'Wyoming',
      country: 'United States',
      lat: 44.40,
      lng: -110.56,
      name: 'Yellowstone House Near Water',
      description: 'Great spot to stay and observe wildlife',
      price: 209.95,
    },
    {
      ownerId: 4,
      address: '9006 Yosemite Lodge Drive',
      city: 'Yosemite',
      state: 'California',
      country: 'United States',
      lat: 37.74,
      lng: -119.60,
      name: 'Yosemite Cabin In Valley',
      description: 'Amazing Relaxing spot',
      price: 349.95,
    },
    {
      ownerId: 2,
      address: '11 Navajo Street',
      city: 'Grand Canyon Village',
      state: 'Arizona',
      country: 'United States',
      lat: 36.06,
      lng: -112.13,
      name: 'Grand Canyon Spot',
      description: 'Spot close to attractions with beautiful view',
      price: 119.97,
    },
    {
      ownerId: 4,
      address: '27500 E Timberline Road',
      city: 'Government Camp',
      state: 'Oregon',
      country: 'United States',
      lat: 45.33,
      lng: -121.71,
      name: 'Mt. Hood Relaxing Location',
      description: 'Home near Mt. Hood National Park',
      price: 190.00,
    }
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
