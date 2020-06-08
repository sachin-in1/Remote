'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('playlists', {
      list: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      // postId: {
      //   type: Sequelize.INTEGER
      // },
      listtype: {
        type: Sequelize.TEXT
      },
      // userId: {
      //   type: Sequelize.INTEGER
      // },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  // down: (queryInterface, Sequelize) => {
  //   return queryInterface.dropTable('Comments');
  // }
};