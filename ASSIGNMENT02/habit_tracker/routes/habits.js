const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.render('habits/index', { 
      title: 'Your Habits', 
      habits 
    });
  } catch (error) {
    console.error('Error fetching habits:', error.message);
    res.status(500).render('error', { 
      message: 'Error fetching habits', 
      error 
    });
  }
});

// Render the habit creation form
router.get('/create', (req, res) => {
  res.render('habits/create', { title: 'Create Habit' });
});

// Create a new habit
router.post('/create', async (req, res) => {
  const { name, description, frequency } = req.body;
  try {
    const habit = new Habit({ name, description, frequency });
    await habit.save();
    res.redirect('/habits');
  } catch (error) {
    console.error('Error creating habit:', error.message);
    res.status(500).render('habits/create', { 
      title: 'Create Habit', 
      error: 'An error occurred while creating the habit. Please try again.' 
    });
  }
});

// Display the habit edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).render('error', { 
        message: 'Habit not found' 
      });
    }
    res.render('habits/edit', { 
      title: 'Edit Habit', 
      habit 
    });
  } catch (error) {
    console.error('Error fetching habit:', error.message);
    res.status(500).render('error', { 
      message: 'An error occurred while fetching the habit.', 
      error 
    });
  }
});

// Update a habit
router.post('/edit/:id', async (req, res) => {
  const { name, description, frequency, progress } = req.body;
  const formattedProgress = progress ? progress.map((entry) => ({
    date: new Date(entry.date),
    completed: entry.completed === 'on'
  })) : [];

  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { name, description, frequency, progress: formattedProgress },
      { new: true }
    );
    if (!habit) {
      return res.status(404).render('error', { 
        message: 'Habit not found' 
      });
    }
    res.redirect('/habits');
  } catch (error) {
    console.error('Error updating habit:', error.message);
    res.status(500).render('habits/edit', { 
      title: 'Edit Habit', 
      error: 'An error occurred while updating the habit. Please try again.', 
      habit: { _id: req.params.id, name, description, frequency, progress }
    });
  }
});

// Delete a habit
router.post('/:id/delete', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) {
      return res.status(404).render('error', { 
        message: 'Habit not found' 
      });
    }
    res.redirect('/habits');
  } catch (error) {
    console.error('Error deleting habit:', error.message);
    res.status(500).render('error', { 
      message: 'An error occurred while deleting the habit.', 
      error 
    });
  }
});

module.exports = router;
