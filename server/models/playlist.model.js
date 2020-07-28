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
  //songs: [{type: mongoose.Schema.Types.ObjectID, ref: 'song'}],
  songsRef: {
    type: String,
    required: true
  }
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;
