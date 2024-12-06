const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Check if the Users model is already defined
const Users = mongoose.models.Users || mongoose.model('Users', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}));

module.exports = Users;
