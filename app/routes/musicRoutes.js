const express = require('express');

const passport = require('passport');
const MusicController = require('../controllers/MusicController');

const jwtRequired = passport.authenticate('jwt', { session: false });
const spotifyTokenRequired = require('../middlewares/spotifyToken');
const router = express.Router();
router.get('/albums', [jwtRequired, spotifyTokenRequired.middleware], MusicController.getAllUserAlbums)

module.exports = router;
