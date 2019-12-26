import socketIO from 'socket.io-client';

export const socketConnect = socketIO.connect('/');
