const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Habit name is required
  description: { type: String, default: '' }, // Optional habit description
  createdAt: { type: Date, default: Date.now }, // Automatically sets creation date
  frequency: { 
    type: String, 
    enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'], // Updated enum to allow more frequency options
    required: true 
  },
  progress: [
    {
      date: { type: Date, required: true }, // Date of progress
      completed: { type: Boolean, default: false }, // Whether the habit was completed on the date
    },
  ],
});

module.exports = mongoose.model('Habit', habitSchema);
