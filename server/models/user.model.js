const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true
  },
  //playlists: [{type: mongoose.Schema.Types.ObjectID, ref: 'playlist'}]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
