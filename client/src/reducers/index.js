import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spotifyReducer from './spotifyReducer';
import requestReducer from './requestReducer';
import userReducer from './userReducer';
import socketReducer from './socketReducer';
import groupListeningReducer from './groupListeningReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  requests: requestReducer,
  user: userReducer,
  socket: socketReducer,
  groupListening: groupListeningReducer,
  player: playerReducer,
});
