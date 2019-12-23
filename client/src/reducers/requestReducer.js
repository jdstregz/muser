import { FETCH_INCOMING_FRIEND_REQUESTS, FETCH_OUTGOING_FRIEND_REQUESTS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_OUTGOING_FRIEND_REQUESTS:
      return Object.assign({}, state, {
        outgoingFriendRequests: action.payload || false,
      });
    case FETCH_INCOMING_FRIEND_REQUESTS:
      return Object.assign({}, state, {
        incomingFriendRequests: action.payload || false,
      });
    default:
      return state;
  }
}
