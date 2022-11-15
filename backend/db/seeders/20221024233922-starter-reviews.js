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
   return queryInterface.bulkInsert('Reviews', [
    {
      spotId: 1,
      userId: 2,
      review: 'Mediocre. Very Loud',
      stars: 3
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Very loud but host is very pleasant',
      stars: 3.5
    },
    {
      spotId: 2,
      userId: 3,
      review: 'Amazing spot!',
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: 'Great place!',
      stars: 5
    },
    {
      spotId: 3,
      userId: 1,
      review: 'Was alright - got what I wanted',
      stars: 4
    },
    {
      spotId: 5,
      userId: 1,
      review: 'No Heater. Very cold',
      stars: 2
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: {[Op.in]: ['this is just a test']}
    })
  }
};
