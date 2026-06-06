import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, companyName, role: 'Vendor' })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-full h-full pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-300 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-purple-300 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md p-8 glass rounded-3xl shadow-2xl z-10 relative border border-white/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Vendor Onboarding</h1>
          <p className="text-slate-500 mt-2 text-center">Register to start bidding on RFQs</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input 
              type="text" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-4 flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Register as Vendor'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
