const axios = require('axios');
const logger = require('../config/winston');

const getAllUserAlbums = async accessToken => {
  try {
    let albums = [];
    let url = 'https://api.spotify.com/v1/me/albums?limit=50';
    while (url != null) {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      albums = albums.concat(data.items);
      url = data.next;
    }
    return albums;
  } catch (err) {
    logger.error(err);
    return [];
  }
};

exports.getAllUserAlbums = getAllUserAlbums;

exports.getAllUserAlbumIDs = async accessToken => {
  const albums = await getAllUserAlbums(accessToken);
  const albumIDs = [];
  albums.forEach(({ album }) => {
    if (album && album.id) {
      albumIDs.push(album.id);
    }
  });
  return albumIDs;
};

const getAllUserSongs = async accessToken => {
  let songs = [];
  let url = 'https://api.spotify.com/v1/me/tracks?limit=50';
  while (url != null) {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    songs = songs.concat(data.items);
    url = data.next;
  }
  return songs;
};

exports.getAllUserSongs = getAllUserSongs;

exports.getAllUserSongIds = async accessToken => {
  const songs = await getAllUserSongs(accessToken);
  const songIDs = [];
  songs.forEach(({ track }) => {
    songIDs.push(track.id);
  });
  return songIDs;
};

exports.getAllUserPlaylistsAndTracks = async accessToken => {
  logger.info('Getting all use playlists');
  let playlists = [];
  let url = 'https://api.spotify.com/v1/me/playlists?limit=50';
  while (url != null) {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    playlists = playlists.concat(data.items);
    url = data.next;
  }
  logger.info(`Retrieved ${playlists.length} playlists`);
  for (const playlist of playlists) {
    let trackURL = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
    let tracks = [];
    while (trackURL != null) {
      const { data } = await axios.get(trackURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const trackIDs = [];
      data.items.forEach(({ track }) => {
        if (track.id != null) {
          trackIDs.push(track.id);
        }
      });
      tracks = tracks.concat(trackIDs);
      trackURL = data.next;
    }
    playlist.tracks = tracks;
  }

  return playlists;
};

// 1,368.84
// 1,110.46
