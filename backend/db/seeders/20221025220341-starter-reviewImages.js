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
   return queryInterface.bulkInsert('ReviewImages', [
    {
      reviewId: 1,
      url: "test-1"
    },
    {
      reviewId: 2,
      url: "test-2"
    },
    {
      reviewId: 2,
      url: "test-22"
    },
    {
      reviewId: 3,
      url: "test-3"
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
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: ["test-1", "test-2", "test-22", "test-3"]}
    })
  }
};
