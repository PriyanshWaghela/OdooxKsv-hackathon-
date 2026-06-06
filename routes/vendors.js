// routes/vendors.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all vendors
router.get('/vendors', async (req, res) => {
  try {
    const vendors = await User.find({ role: 'Vendor' }).select('-password');
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
