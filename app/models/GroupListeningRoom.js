const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupListeningRoomMemberSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  username: String,
});

const MessageSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  message: String,
}, {timestamps: true});

const GroupListeningRoomSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  passcode: String,
  users: [GroupListeningRoomMemberSchema],
  public: Boolean,
  messages: [MessageSchema],
},
{ timestamps: true }
);

mongoose.model('Message', MessageSchema);
mongoose.model('GroupListeningRoomMember', GroupListeningRoomMemberSchema);
mongoose.model('GroupListeningRoom', GroupListeningRoomSchema);
