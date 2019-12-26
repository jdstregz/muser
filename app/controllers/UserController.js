const mongoose = require('mongoose');

const User = mongoose.model('User');
const Friend = mongoose.model('Friend');
const FriendRequest = mongoose.model('FriendRequest');

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

exports.getOutgoingFriendRequests = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const requests = await FriendRequest.find({ sender: req.user._id });
    return res.send(requests);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred',
    });
  }
};

exports.getIncomingFriendRequests = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const requests = await FriendRequest.find({ receiver: req.user._id });
    return res.send(requests);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: 'An error occurred',
    });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    if (!req.user || !req.user._id || !req.body.receiverId) {
      return res.status(400).send({
        message: 'Bad Request',
      });
    }
    const existingRequest = await FriendRequest.findOne({
      $or: [
        {
          sender: req.user._id,
          receiver: req.body.receiverId,
        },
        {
          sender: req.body.receiverId,
          receiver: req.user._id,
        },
      ],
    });
    // TODO: write logic to check if either are already friend with eachother
    if (existingRequest) {
      return res.status(409).send({
        message: 'Friend request already exists',
      });
    }
    const newRequest = new FriendRequest({
      sender: req.user._id,
      receiver: req.body.receiverId,
      senderName: req.user.username,
      receiverName: req.body.receiverName,
    });
    await newRequest.save();
    return res.send(newRequest);
  } catch (err) {
    logger.error(`An error occurred when friend requesting: ${err}`);
    return res.status(500).send({
      message: 'An error occurred',
    });
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

exports.acceptFriendRequest = async (req, res) => {
  try {
    if (!req.user || !req.user._id ||
      !req.body.sender || !req.body.receiver) {
      return res.status(400).send({
        message: 'Bad Request'
      })
    }

    const existingRequest = await FriendRequest.findOne({
      receiver: req.user._id,
      sender: req.body.sender,
      _id: req.body._id
    });

    if (existingRequest) {

      const user1 = await User.findOne({
        _id: existingRequest.receiver
      });
      const user2 = await User.findOne({
        _id: existingRequest.sender
      })
      user1.friends.push(new Friend({
        userId: existingRequest.sender,
        username: existingRequest.senderName,
        bestFriend: false,
      }));

      user2.friends.push(new Friend({
        userId: existingRequest.receiver,
        username: existingRequest.receiverName,
        bestFriend: false
      }))

      await user1.save();
      await user2.save();

      await FriendRequest.deleteOne({
        receiver: req.user._id,
        sender: req.body.sender,
        _id: req.body._id
      });

      return res.send(user1.friends);
    }

  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: "An error occurred"
    });
  }
}