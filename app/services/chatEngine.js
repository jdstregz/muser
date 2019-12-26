const express = require('express');


const GroupListeningController = require('../controllers/GroupListeningController');

router.post('/create', jwtRequired, GroupListeningController.createGroupListeningRoom);
router.get('/:id', jwtRequired, GroupListeningController.getGroupListeningRoomById);

module.exports = app => {

};
