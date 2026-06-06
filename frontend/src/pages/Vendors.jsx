import { useState, useEffect } from 'react';
import { Package, MoreVertical, Star, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: ''
  });

  const fetchVendors = () => {
    setLoading(true);
    fetch('/api/vendors')
      .then(res => res.json())
      .then(data => {
        // Enhance with dummy rating logic just for the UI
        const enhancedVendors = data.map((v, idx) => ({
          ...v,
          rating: idx % 2 === 0 ? 4.8 : 4.5,
          activeRfqs: idx === 0 ? 3 : 1
        }));
        setVendors(enhancedVendors);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleOnboard = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'Vendor'
        })
      });
      if (!res.ok) throw new Error('Failed to register vendor');
      setShowModal(false);
      setFormData({ companyName: '', email: '', password: '' });
      fetchVendors(); // Refresh list
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Vendors</h1>
          <p className="text-slate-500 mt-1">Manage your vendor relationships and ratings.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-medium"
        >
          Onboard Vendor
        </button>
      </div>

      {loading ? (
        <div className="h-64 glass rounded-2xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="glass rounded-2xl p-6 relative hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <MoreVertical className="w-5 h-5" />
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center border border-indigo-200">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 capitalize">
                    {vendor.companyName || vendor.email.split('@')[0]}
                  </h3>
                  <div className="flex items-center text-amber-500 text-sm mt-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium ml-1">{vendor.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm font-medium text-slate-500">Active RFQs</span>
                  <span className="font-bold text-slate-800">{vendor.activeRfqs}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm font-medium text-slate-500">Status</span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Onboarding Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Onboard New Vendor</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleOnboard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Temporary Password</label>
                  <input 
                    type="password" 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-all shadow-md flex justify-center items-center"
                  >
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Register Vendor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
