// models/RFQ.js
const mongoose = require('mongoose');

const RFQSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Quoted', 'Approved', 'PO_Generated'], default: 'Pending' },
  createdBy: { type: String, default: 'Procurement Officer' },
}, { timestamps: true });

module.exports = mongoose.model('RFQ', RFQSchema);
