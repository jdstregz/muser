const logger = require('../../config/winston');
const GLController = require('../../controllers/GroupListeningController');

const musicUpdate = async (io, socket, data) => {
  console.log(data);
  // IF THE USER IS IN A ROOM AND THE ROOM ALLOWS HIM TO CHANGE THE MUSIC
  // SEND A MESSAGE TO EVERYONE IN THE ROOM WITH THE STATE CHANGE
  if (socket.currentRoom) {
    // TODO: get room and determine permissions
    const room = await GLController.socketgetGLRoom(socket.currentRoom);
    // for now, if the user is the owner, send the update
    if (room && room.userId.toString() === socket.decoded_token._id) {
      io.to(socket.currentRoom).emit('music state update', {
        id: socket.decoded_token._id,
        ...data,
      });
    }
  }
};

module.exports = (io, socket) => {
  logger.verbose('Initializing Music Listening Socket');
  socket.on('music update', (data) => musicUpdate(io, socket, data));
};
