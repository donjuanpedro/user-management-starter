const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  bio: String,
  activated: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userSchema);
