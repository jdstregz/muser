const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const FriendSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  bestFriend: Boolean,
});

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    email: String,
    friends: [FriendSchema],
  },
  { timestamps: true },
);

UserSchema.methods.encryptPassword = async function() {
  this.password = await bcrypt.hash(this.password, 10);
};

UserSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

mongoose.model('Friend', FriendSchema);
mongoose.model('User', UserSchema);
