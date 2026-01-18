require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Model
const Lead = require('../database/leadModel')(mongoose);

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ng-t1-project';
    console.log(`Attempting to connect to MongoDB at: ${mongoURI}`);
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Ensure you have MongoDB installed locally or use a MongoDB Atlas URI in .env');
    // We don't exit here so the server can still start (though DB calls will fail)
    // This helps debug network issues vs DB issues
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// POST endpoint to receive leads
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Basic Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check DB Connection state
    if (mongoose.connection.readyState !== 1) {
       return res.status(503).json({ 
         message: 'Database not connected. Please check server logs.' 
       });
    }

    // Create new lead
    const lead = await Lead.create({
      name,
      email,
      phone
    });

    res.status(201).json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: error.message 
    });
  }
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
