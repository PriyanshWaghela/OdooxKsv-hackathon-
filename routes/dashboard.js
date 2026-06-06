const express = require('express');
const router = express.Router();
const RFQ = require('../models/RFQ');
const Quotation = require('../models/Quotation');
const PO = require('../models/PO');

// GET dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalQuotations = await Quotation.countDocuments();
    const activeRFQs = await RFQ.countDocuments({ status: { $in: ['Pending', 'Quoted'] } });
    const pendingApprovals = await RFQ.countDocuments({ status: 'Quoted' });
    
    const purchaseOrdersList = await PO.find();
    let totalSpend = 0;
    let pendingInvoices = 0;
    purchaseOrdersList.forEach(po => {
      totalSpend += po.amount || 0;
      if (po.status !== 'Paid') pendingInvoices++;
    });
    
    const purchaseOrders = purchaseOrdersList.length;

    // Fetch actual vendors for the leaderboard (using User model)
    const User = require('../models/User');
    const vendors = await User.find({ role: 'Vendor' }).limit(5);
    
    // Create a mock score based on data or random for MVP
    const topVendors = vendors.map((v, i) => ({
      name: v.companyName || v.email.split('@')[0],
      score: 95 - i * 2, // Dummy scoring logic for now
      performance: `+${(Math.random() * 10).toFixed(1)}%`
    }));

    res.json({
      totalQuotations,
      activeRFQs,
      pendingApprovals,
      purchaseOrders,
      totalSpend,
      pendingInvoices,
      topVendors
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error generating dashboard stats' });
  }
});

// GET chart data (Quotes over time)
router.get('/dashboard/chart', async (req, res) => {
  try {
    const quotes = await Quotation.find().sort('createdAt');
    // Group by date string (e.g. "MMM DD")
    const chartData = {};
    quotes.forEach(q => {
      const dateStr = new Date(q.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!chartData[dateStr]) chartData[dateStr] = 0;
      chartData[dateStr] += 1;
    });

    // Format for recharts
    const formattedData = Object.keys(chartData).map(date => ({
      date,
      Quotes: chartData[date]
    }));

    // If no quotes, send some default dummy to make chart look okay
    if (formattedData.length === 0) {
      return res.json([
        { date: 'Jun 1', Quotes: 0 },
        { date: 'Jun 2', Quotes: 0 },
        { date: 'Jun 3', Quotes: 0 },
      ]);
    }

    res.json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error generating chart data' });
  }
});

module.exports = router;
