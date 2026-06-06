import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { QuotationComparison } from './pages/QuotationComparison';
import { RFQs } from './pages/RFQs';
import { Vendors } from './pages/Vendors';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { SubmitQuote } from './pages/SubmitQuote';
import { PurchaseOrders } from './pages/PurchaseOrders';
import { Invoice } from './pages/Invoice';
import { ActivityLog } from './pages/ActivityLog';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/rfqs" element={<ProtectedRoute><RFQs /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute allowedRoles={['Procurement Officer', 'Approver']}><QuotationComparison /></ProtectedRoute>} />
          <Route path="/submit-quote" element={<ProtectedRoute allowedRoles={['Vendor']}><SubmitQuote /></ProtectedRoute>} />
          <Route path="/purchase-orders" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
          <Route path="/invoice" element={<ProtectedRoute allowedRoles={['Procurement Officer', 'Approver', 'Vendor']}><Invoice /></ProtectedRoute>} />
          <Route path="/vendors" element={<ProtectedRoute allowedRoles={['Procurement Officer', 'Approver']}><Vendors /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute allowedRoles={['Procurement Officer']}><Settings /></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute allowedRoles={['Procurement Officer', 'Approver']}><ActivityLog /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
