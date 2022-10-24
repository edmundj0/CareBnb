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
      review: 'this is just a test',
      stars: 5
    },
    {
      spotId: 1,
      userId: 3,
      review: 'this is just a test',
      stars: 5
    },
    {
      spotId: 2,
      userId: 3,
      review: 'this is just a test',
      stars: 5
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
