
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

// exports.scheduleAppointment = async (req, res) => {
//   try {
//     const { patientId, date, time, doctor, department, type, notes } = req.body;
//     const patient = await Patient.findById(patientId);
//     if (!patient) throw new Error('Patient not found');
//     const appointment = new Appointment({ patient, date, time, doctor, department, type, notes });
//     await appointment.save();
//     res.status(201).json({ message: 'Appointment scheduled successfully', appointment });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to schedule appointment', error: error.message });
//   }
// };




const sendEmail = async (email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: 'stellahimpuhwe346@gmail.com',
    to: email,
    subject: 'Appointment Confirmation',
    text: message
  };

  await transporter.sendMail(mailOptions);
};

exports.scheduleAppointment = async (req, res) => {
  try {
    const { patientId, date, time, doctor, department, type, notes } = req.body;
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error('Patient not found');
    const appointment = new Appointment({ patient, date, time, doctor, department, type, notes });
    await appointment.save();

    // Send confirmation email
    await sendEmail(patient.email, 'Your appointment has been scheduled successfully.');

    // Schedule reminder
    const reminderDate = new Date(date);
    reminderDate.setHours(reminderDate.getHours() - 1); // Send reminder 1 hour before appointment
    schedule.scheduleJob(reminderDate, async function() {
      await sendEmail(patient.email, `Appointment Reminder: Your appointment with ${doctor} is scheduled for ${date} at ${time}.`);
    });

    res.status(201).json({ message: 'Appointment scheduled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule appointment', error: error.message });
  }
};


exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patient');
    if (!appointment) throw new Error('Appointment not found');
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: 'Appointment not found', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('patient');
    if (!appointment) throw new Error('Appointment not found');
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(404).json({ message: 'Appointment not found', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) throw new Error('Appointment not found');
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Appointment not found', error: error.message });
  }
};
