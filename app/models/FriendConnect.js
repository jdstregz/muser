const mongoose = require('mongoose');

const { Schema } = mongoose;

const FriendConnectSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  friend: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('Friend', FriendConnectSchema);
