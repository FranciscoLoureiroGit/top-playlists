const express = require('express');
const songRoutes = require('./song.route');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('API works!');
});

router.use('/song', songRoutes);

module.exports = router;
