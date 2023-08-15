const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  // Add other fields as needed
});
const Reservation= mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;