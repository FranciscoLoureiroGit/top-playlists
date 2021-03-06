const Song = require('../models/song.model');


exports.create = function (req, res) {
  const song = new Song({
    title: req.body.title,
    author: req.body.author,
    likes: req.body.likes
  });
  song.save()
    .then(function (createdSong) {
      return res.status(200).json({
        status: 200,
        data: createdSong,
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
