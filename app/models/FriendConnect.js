const mongoose = require('mongoose');

const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  senderName: String,
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverName: String,
});

mongoose.model('FriendRequest', FriendRequestSchema);
