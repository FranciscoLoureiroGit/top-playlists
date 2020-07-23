const express = require('express');
const SongCtrl = require('../controllers/song.controller');

const router = express.Router();

router.post('/', SongCtrl.create);

module.exports = router;
