'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    host: DataTypes.STRING,
    playlist: DataTypes.ARRAY(DataTypes.STRING),
    index: DataTypes.INTEGER,
    position: DataTypes.STRING,
    users: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};