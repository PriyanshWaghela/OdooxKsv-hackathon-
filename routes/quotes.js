const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation');
const RFQ = require('../models/RFQ');

// GET all quotations
router.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quotation.find().populate('vendor', 'companyName email role');
    res.json(quotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new quotation
router.post('/quotes', async (req, res) => {
  try {
    const { rfq, vendor, amount, deliveryDate, notes } = req.body;
    const newQuote = new Quotation({ rfq, vendor, amount, deliveryDate, notes, createdAt: new Date() });
    const saved = await newQuote.save();

    // Update RFQ status
    await RFQ.findByIdAndUpdate(rfq, { status: 'Quoted' });

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

// POST to reject a quote
router.post('/quotes/:id/reject', async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quote rejected successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error rejecting quote' });
  }
});

module.exports = router;
