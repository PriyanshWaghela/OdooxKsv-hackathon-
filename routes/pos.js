const express = require('express');
const router = express.Router();
const PO = require('../models/PO');
const RFQ = require('../models/RFQ');
const Quotation = require('../models/Quotation');
const nodemailer = require('nodemailer');

// POST a new Purchase Order
router.post('/pos', async (req, res) => {
  try {
    const { rfqId, quoteId, vendorId, amount } = req.body;
    
    // Check if PO already exists for this RFQ to prevent duplicates
    const existingPO = await PO.findOne({ rfq: rfqId });
    if (existingPO) {
      return res.status(400).json({ message: 'A Purchase Order has already been generated for this RFQ.' });
    }

    const taxAmount = amount * 0.10; // 10% dummy tax
    const totalAmount = amount + taxAmount;
    const poNumber = 'PO-' + Date.now().toString().slice(-6);

    const newPO = new PO({
      poNumber,
      rfq: rfqId,
      quote: quoteId,
      vendor: vendorId,
      amount,
      taxAmount,
      totalAmount
    });

    const savedPO = await newPO.save();

    // Update RFQ status to PO_Generated
    await RFQ.findByIdAndUpdate(rfqId, { status: 'PO_Generated' });

    // Update the winning Quotation status to Accepted
    await Quotation.findByIdAndUpdate(quoteId, { status: 'Accepted' });

    // Reject other pending quotations for this RFQ
    await Quotation.updateMany(
      { rfq: rfqId, _id: { $ne: quoteId } },
      { status: 'Rejected' }
    );

    res.status(201).json(savedPO);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error generating PO' });
  }
});

// GET all Purchase Orders
router.get('/pos', async (req, res) => {
  try {
    const pos = await PO.find()
      .populate('rfq')
      .populate('vendor', 'companyName email');
    res.json(pos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching POs' });
  }
});

// POST to send an invoice email via Nodemailer
router.post('/invoices/send', async (req, res) => {
  try {
    const { poNumber, vendorName, amount, taxAmount, totalAmount, recipientEmail } = req.body;

    // Generate Ethereal test account automatically
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0A192F; padding: 24px; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Invoice for ${poNumber}</h1>
          <p style="margin: 8px 0 0; color: #94a3b8;">VendorBridge Procurement System</p>
        </div>
        <div style="padding: 24px;">
          <h2 style="color: #334155; margin-top: 0;">Vendor: ${vendorName}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Subtotal</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">$${amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Tax (10%)</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">$${taxAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 16px 0; color: #0f172a; font-weight: bold; font-size: 18px;">Total Due</td>
              <td style="padding: 16px 0; text-align: right; color: #2563eb; font-weight: bold; font-size: 18px;">$${totalAmount.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; color: #64748b; font-size: 14px;">
          Please process payment within 30 days.
        </div>
      </div>
    `;

    let info = await transporter.sendMail({
      from: '"VendorBridge Billing" <billing@vendorbridge.io>',
      to: recipientEmail || "procurement@vendorbridge.io",
      subject: `Invoice generated for ${poNumber}`,
      html: htmlContent,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    
    // Update PO status
    await PO.findOneAndUpdate({ poNumber }, { status: 'Invoiced' });

    res.json({ message: "Email sent successfully!", previewUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending email' });
  }
});

module.exports = router;
