import { SET_DEVICE_ID } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload || null,
      };
    default:
      return state;
  }
}
