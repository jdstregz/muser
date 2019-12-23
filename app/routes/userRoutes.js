const express = require('express');

const passport = require('passport');
const UserController = require('../controllers/UserController');

const jwtRequired = passport.authenticate('jwt', { session: false });
const router = express.Router();

router.get('/my/friends', jwtRequired, UserController.getUserFriends);
// api/users/search/friends
router.post('/search/friends', jwtRequired, UserController.searchUsersForUsername);
module.exports = router;
