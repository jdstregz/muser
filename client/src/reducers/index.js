import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spotifyReducer from './spotifyReducer';
import requestReducer from './requestReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  requests: requestReducer,
  user: userReducer
});
