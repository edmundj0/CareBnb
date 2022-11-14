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
      // to display drive photos, change
      // https://drive.google.com/file/d/[image_id]/view?usp=sharing
      // to
      // https://drive.google.com/uc?export=view&id=[image_id]
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
        spotId: 1,
        url: "test-22",
        preview: true
      },
      {
        spotId: 2,
        url: "test-3",
        preview: true
      },
      {
        spotId: 4,
        url: "https://drive.google.com/uc?export=view&id=1Xqj2cX6QVYcG4BAjNGoOhojrA39tPNtA",
        preview: true
      },
      {
        spotId: 4,
        url: "https://drive.google.com/uc?export=view&id=1Ge3161xMrt75TYYcSa9KuBEh77fvnSXm",
        preview: false
      },
      {
        spotId: 4,
        url: "https://drive.google.com/uc?export=view&id=1R3FHtY89OwoML9rG5lgR6YUDBqe-YAWl",
        preview: false
      },
      {
        spotId: 4,
        url: "https://drive.google.com/uc?export=view&id=1oRv6TlJmDzw4Ul1MSb-c6TGE_UGY85qU",
        preview: false
      },
      {
        spotId: 4,
        url: "https://drive.google.com/uc?export=view&id=1c7-NotvN4UgBHQjFanLp2S7dbLmIcEVH",
        preview: false
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
       spotId: { [Op.in]: ["test-1", "test-2", "test-3"]}
     })
  }
};
