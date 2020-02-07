const logger = require('../config/winston');
const SpotifyEngine = require('../services/spotifyAPIEngine');

exports.getAllUserAlbums = async (req, res) => {
  try {
    if (!req.spotifyTokens || !req.spotifyTokens.accessToken) {
      return res.status(400).send({
        message: 'No spotify token',
      });
    }
    const albums = await SpotifyEngine.getAllUserAlbums(req.spotifyTokens.accessToken);
    return res.send(albums);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred when getting all user albums',
    });
  }
};

exports.getAllUserSongs = async (req, res) => {
  try {
    if (!req.spotifyTokens || !req.spotifyTokens.accessToken) {
      return res.status(400).send({
        message: 'No spotify token',
      });
    }
    return null;
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred when getting all user songs',
    });
  }
};

exports.getAllUserPlaylists = async (req, res) => {
  try {
    if (!req.spotifyTokens || !req.spotifyTokens.accessToken) {
      return res.status(400).send({
        message: 'No spotify token',
      });
    }
    const playlists = await SpotifyEngine.getAllUserPlaylistsAndTracks(
      req.spotifyTokens.accessToken,
    );
    return res.send(playlists);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred when getting all user playlists',
    });
  }
};

exports.getBackUpOfUsersData = async (req, res) => {
  try {
    if (!req.spotifyTokens || !req.spotifyTokens.accessToken) {
      return res.status(400).send({
        message: 'No spotify token',
      });
    }

    const playlists = SpotifyEngine.getAllUserPlaylistsAndTracks(req.spotifyTokens.accessToken);
    const savedTracks = SpotifyEngine.getAllUserSongIds(req.spotifyTokens.accessToken);
    const savedAlbums = SpotifyEngine.getAllUserAlbumIDs(req.spotifyTokens.accessToken);

    const promises = await Promise.all([playlists, savedTracks, savedAlbums]);
    return res.send(promises);
  } catch (err) {
    logger.error(err);
    return res.send({
      message: 'an error occurred',
    });
  }
};
