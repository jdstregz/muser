import axios from 'axios';
import { SET_DEVICE_ID } from './types';

export const setDeviceID = (deviceId) => async (dispatch) => {
  dispatch({ type: SET_DEVICE_ID, payload: deviceId });
};

export const createGroupListeningRoom = async (requestData) => {
  const { data } = await axios.post('/api/gl-rooms/create', requestData);
  return data;
};

export const getGroupListeningRoom = async (id) => {
  const { data } = await axios.get(`/api/gl-rooms/${id}`);
  return data;
};

export const getMyGroupListeningRooms = async () => {
  const { data } = await axios.get(`/api/gl-rooms/me/rooms`);
  return data;
};

export const getPublicGroupListeningRooms = async () => {
  const { data } = await axios.get(`/api/gl-rooms/public/rooms`);
  return data;
};
