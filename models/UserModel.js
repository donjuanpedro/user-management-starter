const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    Type: String
  },
  activated: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userSchema);
