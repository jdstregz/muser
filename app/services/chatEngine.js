const io = require('socket.io');
const logger = require('../config/winston');
const mongoose = require('mongoose');

const getAllUsernamesInRoom = (io, room) => {
  try {
    return Object.keys(io.sockets.adapter.rooms[room].sockets).map((socket) => {
      return io.sockets.connected[socket].user
    });
  } catch (err) {
    logger.error(err);
    return [];
  }

}

module.exports = server => {
  const chatSocket = io(server);
  chatSocket.on('connection', (client) => {
    logger.info('Client connected to root');
    client.on('joinGLRoom', data => {
      if (client.room) {
        client.leave(client.room);
      }
      client.join(data.id);
      client.room = data.id;
      client.user = data.user;
      logger.info('userJoined');
      //chatSocket.in(data.id).emit('userJoined', {user: data.user});
      const allUsers = getAllUsernamesInRoom(chatSocket, data.id)
      chatSocket.in(data.id).emit('allUsers', {users: allUsers});
    });

    client.on('sendMessage', data => {
      if (client.room) {
        console.log("Sending message: " + data);
        client.to(client.room).emit('receiveMessage', data);
      }
    })

    client.on('disconnect', () => {
      client.leave(client.room);
      const allUsers = getAllUsernamesInRoom(chatSocket, client.room)
      chatSocket.in(client.room).emit('allUsers', {users: allUsers});
      client.room = null;
      client.user = null;
    });
  })
};
