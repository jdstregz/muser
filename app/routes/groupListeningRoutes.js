const express = require('express');

const passport = require('passport');

const jwtRequired = passport.authenticate('jwt', { session: false });
const router = express.Router();

const GroupListeningController = require('../controllers/GroupListeningController');

router.post('/create', jwtRequired, GroupListeningController.createGroupListeningRoom);
router.get('/:id', jwtRequired, GroupListeningController.getGroupListeningRoomById);

module.exports = router;
