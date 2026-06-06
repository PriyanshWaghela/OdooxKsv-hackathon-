import { useState, useEffect } from 'react';
import { DataTable } from '../components/DataTable';
import { useAuth } from '../context/AuthContext';

export function RFQs() {
  const { currentRole } = useAuth();
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRfqs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rfqs?_t=' + Date.now());
      const data = await res.json();
      if (currentRole === 'Vendor') {
        setRfqs(data.filter(r => r.status === 'Pending' || r.status === 'Quoted'));
      } else {
        setRfqs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRfqs();
  }, [currentRole]);

  const handleCreateRFQ = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/rfqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, createdBy: currentRole })
      });
      if (response.ok) {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        fetchRfqs(); // Refresh list
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canCreateRFQ = currentRole === 'Admin' || currentRole === 'Procurement Officer';

  return (
    <div className="flex flex-col gap-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end mb-sm mt-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-background tracking-tight">Request for Quotations</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Manage all your active and pending RFQs here.</p>
        </div>
        {canCreateRFQ && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-body-md text-body-md px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined">add</span>
            Create New RFQ
          </button>
        )}
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_24px_rgba(15,23,42,0.04)] overflow-hidden border border-outline-variant/30">
          <DataTable data={rfqs} />
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-scrim/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-outline-variant/30">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/50">
              <h3 className="font-headline-md text-headline-md text-on-surface">Create New RFQ</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateRFQ} className="p-6 space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">RFQ Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container rounded-lg px-4 py-2.5 border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim text-on-surface transition-all outline-none"
                  placeholder="e.g. IT Equipment Refresh"
                  required
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">Description / Items</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container rounded-lg px-4 py-2.5 border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim text-on-surface transition-all outline-none h-32 resize-none"
                  placeholder="Describe the procurement requirements..."
                  required
                ></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-surface text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container transition-colors font-body-md font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-on-primary-fixed-variant disabled:bg-primary/50 text-on-primary font-body-md font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-on-primary/20 border-t-on-primary rounded-full animate-spin"></div>
                  ) : (
                    'Publish RFQ'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
