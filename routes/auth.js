const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Register User
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, companyName } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      email,
      password: hashedPassword,
      role: role || 'Vendor',
      companyName
    });

    await user.save();

    // Create payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        email: user.email
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token, user: payload.user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        email: user.email
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload.user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
