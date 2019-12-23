const mongoose = require('mongoose');

const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('Friend', FriendRequestSchema);
