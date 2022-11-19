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
        url: "https://media.discordapp.net/attachments/1043327118823669761/1043328774458060892/glacier_montana.jpg?width=1052&height=701",
        preview: true
      },
      {
        spotId: 1,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/glaciermontana2.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/glaciermontana3.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/glaciermontana4.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/glaciermontana5.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/olympic%20washington.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/olympicwashington2.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/olympicwashington3.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/olympicwashington4.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/olympicwashington5.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/chickasawoklahoma.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/chickasaw%20oklahoma2.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/chickasaw%20oklahoma3.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/chickasaw%20oklahoma4.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/chickasaw%20oklahoma5.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/hotspringsarkansas.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/hotspringsarkansas2.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/hotspringsarkansas3.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/hotspringsarkansas4.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/hotspringsarkansas5.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yellowstonewyoming.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yellowstonewyoming2.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yellowstonewyoming3.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yellowstonewyoming4.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yellowstonewyoming5.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yosemitecalifornia.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yosemitecalifornia2.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yosemitecalifornia3.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yosemitecalifornia4.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/yosemitecalifornia5.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/grandcanyonarizona.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/grandcanyonarizona2.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/grandcanyonarizona3.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/grandcanyonarizona4.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/grandcanyonarizona5.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/mthoodoregon.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/mthoodoregon2.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/mthoodoregon3.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/mthoodoregon4.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/mthoodoregon5.jpg",
        preview: false
      },

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
