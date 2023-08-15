const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityId:{type:mongoose.Schema.Types.ObjectId, required:true},
  name: { type: String, required: true },
  state: { type: String, required: true },
  // Add other fields as needed
});

module.exports = mongoose.model('City', citySchema);