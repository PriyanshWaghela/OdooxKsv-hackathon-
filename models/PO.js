const mongoose = require('mongoose');

const POSchema = new mongoose.Schema({
  poNumber: { type: String, required: true, unique: true },
  rfq: { type: mongoose.Schema.Types.ObjectId, ref: 'RFQ', required: true },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Generated', 'Invoiced', 'Paid'], 
    default: 'Generated' 
  }
}, { timestamps: true });

module.exports = mongoose.model('PO', POSchema);
