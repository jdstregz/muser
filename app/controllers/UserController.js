const mongoose = require('mongoose');

const User = mongoose.model('User');

const logger = require('../config/winston');

exports.getUserFriends = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    const userData = await User.findOne({ _id: req.user._id });
    if (userData) {
      return res.send(userData.friends);
    }
    return res.send(null);
  } catch (err) {
    logger.error(`An error occurred when getting user friends: ${err}`);
    return res.send('An error occured');
  }
};

exports.searchUsersForUsername = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    if (!req.body.search) {
      return res.status(400).send({
        message: 'Bad Request',
      });
    }
    const userData = await User.find(
      { username: new RegExp(req.body.search, 'i') },
      'username _id',
    );
    return res.send(userData);
  } catch (err) {
    logger.error('An error occurred when searching for a user');
    return res.send('An error occurred');
  }
};
