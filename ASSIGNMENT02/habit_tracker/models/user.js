var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Create the User schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Add passport-local-mongoose plugin for authentication methods
userSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('User', userSchema);
