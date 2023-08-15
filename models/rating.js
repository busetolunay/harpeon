const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  //ratingId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer', required: true },
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer', required: true },
  comment: { type: String },
  stars: { type: Number, required: true },
  // Add other fields as needed
});

module.exports = mongoose.model('Rating', ratingSchema);

// m
