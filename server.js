// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const rfqRoutes = require('./routes/rfqs');
const quoteRoutes = require('./routes/quotes');
const vendorRoutes = require('./routes/vendors');
const poRoutes = require('./routes/pos');
const dashboardRoutes = require('./routes/dashboard');
const activityRoutes = require('./routes/activity');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const seedDatabase = require('./seeds');
connectDB().then(() => {
  seedDatabase();
});

// Routes
app.use('/api', authRoutes);
app.use('/api', rfqRoutes);
app.use('/api', quoteRoutes);
app.use('/api', vendorRoutes);
app.use('/api', poRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
