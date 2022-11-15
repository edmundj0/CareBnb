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
      url: "https://drive.google.com/uc?export=view&id=16mukPQtLbA0sKdk2i7LPgB_JT9wRnxu7"
    },
    {
      reviewId: 2,
      url: "https://drive.google.com/uc?export=view&id=1GxevxipKGVSH0sJmEixf0Sa-7D7dgk5c"
    },
    {
      reviewId: 3,
      url: "https://drive.google.com/uc?export=view&id=1Il8nPkzHFjgI2zaPvmUB-3IBd3TLsxwE"
    },
    {
      reviewId: 4,
      url: "https://drive.google.com/uc?export=view&id=1WTp9gsea5jh4K-3HoP0MfL4-24r87ccV"
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
