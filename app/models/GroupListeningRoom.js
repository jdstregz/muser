const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports.EVERYONE_CONTROL_SETTINGS = 0;
module.exports.OWNER_CONTROL_SETTINGS = 1;
module.exports.EVERYONE_QUEUE_SETTINGS = 2;

const GroupListeningRoomSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    roomName: String,
    description: String,
    passcode: String,
    private: Boolean,
    settings: Number,
    members: { type: Map, of: String },
  },
  { timestamps: true },
);

const GroupListeningRoomSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    roomId: String,
    roomName: String,
  },
  { timestamps: true },
);

GroupListeningRoomSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passcode;
  return obj;
};

mongoose.model('GroupListeningRoomSession', GroupListeningRoomSessionSchema);
mongoose.model('GroupListeningRoom', GroupListeningRoomSchema);
