'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlists = database.define(
    'playlists',
    {
      list: {
        type: Sequelize.TEXT
      },
      listtype: {
        type: Sequelize.TEXT
      },
  
    },
    { timestamps: false }
  );
  Playlists.associate = function(models) {
    // associations can be defined here
  };
  Playlists.readAll = async (req, res) => {
    try {
      const playlists = await Playlists.findAll();
      return res.send({ playlists });
    } catch (error) {
      return res.send(error);
    }
  };
  Playlists.addList = async (req, res) => {
    try {
      const playlists = await Playlists.create(req.body.list,req.body.listtype);
      return res.send({ playlists });
    } catch (error) {
      return res.send(error);
    }
  };


  return Playlists;
};