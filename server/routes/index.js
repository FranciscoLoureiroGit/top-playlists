const express = require('express');
const songRoutes = require('./song.route');
const userRoutes = require('./user.route');
const playlistRoutes = require('./playlist.route');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('API works!');
});

router.use('/song', songRoutes);

router.use('/user', userRoutes);

router.use('/playlist', playlistRoutes);

module.exports = router;
