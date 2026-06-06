# VendorBridge - Enterprise Procurement System

VendorBridge is a centralized procurement hub designed to streamline vendor relations, Request for Quotation (RFQ) cycles, purchase orders, and financial compliance. It provides role-based access for Procurement Officers, Approvers, and Vendors to seamlessly collaborate and track the entire procurement lifecycle.

## 🌟 Features

* **Role-Based Access Control**: Tailored experiences and permissions for Procurement Officers, Approvers, and Vendors.
* **Smart Vendor Registry**: A searchable, filterable database of registered suppliers.
* **RFQ Management**: Create, publish, and track Requests for Quotations.
* **Automated Bid Matrix**: Side-by-side comparison of vendor bids to easily identify the best offers.
* **Purchase Orders & Invoices**: Generate POs and automated PDF invoices upon approval.
* **Real-time Activity Logging**: Comprehensive audit trails tracking all procurement actions.
* **Dashboard & Analytics**: Live tracking of total spend, active RFQs, and monthly trends using dynamic charts.

## 🛠️ Tech Stack

### Frontend
* **React** (v18)
* **React Router** for navigation
* **Tailwind CSS** for modern, responsive styling
* **Recharts** for data visualization
* **html2pdf.js** for client-side invoice PDF generation
* **Lucide React** & **Material Symbols** for icons

### Backend
* **Node.js** with **Express**
* **MongoDB** & **Mongoose** for data storage
* **bcryptjs** for secure password hashing
* **JSON Web Tokens (JWT)** for authentication

## 📂 Project Structure

```
vendorBridge/
├── frontend/               # React Frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Sidebar, Layout, etc.)
│   │   ├── context/        # React Context (Auth context)
│   │   ├── pages/          # Main views (Dashboard, RFQs, Invoice, LandingPage, etc.)
│   │   └── App.jsx         # Main router and route protection
│   └── package.json
├── models/                 # Mongoose Data Models (User, RFQ, Quotation, PO)
├── routes/                 # Express API Routes (auth, dashboard, pos, rfqs, vendors, etc.)
├── config/                 # Database configuration
├── seeds.js                # Database seeder with dummy data
├── server.js               # Main Express entry point
└── package.json            # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
* Node.js (v16 or higher)
* MongoDB (running locally or a MongoDB Atlas URI)

### Installation

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd vendorBridge
   ```

2. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Configuration:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vendorbridge
   JWT_SECRET=your_super_secret_key_here
   ```

5. **Seed the Database (Optional but recommended for testing):**
   The application will automatically seed initial data (Admin, Approver, Vendors, and sample RFQs) when the server starts if the database is empty. Default password for seeded accounts is `password123`.

### Running the Application

1. **Start the Backend Server:**
   ```bash
   node server.js
   ```
   *The server will run on `http://localhost:5000`*

2. **Start the Frontend Development Server:**
   Open a new terminal and run:
   ```bash
   cd frontend
   npm start
   ```
   *The React app will open at `http://localhost:3000`*

## 👥 Default Test Accounts
If the database was seeded, you can log in using:
* **Procurement Officer**: `admin@vendorbridge.io`
* **Approver**: `approver@vendorbridge.io`
* **Vendor 1**: `sales@techsolutions.com`
* **Vendor 2**: `bids@globalsystems.com`
*(Password for all: `password123`)*

---
*VendorBridge - Turn complex workflows into effortless tasks.*
