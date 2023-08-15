const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: { type: Number },
  longitude: { type: Number },
  cityId: { type: String, ref: 'City', required: true },
});

module.exports = mongoose.model('Location', locationSchema);
