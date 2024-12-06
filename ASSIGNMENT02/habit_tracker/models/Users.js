const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const UserSchema = new mongoose.Schema({
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
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Add a method to compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if model already exists before defining it again
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
