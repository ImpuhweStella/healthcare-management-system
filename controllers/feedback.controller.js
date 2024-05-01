const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { patientId, doctor, rating, comment } = req.body;
    const feedback = new Feedback({ patient: patientId, doctor, rating, comment });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

exports.getFeedbackForDoctor = async (req, res) => {
  try {
    const doctorName = req.params.doctor;
    const feedback = await Feedback.find({ doctor: doctorName }).populate('patient');
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedback', error: error.message });
  }
};
