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
     return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "test-1",
        preview: true
      },
      {
        spotId: 1,
        url: "test-2",
        preview: false
      },
      {
        spotId: 2,
        url: "test-3",
        preview: true
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
     return queryInterface.bulkDelete('SpotImages', {
       reviewId: { [Op.in]: ["test-1", "test-2", "test-3"]}
     })
  }
};
