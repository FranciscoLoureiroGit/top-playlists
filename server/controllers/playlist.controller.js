const Playlist = require('../models/playlist.model');


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
