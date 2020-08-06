import io from 'socket.io-client';
import axios from 'axios';
import {
  CREATE_SOCKET,
  GROUP_LISTENING_ROOM,
  GROUP_LISTENING_ROOM_LIST,
  GROUP_LISTENING_MUSIC_UPDATE,
} from '../actions/types';

const getToken = async () => {
  console.log('getToken');
  const { data } = await axios.get('/auth/current_token');
  console.log(data);
  return data;
};

export const initializeSocket = () => async (dispatch) => {
  console.log('Getting Token');
  console.log(process.env);
  const token = await getToken();
  const socket = io.connect(process.env.REACT_APP_SOCKET_API_URL, {
    query: `token=${token}`,
  });
  dispatch({ type: CREATE_SOCKET, payload: socket });
};

export const initializeSocketListeners = (socket) => (dispatch) => {
  socket.on('join room success', (room) => {
    dispatch({ type: GROUP_LISTENING_ROOM, payload: room });
  });

  socket.on('leave room success', () => {
    dispatch({ type: GROUP_LISTENING_ROOM, payload: null });
  });

  socket.on('room updates', (rooms) => {
    dispatch({ type: GROUP_LISTENING_ROOM_LIST, payload: rooms });
  });

  socket.on('gl session', (room) => {
    console.log(room);
    dispatch({ type: GROUP_LISTENING_ROOM, payload: room });
  });

  socket.on('room kicked', () => {
    dispatch({ type: GROUP_LISTENING_ROOM, payload: false });
  });

  socket.on('music state update', (data) => {
    dispatch({ type: GROUP_LISTENING_MUSIC_UPDATE, payload: data });
  });
};
