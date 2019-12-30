const axios = require('axios');
const logger = require('../config/winston');
const jwt = require('jsonwebtoken');

exports.searchSpotify = async (req, res) => {
  try {
    if (!req.params.search) {
      return res.status(400).send({
        message: 'bad request'
      });
    }

    jwt.verify(req.session.spotifyJWT, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err || !decodedToken) {
        return res.status(401).send({
          message: 'Unauthorized'
        });
      } else {
        const {data} = await axios.get('https://api.spotify.com/v1/search' +
          '?q=' + encodeURI(req.params.search) +
          "&type=album,track,artist", {
          headers: {
            Authorization: `Bearer ${decodedToken.accessToken}`,
          },
        });

        return res.send(data);
      }
    });
    //return res.send([]);
  } catch (err) {
    logger.error(err)
    return res.status(500).send({
      message: "An error occurred when searching spotify"
    })
  }
};
