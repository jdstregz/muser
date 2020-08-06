const mongoose = require('mongoose');

const GroupListeningRoom = mongoose.model('GroupListeningRoom');
const GroupListeningRoomSession = mongoose.model('GroupListeningRoomSession');

const logger = require('../config/winston');

exports.createGroupListeningRoom = async (
  userId,
  { roomName, description, passcode, privateSetting },
) => {
  try {
    // first check to see if the user already has a room, prevent multiple creations
    let room = await GroupListeningRoom.findOne({ userId });
    if (room) {
      return false;
    }
    room = new GroupListeningRoom({
      private: privateSetting,
      passcode,
      description,
      userId,
      roomName,
      settings: 0,
      members: {},
    });
    await room.save();
    return room;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

exports.getAllGroupListeningRooms = async (userId) => {
  try {
    return await GroupListeningRoom.find({ $or: [{ private: false }, { userId }] });
  } catch (err) {
    logger.error(err);
    return [];
  }
};

exports.addUserToGLRoomList = async (room, userId, username) => {
  try {
    room.members[userId] = username;
    await room.save();
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

exports.removeUserToGLRoomList = async (room, userId) => {
  try {
    room.members[userId] = false;
    await room.save();
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

exports.getLastGroupListeningSession = async (userId) => {
  try {
    if (!userId) {
      return null;
    }
    return await GroupListeningRoomSession.findOne({ userId });
  } catch (err) {
    logger.error(err);
    return false;
  }
};

exports.setLastGroupListeningSession = async (userId, roomId, roomName) => {
  try {
    if (!userId) {
      return null;
    }

    let roomSession = await GroupListeningRoomSession.findOne({ userId });
    if (!roomSession) {
      // then we create one
      roomSession = new GroupListeningRoomSession({
        userId,
        roomId,
        roomName,
      });
      await roomSession.save();
      return roomSession;
    }
    // then we update
    roomSession.roomId = roomId;
    roomSession.roomName = roomName;
    await roomSession.save();
    return roomSession;
  } catch (err) {
    return false;
  }
};

exports.deleteGroupListeningSession = async (userId) => {
  try {
    await GroupListeningRoomSession.deleteOne({ userId });
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

exports.deleteGroupListeningRoom = async (userId) => {
  try {
    await GroupListeningRoom.deleteOne({ userId });
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

exports.socketgetGLRoom = async (id) => {
  try {
    const room = await GroupListeningRoom.findOne({ _id: id });
    return room;
  } catch (err) {
    return null;
  }
};

exports.getGLRoomByOwner = async (userId) => {
  try {
    return await GroupListeningRoom.findOne({ userId });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

exports.getMyGroupListeningRooms = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    const room = await GroupListeningRoom.findOne({ userId: req.user._id });
    return res.send(room);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred when trying to find user rooms',
    });
  }
};

exports.getPublicGroupListeningRooms = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    const publicRooms = await GroupListeningRoom.find({
      private: false,
      userId: { $ne: req.user._id },
    });
    return res.send(publicRooms);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred when getting all public rooms',
    });
  }
};
