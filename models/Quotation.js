// models/Quotation.js
const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  rfq: { type: mongoose.Schema.Types.ObjectId, ref: 'RFQ', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  deliveryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quotation', QuotationSchema);
