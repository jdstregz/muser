const axios = require('axios');
const logger = require('../config/winston');

exports.getAllUserAlbums = async (req, res) => {
  try {
    if (!req.spotifyTokens || !req.spotifyTokens.accessToken) {
      return res.status(400).send({
        message: "No spotify token"
      });
    }
    let albums = [];
    let url = 'https://api.spotify.com/v1/me/albums?limit=50';
    while (url != null) {
      const {data} = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${req.spotifyTokens.accessToken}`,
        }
      });
      albums = albums.concat(data.items);
      url = data.next;
    }
    return res.send(albums);
  } catch (err) {
    logger.error(err)
    return res.status(500).send({
      message: "An error occurred when getting all user albums"
    })
  }
};

exports.getAllUserSongs = async (req, res) => {
  try {

  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: "An error occurred when getting all user songs"
    })
  }
}