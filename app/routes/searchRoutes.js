const express = require('express');

const passport = require('passport');
const SearchController = require('../controllers/SearchController');

const jwtRequired = passport.authenticate('jwt', { session: false });
const router = express.Router();

router.get('/:search', jwtRequired, SearchController.searchSpotify);

module.exports = router;
