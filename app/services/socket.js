const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');
const logger = require('../config/winston');
const groupListeningSocket = require('./eventHandlers/groupListeningListeners');
const musicListeningSocket = require('./eventHandlers/musicListeners');

module.exports = (server) => {
  const io = socketIO(server);
  let interval;
  let numUsers = 0;

  io.use(
    socketioJwt.authorize({
      secret: process.env.JWT_SECRET_KEY,
      handshake: true,
    }),
  );

  io.on('connection', (socket) => {
    // ////////////////// INITIALIZE LOGIC ////////////////////// //
    numUsers += 1;
    logger.verbose(`User Connected - Total Users: ${numUsers}`);

    // ////////////////// HEARTBEAT ////////////////////// //
    interval = setInterval(() => {
      const res = new Date();
      socket.emit('heartbeat', res);
    }, 10000);

    // ////////////////// ON DISCONNECT ////////////////////// //
    socket.on('disconnect', () => {
      numUsers -= 1;
      logger.verbose(`User Disconnected - Total Users: ${numUsers}`);
      clearInterval(interval);
    });

    groupListeningSocket(io, socket);
    musicListeningSocket(io, socket);

    // ////////////////// SEND MESSAGE ////////////////////// //
    socket.on('chat message', (message) => {
      if (!socket.user || !socket.roomId) {
        socket.emit('error', { message: 'no roomId or user' });
        return;
      }
      io.to(socket.roomId).emit('chat message', {
        message,
        user: socket.user,
        userId: socket.id,
      });
    });

    socket.on('test', () => {
      logger.verbose('Test emit received');
      socket.emit('response');
    });

    // ////////////////// send back data if there is any ////////////////////// //
  });
};
