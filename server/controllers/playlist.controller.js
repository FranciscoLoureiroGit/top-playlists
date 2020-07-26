const Playlist = require('../models/playlist.model');


exports.create = function (req, res) {
  const playlist = new Playlist({
    title: req.body.data.title,
    author: req.body.data.author,
    likes: req.body.data.likes,
    songs: req.body.data.songs
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
