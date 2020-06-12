import { DESTROY_SESSION, FETCH_SPOTIFY_SESSION, SET_SONG_LIST } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SPOTIFY_SESSION:
      return Object.assign({}, state, {
        spotifySessionActive: action.payload || false,
      });
    case DESTROY_SESSION:
      return false;
    case SET_SONG_LIST:
      return Object.assign({}, state, {
        songs: action.payload || [],
      });
    default:
      return state;
  }
}
