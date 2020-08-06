const logger = require('../../config/winston');
const GLController = require('../../controllers/GroupListeningController');

const sendRoomUpdates = (io, room) => {
  io.to(room._id).emit('room update', room);
};

const sendRoomListingUpdate = (io, socket) => {
  GLController.getAllGroupListeningRooms(socket.decoded_token._id).then((rooms) => {
    const returnArr = [];
    rooms.forEach((room) => {
      returnArr.push(room.toJSON());
    });
    io.to('roomUpdates').emit('room updates', returnArr);
  });
};

const joinRoom = async (io, socket, data) => {
  // If there's no roomId passed in
  if (!data.roomId) {
    logger.verbose('Missing room Id');
    socket.emit('join error', { message: 'Missing room Id' });
    return;
  }
  // check if user is already in another room
  const session = await GLController.getLastGroupListeningSession(socket.decoded_token._id);
  if (session) {
    logger.verbose('User is already in another room');
    socket.emit('session exists', { message: 'User is already in another room' });
    return;
  }
  // Check to make sure room exists
  const room = await GLController.socketgetGLRoom(data.roomId);
  // if there's no room then return
  if (!room) {
    logger.verbose('Room does not exist');
    socket.emit('join error', { message: "Room doesn't exist" });
    return;
  }
  // permission to join
  if (room.private) {
    // check if the user in in the list of room members and also isn't the owner
    if (!room.members[socket.decoded_token._id] && room.userId !== socket.decoded_token._id) {
      // TODO: allow private mode where friends of user can join without passcode
      // if the room does not have a passcode, it means they were never added, so reject
      if (!room.passcode) {
        logger.verbose('user does not have access');
        socket.emit('join error', { message: 'No access' });
        return;
      }
      // did the user pass in a code?
      if (!data.passcode) {
        logger.verbose('User did not pass in a code');
        socket.emit('join error', { message: 'No code provided' });
        return;
      }
      // if they aren't in the list of room members, check to see if they have the right passcode
      if (data.passcode !== room.passcode) {
        logger.verbose('User did not provide the right passcode');
        socket.emit('join error', { message: 'Wrong passcode' });
        return;
      }
      // if the passcode was correct we need to add them to the list of members
      // TODO: encrypt this?
      if (room.passcode === data.passcode) {
        const success = await GLController.addUserToGLRoomList(
          room,
          socket.decoded_token._id,
          socket.decoded_token.username,
        );
        if (!success) {
          logger.verbose('An error occurred when adding a user to the gl room');
          socket.emit('join error', { message: 'An error occurred' });
          return;
        }
      }
    }
  }
  // user has either pass the private check or the room is public

  const newSession = await GLController.setLastGroupListeningSession(
    socket.decoded_token._id,
    room._id,
    room.roomName,
  );
  if (!newSession) {
    logger.verbose('Issue occurred when trying to create new GL Session');
    socket.emit('join error', { message: 'An error occurred when creating a new session' });
    return;
  }
  socket.join(room._id.toString());
  socket.currentRoom = room._id;
  io.to(room._id).emit('user joining room', { name: socket.decoded_token.username });
  sendRoomUpdates(io, room);
  socket.emit('join room success', room.toJSON());
};

const createRoom = async (io, socket, data) => {
  // check to see if user already owns a room
  const ownedRoom = await GLController.getGLRoomByOwner(socket.decoded_token._id);
  if (ownedRoom) {
    logger.verbose('User already owns a room');
    socket.emit('create error', { message: 'User already owns a room' });
    return;
  }
  // verify that user is not already in another room
  const session = await GLController.getLastGroupListeningSession(socket.decoded_token._id);
  if (session) {
    logger.verbose('User is already in another room');
    socket.emit('create error', { message: 'User is already in another room' });
  }
  // create room for dataase
  const room = await GLController.createGroupListeningRoom(socket.decoded_token._id, data);
  if (!room) {
    logger.error('An error occurred when creating a new listening room');
    socket.emit('create error', { message: 'An error occurred when creating a new room' });
  }
  // create user listening session
  const newSession = await GLController.setLastGroupListeningSession(
    socket.decoded_token._id,
    room._id,
    room.roomName,
  );
  if (!newSession) {
    logger.error('There was an error creating a room session');
    socket.emit('create error', { message: 'An error occurred creating a room session' });
  }
  socket.join(room._id.toString());
  socket.currentRoom = room._id;
  socket.emit('join room success', room.toJSON());
  // TODO: send room updates
  sendRoomListingUpdate(io, socket, room);
  // return room
};

