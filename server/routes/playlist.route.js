const express = require('express');
const PlaylistCtrl = require('../controllers/playlist.controller');

const router = express.Router();

router.post('/', PlaylistCtrl.create);

router.get('/:user', PlaylistCtrl.get);

module.exports = router;
