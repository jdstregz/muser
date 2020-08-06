import { GROUP_LISTENING_ROOM } from './types';

export const joinGroupListenerRoom = (room) => (dispatch) => {
  dispatch({ type: GROUP_LISTENING_ROOM, payload: room });
};
