var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Habit Tracker' });
});

// Placeholder route for habits
router.get('/habits', function(req, res, next) {
  res.send('Habits page coming soon!');
});

module.exports = router;
