'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "playlists",
      [
        {
          // userId: 1,
          // postId: 2,
          list:
            "Nulla",
          listtype:
            "Nulla mol",
          // createdAt: new Date(),
          // updatedAt: new Date()
        },
        {
          // userId: 2,
          // postId: 1,
          // comment:
          //   "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
          list:
            "Maec",
          listtype:
            "Nulla m",
          
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("playlists", null, {})
};

// database/seeds/xxxx-Comment.js
