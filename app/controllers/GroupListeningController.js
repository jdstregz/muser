const mongoose = require('mongoose');

const GroupListeningRoom = mongoose.model('GroupListeningRoom');

const logger = require('../config/winston');

exports.createGroupListeningRoom = async (req, res) => {
  try {
    if (!req.user || !req.user._id ||
      req.body.title === null || req.body.description === null
    || req.body.public === null) {
      return res.status(400).send({
        message: 'Bad Request'
      });
    }
    const GLRoom = new GroupListeningRoom({
      title: req.body.title,
      owner: req.user._id,
      description: req.body.description,
      public: req.body.public,
      passcode: req.body.passcode || null,
    });
    await GLRoom.save();
    return res.send(GLRoom);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred when trying to create a new group listening room'
    })
  }
};

const isOwnerOfRoom = (user, room) => {
  return user._id.toString() === room.owner.toString();
};

const isMemberOfRoom = (user, room) => {
  for (const member of room.users) {
    if (member.userId.toString() === user._id.toString()) {
      return true;
    }
  }
  return false;
}

exports.getGroupListeningRoomById = async (req, res) => {
  try {
    if (!req.user || !req.user._id || !req.params.id) {
      return res.status(400).send({
        message: "Bad Request"
      })
    }
    const room = await GroupListeningRoom.findOne({_id: req.params.id});
    if (!room) {
      return res.status(404).send({
        message: "Room not found"
      });
    }
    if (room.public) {
      return res.send(room);
    }
    if (isOwnerOfRoom(req.user, room) || isMemberOfRoom(req.user, room)) {
      return res.send(room);
    } else {
      return res.status(401).send({
        message: "Unauthorized to access this room"
      })
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: "An error occurred when trying to find a room by id"
    })
  }
};