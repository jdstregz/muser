import axios from 'axios';
import { FETCH_INCOMING_FRIEND_REQUESTS, FETCH_OUTGOING_FRIEND_REQUESTS } from './types';

export const getUserFriends = () => async dispatch => {};

export const getIncomingFriendRequests = () => async dispatch => {
  const { data } = await axios.get('/api/user/incoming-friend-requests');
  dispatch({ type: FETCH_INCOMING_FRIEND_REQUESTS, payload: data });
};

export const getOutgoingFriendRequests = () => async dispatch => {
  const { data } = await axios.get('/api/user/outgoing-friend-requests');
  dispatch({ type: FETCH_OUTGOING_FRIEND_REQUESTS, payload: data });
};

export const sendFriendRequest = request => async dispatch => {
  await axios.post('/api/user/outgoing-friend-requests', request);
  const { data } = await axios.get('/api/user/outgoing-friend-requests');
  dispatch({ type: FETCH_OUTGOING_FRIEND_REQUESTS, payload: data });
  return data;
};
