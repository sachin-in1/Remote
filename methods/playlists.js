
const models = require('../database/models');

const insertPlaylist = async (req,res) => {
    try {
        console.log("DSG");
        const playlist = await models.Playlist.create(req.body);
        return res.status(201).json({
            playlist
        });
    }
    catch(error) {
        console.log("DSD");
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    insertPlaylist,
}