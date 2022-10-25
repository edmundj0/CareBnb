'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: '2050-1-1',
        endDate: '2050-10-10',
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2050-1-1',
        endDate: '2051-10-10',
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2050-1-1',
        endDate: '2052-10-10',
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Bookings', {
      startDate: { [Op.in]: ['2050-1-1']}
    })
  }
};
