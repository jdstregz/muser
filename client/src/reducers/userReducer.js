import { FETCH_USER_FRIENDS } from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER_FRIENDS:
      return Object.assign({}, state, {
        friends: action.payload || false,
      });
    default:
      return state;
  }
}