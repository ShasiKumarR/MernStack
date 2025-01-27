const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
