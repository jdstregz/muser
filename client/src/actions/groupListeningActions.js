import axios from 'axios';

export const createGroupListeningRoom = async (requestData) => {
  const {data} = await axios.post('/api/gl-rooms/create', requestData);
  return data;
};

export const getGroupListeningRoom = async (id) => {
  const {data} = await axios.get(`/api/gl-rooms/${id}`);
  return data;
};