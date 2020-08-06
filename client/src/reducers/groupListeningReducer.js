import {
  GROUP_LISTENING_MUSIC_UPDATE,
  GROUP_LISTENING_ROOM,
  GROUP_LISTENING_ROOM_LIST,
} from '../actions/types';

const initialState = {
  availableRooms: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GROUP_LISTENING_ROOM:
      return {
        ...state,
        room: action.payload || false,
      };
    case GROUP_LISTENING_ROOM_LIST:
      return {
        ...state,
        availableRooms: action.payload || [],
      };
    case GROUP_LISTENING_MUSIC_UPDATE:
      return {
        ...state,
        lastMusicUpdate: action.payload || null,
      };
    default:
      return state;
  }
}
