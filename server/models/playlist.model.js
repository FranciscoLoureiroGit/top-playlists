const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  songs: [Song]
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;