const leaveRoom = async (io, socket) => {
  const roomId = socket.currentRoom;
  // destroy the session
  let success = await GLController.deleteGroupListeningSession(socket.decoded_token._id);
  socket.leave(socket.currentRoom);
  socket.currentRoom = null;
  if (!success) {
    logger.error('An error occurred when deleting the session');
    socket.emit('leave room error', { message: 'An error occurred when deleting the session' });
    return;
  }
  // leave the members of the room
  const room = await GLController.socketgetGLRoom(roomId);
  success = await GLController.removeUserToGLRoomList(room, socket.decoded_token._id);
  if (!success) {
    logger.error('An error occurred when leaving the room object');
    socket.emit('leave room error', { message: 'An error occurred when leaving the room object' });
    return;
  }
  // leave the socket
  // if the owner then dissovle the room
  if (room.userId.toString() === socket.decoded_token._id.toString()) {
    success = await GLController.deleteGroupListeningRoom(socket.decoded_token._id);
    if (!success) {
      logger.error('an error occurred when deleting the group');
      socket.emit('leave room error', {
        message: 'An error occurred when deleting the room object',
      });
      return;
    }
    // TODO: send a message to everyone else that they were kicked
    const socketRoom = io.sockets.adapter.rooms[roomId];
    if (socketRoom) {
      for (const socketId of Object.keys(socketRoom.sockets)) {
        const tempSocket = io.sockets.sockets[socketId];
        tempSocket.leave(roomId);
        GLController.deleteGroupListeningSession(tempSocket.decoded_token._id).then(() => {
          tempSocket.emit('room kicked');
        });
      }
    }
  }
  socket.emit('leave room success');
  sendRoomListingUpdate(io, socket);
  // TODO: move ownership to another user
};

const joinExistingRoomSession = async (io, socket) => {
  const session = await GLController.getLastGroupListeningSession(socket.decoded_token._id);
  if (session) {
    const room = await GLController.socketgetGLRoom(session.roomId);
    if (room) {
      logger.verbose('Session and room still exists so user rejoining');
      socket.join(room._id.toString());
      socket.currentRoom = room._id;
      io.to(room._id).emit('user joining room', { name: socket.decoded_token.username });
      sendRoomUpdates(io, room);
      socket.emit('join room success', room.toJSON());
      return room;
    }
    // if we get here it means that there was a session but room is gone, so we destroy session
    await GLController.deleteGroupListeningSession(socket.decoded_token._id);
  }
  socket.emit('join room success', false);
  return null;
};

const subscribeToRooms = (io, socket) => {
  logger.verbose('User subscribed to room updates');
  socket.join('roomUpdates');
  sendRoomListingUpdate(io, socket);
};

const unsubscribeToRooms = (io, socket) => {
  logger.verbose('User unsubscribing to room updates');
  socket.leave('roomUpdates');
};

module.exports = (io, socket) => {
  logger.verbose('Initializing Group Listenening Socket');
  joinExistingRoomSession(io, socket).then((room) => {
    socket.emit('gl session', room);
  });
  socket.on('join room', (data) => joinRoom(io, socket, data));
  socket.on('create room', (data) => createRoom(io, socket, data));
  socket.on('leave room', (data) => leaveRoom(io, socket, data));
  socket.on('room updates', () => subscribeToRooms(io, socket));
  socket.on('unsubscribe room updates', () => unsubscribeToRooms(io, socket));
};
