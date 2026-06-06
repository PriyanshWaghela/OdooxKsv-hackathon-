const bcrypt = require('bcryptjs');
const RFQ = require('./models/RFQ');
const Quotation = require('./models/Quotation');
const User = require('./models/User');

async function seedDatabase() {
  try {
    const rfqCount = await RFQ.countDocuments();
    if (rfqCount > 0) return; // Already seeded

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Dummy Users
    const admin = new User({ email: 'admin@vendorbridge.io', password: 'password123', role: 'Procurement Officer' });
    const approver = new User({ email: 'approver@vendorbridge.io', password: 'password123', role: 'Approver' });
    const vendor1 = new User({ email: 'sales@techsolutions.com', password: hashedPassword, role: 'Vendor', companyName: 'TechSolutions Inc.' });
    const vendor2 = new User({ email: 'bids@globalsystems.com', password: hashedPassword, role: 'Vendor', companyName: 'Global Systems Ltd' });

    // Note: To allow testing without hashing complexity, let's just use the hashed password for all.
    admin.password = hashedPassword;
    approver.password = hashedPassword;

    await Promise.all([admin.save(), approver.save(), vendor1.save(), vendor2.save()]);

    // Create RFQs
    const rfq1 = new RFQ({ title: 'IT Equipment Refresh Q3', description: 'Procurement of 50 laptops and 20 monitors', status: 'Pending', createdBy: 'Procurement Officer' });
    const rfq2 = new RFQ({ title: 'Office Furniture', description: 'Ergonomic chairs for new wing', status: 'Quoted', createdBy: 'Procurement Officer' });
    const rfq3 = new RFQ({ title: 'Cloud Hosting Services', description: 'AWS Enterprise Support renewal', status: 'Approved', createdBy: 'Procurement Officer' });
    const rfq4 = new RFQ({ title: 'Marketing Materials', description: 'Q4 Event banners and swags', status: 'PO_Generated', createdBy: 'Procurement Officer' });

    await Promise.all([rfq1.save(), rfq2.save(), rfq3.save(), rfq4.save()]);

    // Create Quotes for RFQ1
    const quote1 = new Quotation({ rfq: rfq1._id, vendor: vendor1._id, amount: 45000, deliveryDate: new Date(Date.now() + 14 * 86400000) });
    const quote2 = new Quotation({ rfq: rfq1._id, vendor: vendor2._id, amount: 42500, deliveryDate: new Date(Date.now() + 21 * 86400000) });
    
    await Promise.all([quote1.save(), quote2.save()]);

    console.log('Mock database seeded successfully. Default password for all accounts is: password123');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = seedDatabase;
