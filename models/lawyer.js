const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  barId: { type: String, ref: 'Bar', required: true },
  //profile: { type: String },
  availability: { type: Boolean, default: false },
  // Add other fields as needed
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
});
 module.exports=mongoose.model('Lawyer', lawyerSchema);
