# VendorBridge MVP Task List

## Backend (completed)
- [x] Initialize Node project and install dependencies (express, cors, mongoose, jsonwebtoken, dotenv)
- [x] Create server.js with CORS and JSON parsing
- [x] Add MongoDB connection helper (`config/db.js`)
- [x] Define Mongoose models: User, RFQ, Quotation
- [x] Implement auth route (`routes/auth.js`) with dummy JWT
- [x] Implement RFQ routes (`routes/rfqs.js`)
- [x] Implement Quote routes (`routes/quotes.js`)
- [x] Add .env placeholders (PORT, MONGODB_URI, JWT_SECRET)
- [x] Start backend server on port 5000

## Frontend Development
- [/] Initialize React project with Vite
- [/] Install Tailwind CSS and configure
- [/] Set up Vite proxy to backend (http://localhost:5000)
- [/] Create basic component structure (App, Dashboard, etc.)
- [/] Ensure app runs on port 5173
- [ ] Write documentation and usage notes

The backend is running and ready to serve API requests. The frontend scaffold is ready; next steps are to install any missing UI libraries and start the dev server.
