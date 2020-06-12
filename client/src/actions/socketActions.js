import socketIO from 'socket.io-client';
import config from '../config/config';
import { CREATE_SOCKET } from './types';

export const socketConnect = () => async (dispatch) => {
  console.log(window.location);
  const socket = socketIO.connect(window.location.origin + '/socket');
  dispatch({ type: CREATE_SOCKET, payload: socket });
};
