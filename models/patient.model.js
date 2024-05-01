
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String },
  address: { 
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  medicalHistory: {
    allergies: [String],
    conditions: [String],
    surgeries: [String],
    medications: [String],
    familyHistory: {
      conditions: [String],
      members: [{
        relation: String,
        age: Number,
        conditions: [String]
      }]
    }
  },
  insurance: {
    provider: String,
    policyNumber: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  }
});

module.exports = mongoose.model('Patient', patientSchema);
