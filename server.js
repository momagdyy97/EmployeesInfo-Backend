const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
try {
  const itemsRoutes = require('./routes/items');
  app.use('/api', itemsRoutes);
} catch (err) {
  console.error('Error loading routes:', err.message || err);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1); // Exit the application if there's a connection failure
  });

// Fallback route for unknown routes
app.use((req, res, next) => {
  res.status(404).send({ message: 'Route not found' });
});

// Listen on port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
