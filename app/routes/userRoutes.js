const express = require('express');

const passport = require('passport');

const jwtRequired = passport.authenticate('jwt', { session: false });
const router = express.Router();

router.get('/search/:user', jwtRequired);
