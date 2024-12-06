const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.render('habits/index', { habits });
  } catch (error) {
    res.status(500).send('Error fetching habits: ' + error.message);
  }
});

// Render the habit creation form
router.get('/create', (req, res) => {
  res.render('habits/create');
});

// Create a new habit
router.post('/create', async (req, res) => {
  const { name, description, frequency } = req.body;
  try {
    const habit = new Habit({ name, description, frequency });
    await habit.save();
    res.redirect('/habits');
  } catch (error) {
    res.status(500).send('Error creating habit: ' + error.message);
  }
});

// Display Edit Form
router.get('/edit/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).send('Habit not found');
    }
    res.render('habits/edit', { habit });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error finding habit');
  }
});

// Update Habit
router.post('/edit/:id', async (req, res) => {
  const { name, description, frequency } = req.body;
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, { name, description, frequency }, { new: true });
    if (!habit) {
      return res.status(404).send('Habit not found');
    }
    res.redirect('/habits');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating habit');
  }
});

// Delete a habit
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
    await Habit.findByIdAndDelete(id);
    res.redirect('/habits');
  } catch (error) {
    res.status(500).send('Error deleting habit: ' + error.message);
  }
});

module.exports = router;
