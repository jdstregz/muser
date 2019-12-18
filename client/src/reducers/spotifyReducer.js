import { DESTROY_SESSION, FETCH_SPOTIFY_SESSION } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SPOTIFY_SESSION:
      return Object.assign({}, state, {
        spotifySessionActive: action.payload || false,
      });
    case DESTROY_SESSION:
      return false;
    default:
      return state;
  }
}
