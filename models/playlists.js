const Sequelize = require('sequelize');
const database = require('./database');

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
    console.log("hooo");
    
    const playlists = await Playlists.create(req.body.list,req.body.listtype);
    return res.send({ playlists });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = Playlists;
