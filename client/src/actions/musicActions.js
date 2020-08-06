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

export const getCurrentlyPlayingTrack = async (token) => {
  const { data } = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const startPlayback = async (deviceId, token, uris, position) => {
  const { data } = await axios.put(
    'https://api.spotify.com/v1/me/player/play',
    {
      device_id: deviceId,
      uris: uris,
      position_ms: position || 0,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
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

export const cycleRepeatMode = async (token, state) => {
  let newState;
  switch (state) {
    case 'off':
      newState = 'context';
      break;
    case 'track':
      newState = 'off';
      break;
    case 'context':
      newState = 'track';
      break;
    default:
      newState = 'off';
  }
  axios.put(
    `https://api.spotify.com/v1/me/player/repeat?state=${newState}`,
    {
      state: newState,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const toggleShuffle = async (token, value) => {
  axios.put(
    `https://api.spotify.com/v1/me/player/shuffle?state=${value}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
