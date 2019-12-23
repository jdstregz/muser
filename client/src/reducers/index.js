import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spotifyReducer from './spotifyReducer';
import requestReducer from './requestReducer';

export default combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  requests: requestReducer,
});
