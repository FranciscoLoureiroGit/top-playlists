const Playlist = require('../models/playlist.model');

//create playlist
exports.create = function (req, res) {
  const playlist = new Playlist({
    title: req.body.name,
    author: req.body.owner.id,
    songsRef: req.body.tracks.href
  });
  playlist.save()
    .then(function (createdPlaylist) {
      return res.status(200).json({
        status: 200,
        data: createdPlaylist,
        message: 'Success'
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
}

//get user playlists
exports.get = function (req, res) {
  let user = req.params.user;
  console.log(user);
  Playlist.find({ author: user})
    .exec()
    .then( playlists => res.send(playlists))
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
}
