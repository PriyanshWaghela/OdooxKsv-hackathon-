import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SubmitQuote() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rfqId = searchParams.get('rfq');
  
  const [rfq, setRfq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: '',
    deliveryDate: '',
    notes: ''
  });

  useEffect(() => {
    if (!rfqId) {
      setLoading(false);
      return;
    }

    fetch('/api/rfqs')
      .then(res => res.json())
      .then(data => {
        const found = data.find(r => r._id === rfqId);
        setRfq(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [rfqId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rfq: rfqId,
          vendor: user?.id,
          amount: parseFloat(formData.amount),
          deliveryDate: new Date(formData.deliveryDate),
          notes: formData.notes
        })
      });
      
      if (!res.ok) throw new Error('Failed to submit quote');
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Error submitting quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-slate-800">RFQ Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Dashboard</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-500">
        <CheckCircle className="w-20 h-20 text-emerald-500" />
        <h2 className="text-3xl font-bold text-slate-800">Quote Submitted!</h2>
        <p className="text-slate-500">Your quotation has been successfully sent to the Procurement Officer.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/" className="p-2 rounded-full hover:bg-slate-200 transition-colors bg-white shadow-sm border border-slate-200 text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Submit Quotation</h1>
          <p className="text-slate-500 mt-1">Bid for: {rfq.title}</p>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 shadow-sm border border-white/50">
        <div className="bg-blue-50/50 p-6 rounded-2xl mb-8 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">RFQ Details</h3>
          <p className="text-blue-800/80 text-sm">{rfq.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bid Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  name="amount"
                  required
                  min="1"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white/50"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Delivery Date</label>
              <input 
                type="date"
                name="deliveryDate"
                required
                value={formData.deliveryDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes / Terms</label>
            <textarea 
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white/50 resize-none"
              placeholder="Any conditions or comments regarding your bid..."
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center space-x-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Binding Quotation</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">By submitting this quote, you agree to the vendor terms and conditions.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
