const mongoose = require('mongoose');
const Schema = mongoose.Schema
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
mongoose.promise = Promise

const listValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const listtypeValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 20],
    message: 'Email must not exceed {ARGS[1]} characters.'
  })
];

// Define the database model
const PlaylistSchema = new Schema({
  list: {
    type: String,
    required: [true, 'Playlist is required.'],
    unique:true,
    validate: listValidator
  },
  listtype: {
    type: String,
    required: [true, 'Type is required.'],
    unique:false,
    validate: listtypeValidator
  }
});

// Use the unique validator plugin
PlaylistSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
const Playlist = mongoose.model('playlists', PlaylistSchema);
module.exports= Playlist;