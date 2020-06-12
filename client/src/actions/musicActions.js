import axios from 'axios';
import { SET_SONG_LIST } from './types';

export const getAllUserSongs = async () => {
  const { data } = await axios.get('/api/music/songs');
  return data;
};

export const setCurrentSongList = (songs) => (dispatch) => {
  dispatch({ type: SET_SONG_LIST, payload: songs });
};

export const getCurrentPlayback = async (token) => {
  const { data } = await axios.get('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const transferUsersPlayback = async (token, deviceId) => {
  const data = await axios.put(
    'https://api.spotify.com/v1/me/player',
    {
      device_ids: [deviceId],
      play: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(data);
  return data;
};
