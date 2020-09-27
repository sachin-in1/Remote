const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const Playlist = require('../database/models/playlists');

const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

router.route('/').get((req, res) => {
  Playlist.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

router.get('/:list', (req, res) => {
  Playlist.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such playlist.` });
      });
  });


  router.route('/').post(postLimiter, (req, res) => {
    console.log(req.body);
    let newPlaylist = new Playlist({
      list: sanitizeList(req.body.list),
      listtype: sanitizeListtype(req.body.listtype),
    });
  
    newPlaylist.save()
      .then((result) => {
        res.json({
          success: true,
          msg: `Successfully added!`,
          result: {
            _id: result._id,
            list: result.list,
            listtype: result.listtype
          }
        });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.list) {
            res.status(400).json({ success: false, msg: err.errors.list.message });
            return;
          }
          if (err.errors.listtype) {
            res.status(400).json({ success: false, msg: err.errors.listtype.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // UPDATE
  router.put('/:id', (req, res) => {
  
    let updatedPlaylist = {
      list: sanitizeList(req.body.list),
      listtype: sanitizeListtype(req.body.listtype)
    };
  
    Playlist.findOneAndUpdate({ _id: req.params.id }, updatedPlaylist, { runValidators: true, context: 'query' })
      .then((oldResult) => {
        Playlist.findOne({ _id: req.params.id })
          .then((newResult) => {
            res.json({
              success: true,
              msg: `Successfully updated!`,
              result: {
                _id: newResult._id,
                list: newResult.list,
                listtype: newResult.listtype
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            return;
          });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.list) {
            res.status(400).json({ success: false, msg: err.errors.list.message });
            return;
          }
          if (err.errors.listtype) {
            res.status(400).json({ success: false, msg: err.errors.listtype.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // DELETE
  router.delete('/:id', (req, res) => {
  
    Playlist.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.json({
          success: true,
          msg: `It has been deleted.`,
          result: {
            _id: result._id,
            list: result.list,
            listtype: result.listtype
          }
        });
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: 'Nothing to delete.' });
      });
  });
  
  module.exports = router;
  
  // Minor sanitizing to be invoked before reaching the database
  sanitizeList = (list) => {
    console.log("list");
    return list.toLowerCase();
  }
  sanitizeListtype = (listtype) => {
    // listtype = listtype.toLowerCase();
    return (listtype === 'playlist' || listtype === 'user_uploads') ? listtype : '';
  }