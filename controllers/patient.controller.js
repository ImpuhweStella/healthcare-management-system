const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: 'Patient created successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create patient', error: error.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patients', error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) throw new Error('Patient not found');
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({ message: 'Patient not found', error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) throw new Error('Patient not found');
    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    res.status(404).json({ message: 'Patient not found', error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) throw new Error('Patient not found');
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Patient not found', error: error.message });
  }
};
