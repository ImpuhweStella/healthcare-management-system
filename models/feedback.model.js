
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
