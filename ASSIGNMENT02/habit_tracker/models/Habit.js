const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
    required: true
  },
  progress: [
    {
      date: { type: Date, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model('Habit', habitSchema);
