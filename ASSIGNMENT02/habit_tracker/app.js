require('dotenv').config(); // Load environment variables
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs'); // Import hbs for partials registration
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const habitsRouter = require('./routes/habits'); // Habits router

const app = express();

// Debug MongoDB URI
console.log('MongoDB URI:', process.env.MongoDB_URI);

// MongoDB connection
mongoose
  .connect(process.env.MongoDB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register partials directory
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register custom helpers
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(
  session({
    secret: 'your-secret-key', // Use a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Passport.js initialization
require('./config/passport')(passport); // Initialize passport
app.use(passport.initialize());
app.use(passport.session()); // Use session for authentication

// Flash messages middleware
app.use(flash());

// Make flash messages available to all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter); // Include users routes
app.use('/habits', habitsRouter); // Include habits routes

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
