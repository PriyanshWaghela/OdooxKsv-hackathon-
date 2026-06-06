const express = require('express');
const router = express.Router();
const RFQ = require('../models/RFQ');
const Quotation = require('../models/Quotation');
const PO = require('../models/PO');

router.get('/activity', async (req, res) => {
  try {
    const rfqs = await RFQ.find().lean();
    const quotes = await Quotation.find().populate('vendor', 'companyName').lean();
    const pos = await PO.find().populate('vendor', 'companyName').lean();

    const activities = [];

    rfqs.forEach(r => {
      activities.push({
        id: 'rfq_' + r._id,
        type: 'RFQ_CREATED',
        title: 'New RFQ Published',
        description: `RFQ "${r.title}" was published by ${r.createdBy}.`,
        date: r.createdAt
      });
    });

    quotes.forEach(q => {
      activities.push({
        id: 'quote_' + q._id,
        type: 'QUOTE_SUBMITTED',
        title: 'Quote Received',
        description: `${q.vendor?.companyName || 'A vendor'} submitted a binding quote of $${q.amount.toLocaleString()} for RFQ ${q.rfq.toString().substring(0, 8)}.`,
        date: q.createdAt
      });
    });

    pos.forEach(p => {
      activities.push({
        id: 'po_' + p._id,
        type: 'PO_GENERATED',
        title: 'Purchase Order Issued',
        description: `Official PO (${p.poNumber}) was issued to ${p.vendor?.companyName || 'a vendor'} for $${p.totalAmount?.toLocaleString() || p.amount?.toLocaleString()}.`,
        date: p.createdAt
      });
    });

    // Sort descending by date
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error generating activity log' });
  }
});

module.exports = router;
