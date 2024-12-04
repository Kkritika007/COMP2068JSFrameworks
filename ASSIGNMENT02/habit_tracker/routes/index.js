var express = require('express');
var router = express.Router();

console.log("MongoDB URI is:", process.env.MONGO_URI);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Habit Tracker' }); // Renders the "index.hbs" view
});

module.exports = router;
