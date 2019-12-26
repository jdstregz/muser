const io = require('socket.io');

module.exports = server => {
  const chatSocket = io(server);
  chatSocket.onconnection(socket => {
    socket.emit('test', data => {
      console.log(data);
    });
  });
};
