const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Create Express application
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(express.json()); // Parse JSON data in the request body

// Routes
app.use('/auth', require('./authRoutes'));
app.use('/', require('./appRoutes'));

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Connect to MongoDB and start the server
mongoose
  .connect('mongodb://127.0.0.1:27017/api-security', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000, () => {
      console.log('Server listening on http://localhost:4000');
    });
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
