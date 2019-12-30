const jwt = require('jsonwebtoken');

module.exports.middleware = (req, res, next) => {
  jwt.verify(req.session.spotifyJWT, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err || !decodedToken) {
      return res.status(401).send({
        message: 'Unauthorized'
      });
    } else {
      req.spotifyTokens = decodedToken;
      next();
    }});
};