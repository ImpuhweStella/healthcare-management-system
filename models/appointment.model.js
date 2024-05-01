// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctor: { type: String, required: true },
  department: { type: String },
  type: { type: String, enum: ['checkup', 'consultation', 'procedure'], required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
