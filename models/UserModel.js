const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  bio: {
    type: String,
  },
  img: {
    data: Buffer,
    type: String
  },
  activated: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userSchema);
