const express = require('express');
const mongoose = require('mongoose');
// const authRoutes = require('./routes/');
// const patientRoutes = require('./routes/patient');
// const appointmentRoutes = require('./routes/appointment');
// const feedbackRoutes = require('./routes/feedback');
require('dotenv').config();
const { MONGO_URI } = process.env;

const app = express();

// Middleware
app.use(express.json());

// Routes
// app.use('/auth', authRoutes);
// app.use('/patients', patientRoutes);
// app.use('/appointments', appointmentRoutes);
// app.use('/feedback', feedbackRoutes); 

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));
