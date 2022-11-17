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
        url: "https://drive.google.com/uc?export=view&id=1c88NjcWttA2g16mjGthBJQynlHaBU6Ey",
        preview: true
      },
      {
        spotId: 1,
        url: "https://drive.google.com/uc?export=view&id=1sMGgIMD6u3nKtCdisgNntGuyku50m7Mo",
        preview: false
      },
      {
        spotId: 1,
        url: "https://drive.google.com/uc?export=view&id=1jUWlAcomGKM7kbJkJtvsgaMAB8tIWiei",
        preview: false
      },
      {
        spotId: 1,
        url: "https://drive.google.com/uc?export=view&id=1VVlarVwnDo6kLATPrHfPEg3TAh6RIx0E",
        preview: false
      },
      {
        spotId: 1,
        url: "https://drive.google.com/uc?export=view&id=1VA83ZKhqICkfJCvvD6dwgEZJs8soEgOJ",
        preview: false
      },
      {
        spotId: 2,
        url: "https://drive.google.com/uc?export=view&id=1G20pBJxaK8yd9dZFiNKA15OM2IaelJLK",
        preview: true
      },
      {
        spotId: 2,
        url: "https://drive.google.com/uc?export=view&id=1y8X44Jxjy0m-9504lvb8x3IkyymeNbCh",
        preview: false
      },
      {
        spotId: 2,
        url: "https://drive.google.com/uc?export=view&id=1NNtZRfGddJyYJ4WqR28ydDsXdshhZhVs",
        preview: false
      },
      {
        spotId: 2,
        url: "https://drive.google.com/uc?export=view&id=14Oz9qmIlCX4XJfAamB0GU9A3TrNl9cDz",
        preview: false
      },
      {
        spotId: 2,
        url: "https://drive.google.com/uc?export=view&id=1RS_8U94bkRLSeBYnx5BwhxdbdDSM_0Tg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://drive.google.com/uc?export=view&id=1Csg9GtKVNtcqXnEx6XPuUmSqINQTvop-",
        preview: true
      },
      {
        spotId: 3,
        url: "https://drive.google.com/uc?export=view&id=1ruyQnOpYeyapuAAXzHMLO35etEg8wuKs",
        preview: false
      },
      {
        spotId: 3,
        url: "https://drive.google.com/uc?export=view&id=1BMOmkHlPRjGF9Y7ASUYNWugiLcCx46cy",
        preview: false
      },
      {
        spotId: 3,
        url: "https://drive.google.com/uc?export=view&id=1lvXyBqz2Grm5tp3mSViGLgTBB7ZiqR0l",
        preview: false
      },
      {
        spotId: 3,
        url: "https://drive.google.com/uc?export=view&id=1S3t7nOnRMy7tAxDD_pCqZJW-xQ-kkmZs",
        preview: false
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
      },
      {
        spotId: 5,
        url: "https://drive.google.com/uc?export=view&id=1KmjLruRqHrZ9KLQP0kjtIxWrjeM143tq",
        preview: true
      },
      {
        spotId: 5,
        url: "https://drive.google.com/uc?export=view&id=1c9_hYqHnRbysZa-r9jVZigVY25gbWoTF",
        preview: false
      },
      {
        spotId: 5,
        url: "https://drive.google.com/uc?export=view&id=1Lk1gISJnUSklzWRIi_7iURws62AW4N3f",
        preview: false
      },
      {
        spotId: 5,
        url: "https://drive.google.com/uc?export=view&id=1WVKKbHsThqGoPe9Tki2P1U2JJRZnPVqc",
        preview: false
      },
      {
        spotId: 5,
        url: "https://drive.google.com/uc?export=view&id=1ZTTB6g5SMmGuXsDVGHhFKEtBRTjr5Q8I",
        preview: false
      },
      {
        spotId: 6,
        url: "https://drive.google.com/uc?export=view&id=13c8FjckuQuiYWSubQXsRnmw-dhvbUQeO",
        preview: true
      },
      {
        spotId: 6,
        url: "https://drive.google.com/uc?export=view&id=1qCoj3y0o7T_x5bN8lAfmz-LMNst4AuRM",
        preview: false
      },
      {
        spotId: 6,
        url: "https://drive.google.com/uc?export=view&id=1yvQTx8I9atRYIavtHgYR_uGKvDieUXZ3",
        preview: false
      },
      {
        spotId: 6,
        url: "https://drive.google.com/uc?export=view&id=1HK-KJFS9WxwLqkOcXK6hu0FAcfifznMQ",
        preview: false
      },
      {
        spotId: 6,
        url: "https://drive.google.com/uc?export=view&id=1955Ii71B-2uw499ovahPsjo90eDcWjbU",
        preview: false
      },
      {
        spotId: 7,
        url: "https://drive.google.com/uc?export=view&id=1TwouZMgNuY4AZ347DDqEgZLkRN0uBF1l",
        preview: true
      },
      {
        spotId: 7,
        url: "https://drive.google.com/uc?export=view&id=1WWhO5XouYIcjKSJ-jaiL0ak1TRRHwxX1",
        preview: false
      },
      {
        spotId: 7,
        url: "https://drive.google.com/uc?export=view&id=1zf7HkyRNFrMJ9S0JE1NSd0nWOzSvT2yR",
        preview: false
      },
      {
        spotId: 7,
        url: "https://drive.google.com/uc?export=view&id=17A7scGcc0xVyar5fTbC-c4GEufXue89w",
        preview: false
      },
      {
        spotId: 7,
        url: "https://drive.google.com/uc?export=view&id=1_WcmXxcGbz9lGsxvlVT89zZoVlxUQ7jR",
        preview: false
      },
      {
        spotId: 8,
        url: "https://drive.google.com/uc?export=view&id=1KGbjCYgwRuMz46-UeAelRJrpmOjEKh9K",
        preview: true
      },
      {
        spotId: 8,
        url: "https://drive.google.com/uc?export=view&id=1p3y8RQ2YT459DZvp6ru-R5pY559fpjr4",
        preview: false
      },
      {
        spotId: 8,
        url: "https://drive.google.com/uc?export=view&id=11IlQ5lJWQUVMm3Q-v5xXUg__H66xirrF",
        preview: false
      },
      {
        spotId: 8,
        url: "https://drive.google.com/uc?export=view&id=1S8rBndvpJudp1jOGBvMk4a3wtgNd6Qr9",
        preview: false
      },
      {
        spotId: 8,
        url: "https://drive.google.com/uc?export=view&id=1Fj6VAWY1HlFisNwldlkkslrn-qHpKFD8",
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
