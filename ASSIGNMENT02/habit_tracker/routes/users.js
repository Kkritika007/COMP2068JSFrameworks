const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Import the User model
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Login Page Route (GET)
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

// Register Page Route (GET)
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

// Register Page Route (POST)
router.post('/register', async function (req, res, next) {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).render('register', {
      title: 'Register',
      error: 'All fields are required!',
    });
  }

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).render('register', {
      title: 'Register',
      error: 'Email is already taken!',
    });
  }

  try {
    // Create a new user and save it to the database
    const newUser = new User({ username, email, password });
    await newUser.save(); // Save the user to the database

    console.log('Registered user:', { username, email });

    // Redirect to the login page after successful registration
    req.flash('success_msg', 'You are now registered and can log in!');
    res.redirect('/users/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).render('register', {
      title: 'Register',
      error: 'Something went wrong. Please try again later.',
    });
  }
});

// Login Page Handle (POST)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/habits', // Redirect to habits page if login is successful
  failureRedirect: '/users/login', // Redirect to login page if login fails
  failureFlash: true,
}));

// Logout Handle
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success_msg', 'You have been logged out!');
    res.redirect('/users/login');
  });
});

module.exports = router;
