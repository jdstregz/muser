const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const request = require('request');
const querystring = require('querystring');
const logger = require('../config/winston');

const jwtRequired = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res) => {
  res.send('success');
});

router.post('/login', async (req, res, next) => {
  logger.info('Attempting login');
  passport.authenticate('login', { session: false }, async (error, user) => {
    try {
      if (error || !user) {
        logger.error(`An error occurred during login: ${error} - User: ${user}`);
        return next(error);
      }
      const userReturnObject = {
        _id: user._id,
        username: user.username,
        name: user.name,
      };
      req.session.jwt = jwt.sign(userReturnObject, process.env.JWT_SECRET_KEY);
      return res.send(userReturnObject);
    } catch (err) {
      logger.error(`An error occurred during login: ${err}`);
      return next(err);
    }
  })(req, res, next);
});

router.get('/current-session', (req, res) => {
  jwt.verify(req.session.jwt, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err || !decodedToken) {
      res.send(null);
    } else {
      res.send(decodedToken);
    }
  });
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.send('Successfully logged out.');
});

router.get('/secure-route', jwtRequired, (req, res) => {
  res.send({ message: 'You have reached the protected endpoint' });
});

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/spotify/login', (req, res) => {
  const scope = 'user-read-private user-read-email';
  const state = generateRandomString(16);
  req.session.state = state;
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: process.env.MUSER_CLIENT_ID,
      scope,
      redirect_uri: process.env.MUSER_REDIRECT_URI,
      state,
    })}`,
  );
});

router.get('/spotify/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.session.state || null;
  if (state === null || state !== storedState) {
    res.status(401).send({
      message: 'An error occured during spotify authentication. Please do it properly next time.',
    });
  } else {
    req.session.state = null;
    const clientId = process.env.MUSER_CLIENT_ID;
    const secret = process.env.MUSER_SECRET;
    const basicHeader = new Buffer.from(`${clientId}:${secret}`).toString('base64');
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: process.env.MUSER_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${basicHeader}`,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const spotifyAccess = {
          accessToken: body.access_token,
          refreshToken: body.refresh_token,
        };
        req.session.spotifyJWT = jwt.sign(spotifyAccess, process.env.JWT_SECRET_KEY);
        res.redirect('/');
      } else {
        logger.error(error);
        res.status(500).send({
          message: 'an error occurred',
        });
      }
    });
  }
});

router.get('/current-spotify-session', (req, res) => {
  jwt.verify(req.session.spotifyJWT, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err || !decodedToken) {
      res.send(null);
    } else {
      res.send(decodedToken);
    }
  });
});

module.exports = router;
