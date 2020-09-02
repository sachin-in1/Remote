const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const listValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 30],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const listtypeValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed {ARGS[1]} characters.'
  })
];

// Define the database model
const PlaylistSchema = new mongoose.Schema({
  list: {
    type: String,
    required: [true, 'Playlist is required.'],
    unique:true,
    validate: listValidator
  },
  listtype: {
    type: String,
    required: [true, 'Type is required.'],
    validate: listtypeValidator
  }
});

// Use the unique validator plugin
PlaylistSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Playlists = module.exports = mongoose.model('playlists', PlaylistSchema);