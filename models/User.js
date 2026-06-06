// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Procurement Officer', 'Vendor', 'Approver'], 
    default: 'Vendor' 
  },
  companyName: { type: String }, // For Vendors
  resetPasswordCode: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
