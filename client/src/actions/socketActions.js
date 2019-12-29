import socketIO from 'socket.io-client';
import config from '../config/config';
import { CREATE_SOCKET } from './types';

export const socketConnect = () => async dispatch => {
  if (config && config.api && config.api.url) {
    const socket = socketIO.connect(config.api.url);
    dispatch({ type: CREATE_SOCKET, payload: socket });
  }
};