const express = require('express');
const router = express.Router();

// Home Page Route
router.get('/', (req, res) => {
  console.log('Accessed Home Page');
  res.render('home', { title: 'Home' }); // Pass title for dynamic rendering
});

// About Me Page Route
router.get('/about', (req, res) => {
  console.log('Accessed About Me Page');
  res.render('about', { title: 'About Me' }); // Pass title
});

// Projects Page Route
router.get('/projects', (req, res) => {
  console.log('Accessed Projects Page');
  res.render('projects', { title: 'Projects' }); // Pass title
});

// Contact Me Page Route
router.get('/contact', (req, res) => {
  console.log('Accessed Contact Me Page');
  res.render('contact', { title: 'Contact Me' }); // Pass title
});

module.exports = router;
