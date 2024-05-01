const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
     unique: true 
    },
  password: { 
    type: String, 
    required: true
 },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' }
});

module.exports = mongoose.model('AuthUser', authUserSchema);
