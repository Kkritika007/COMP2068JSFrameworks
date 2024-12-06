const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Ensure that the User model is required only once
const User = require('../models/Users');

module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      // Check if the password is correct
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      // Return the user if authentication is successful
      return done(null, user);
    } catch (err) {
      console.error('Error during authentication:', err);
      return done(err);
    }
  }));

  // Serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
