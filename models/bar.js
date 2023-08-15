const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  barId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  // Add other fields as needed
});

module.exports = mongoose.model('Bar', barSchema);
