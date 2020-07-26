const express = require('express');
const songRoutes = require('./song.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('API works!');
});

router.use('/song', songRoutes);

router.use('/user', userRoutes);

module.exports = router;
