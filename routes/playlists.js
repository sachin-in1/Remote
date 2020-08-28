const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const Playlist = require('../models/playlists');

const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

router.get('/:list', (req, res) => {
    User.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such user.` });
      });
  });

router.get('/', (req, res) => {
    User.find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });

  router.post('/', postLimiter, (req, res) => {

    // Validate the age
    // let age = sanitizeAge(req.body.age);
    // if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
    // else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });
  
    let newPlaylist = new Playlist({
      list: sanitizeName(req.body.list),
      listtype: sanitizeEmail(req.body.listtype),
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
//   router.put('/:id', (req, res) => {
  
//     // Validate the age
//     let age = sanitizeAge(req.body.age);
//     if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
//     else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });
  
//     let updatedUser = {
//       name: sanitizeName(req.body.name),
//       email: sanitizeEmail(req.body.email),
//       age: sanitizeAge(req.body.age),
//       gender: sanitizeGender(req.body.gender)
//     };
  
//     User.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
//       .then((oldResult) => {
//         User.findOne({ _id: req.params.id })
//           .then((newResult) => {
//             res.json({
//               success: true,
//               msg: `Successfully updated!`,
//               result: {
//                 _id: newResult._id,
//                 name: newResult.name,
//                 email: newResult.email,
//                 age: newResult.age,
//                 gender: newResult.gender
//               }
//             });
//           })
//           .catch((err) => {
//             res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
//             return;
//           });
//       })
//       .catch((err) => {
//         if (err.errors) {
//           if (err.errors.name) {
//             res.status(400).json({ success: false, msg: err.errors.name.message });
//             return;
//           }
//           if (err.errors.email) {
//             res.status(400).json({ success: false, msg: err.errors.email.message });
//             return;
//           }
//           if (err.errors.age) {
//             res.status(400).json({ success: false, msg: err.errors.age.message });
//             return;
//           }
//           if (err.errors.gender) {
//             res.status(400).json({ success: false, msg: err.errors.gender.message });
//             return;
//           }
//           // Show failed if all else fails for some reasons
//           res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
//         }
//       });
//   });
  
  // DELETE
//   router.delete('/:id', (req, res) => {
  
//     User.findByIdAndRemove(req.params.id)
//       .then((result) => {
//         res.json({
//           success: true,
//           msg: `It has been deleted.`,
//           result: {
//             _id: result._id,
//             name: result.name,
//             email: result.email,
//             age: result.age,
//             gender: result.gender
//           }
//         });
//       })
//       .catch((err) => {
//         res.status(404).json({ success: false, msg: 'Nothing to delete.' });
//       });
//   });
  
  module.exports = router;
  
  // Minor sanitizing to be invoked before reaching the database
  sanitizeList = (list) => {
    return list.toLowerCase();
  }
  sanitizeEmail = (listtype) => {
    return listtype.toLowerCase();
  }
//   sanitizeAge = (age) => {
//     // Return empty if age is non-numeric
//     if (isNaN(age) && age != '') return '';
//     return (age === '') ? age : parseInt(age);
//   }
//   sanitizeGender = (gender) => {
//     // Return empty if it's neither of the two
//     return (gender === 'm' || gender === 'f') ? gender : '';
//   }
  
/* GET home page. */
// router.get('/', playlist.getPlaylists());
