'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    list: DataTypes.STRING,
    listtype: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
  };
  return Playlist;
};