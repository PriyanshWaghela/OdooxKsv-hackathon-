// routes/rfqs.js
const express = require('express');
const router = express.Router();
const RFQ = require('../models/RFQ');

// GET all RFQs
router.get('/rfqs', async (req, res) => {
  try {
    const rfqs = await RFQ.find().sort({ createdAt: -1 });
    res.json(rfqs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new RFQ
router.post('/rfqs', async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const newRFQ = new RFQ({ title, description, createdBy, status: 'Pending' });
    const saved = await newRFQ.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

module.exports = router;
