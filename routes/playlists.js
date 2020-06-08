var express = require('express');
var router = express.Router();
var playlist = require('../methods/playlists');
/* GET home page. */
router.post('/', playlist.insertPlaylist);

module.exports = router;