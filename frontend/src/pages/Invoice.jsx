import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Invoice() {
  const [searchParams] = useSearchParams();
  const poNumber = searchParams.get('po');
  const { user } = useAuth();
  
  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!poNumber) return;
    
    fetch('/api/pos')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.poNumber === poNumber);
        setPo(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [poNumber]);

  const handleDownload = () => {
    window.print();
  };

  const handleEmail = async () => {
    if (!po) return;
    setSending(true);
    try {
      const res = await fetch('/api/invoices/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poNumber: po.poNumber,
          vendorName: po.vendor?.companyName || 'TechSolutions Inc.', // Use populated vendor
          amount: po.amount,
          taxAmount: po.taxAmount,
          totalAmount: po.totalAmount,
          recipientEmail: user?.email // Send to logged in user for testing
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      alert(`Email sent successfully! You can view the preview here:\n\n${data.previewUrl}`);
      // Open ethereal preview in new tab
      window.open(data.previewUrl, '_blank');
      
      // Update local status to reflect 'Invoiced' if it wasn't
      setPo({ ...po, status: 'Invoiced' });
    } catch (err) {
      console.error(err);
      alert('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!po) {
    return (
      <div className="text-center mt-20">
        <h2 className="font-display-lg text-on-surface">PO Not Found</h2>
        <Link to="/purchase-orders" className="text-primary hover:underline mt-4 inline-block font-body-lg">Return to POs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 mt-4">
      {/* Hide controls when printing */}
      <div className="flex items-center justify-between print:hidden mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/purchase-orders" className="p-2 rounded-full hover:bg-surface-container-high transition-colors bg-surface-container shadow-sm border border-outline-variant/30 text-on-surface-variant hover:text-on-surface flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Official Invoice</h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-lg hover:bg-surface-container transition-colors shadow-sm font-body-md font-medium"
          >
            <span className="material-symbols-outlined text-[18px] mr-2">download</span>
            Download PDF
          </button>
          <button 
            onClick={handleEmail}
            disabled={sending}
            className="flex items-center px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-fixed-variant disabled:bg-primary/50 transition-colors shadow-sm font-body-md font-medium"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-on-primary/20 border-t-on-primary rounded-full animate-spin mr-2"></div>
            ) : (
              <span className="material-symbols-outlined text-[18px] mr-2">mail</span>
            )}
            {sending ? 'Sending...' : 'Email Invoice'}
          </button>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div id="invoice-content" className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-outline-variant/30 overflow-hidden print:shadow-none print:border-none print:w-full">
        {/* Header Ribbon */}
        <div className="h-4 bg-primary"></div>
        
        <div className="p-xl">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-on-primary-container text-[24px]">receipt_long</span>
                </div>
                <h1 className="font-display-lg text-[32px] font-bold tracking-tight text-on-surface">INVOICE</h1>
              </div>
              <p className="font-body-md text-on-surface-variant max-w-xs">
                VendorBridge Corporate ERP<br/>
                123 Enterprise Way<br/>
                San Francisco, CA 94105
              </p>
            </div>
            
            <div className="text-right">
              <div className="inline-block p-4 bg-surface-container rounded-xl border border-outline-variant/30 text-left">
                <div className="mb-2">
                  <span className="font-label-caps text-label-caps text-outline uppercase block">Invoice No.</span>
                  <span className="font-data-mono text-lg font-bold text-on-surface">{po.poNumber.replace('PO-', 'INV-')}</span>
                </div>
                <div className="mb-2">
                  <span className="font-label-caps text-label-caps text-outline uppercase block">PO Number</span>
                  <span className="font-data-mono text-sm font-medium text-on-surface-variant">{po.poNumber}</span>
                </div>
                <div>
                  <span className="font-label-caps text-label-caps text-outline uppercase block">Date Issued</span>
                  <span className="font-data-mono text-sm font-medium text-on-surface-variant">{new Date(po.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="font-label-caps text-label-caps text-outline uppercase mb-3">Bill To:</h3>
              <p className="font-body-lg font-bold text-on-surface text-lg">Procurement Department</p>
              <p className="font-body-md text-on-surface-variant mt-1">VendorBridge HQ</p>
              <p className="font-body-md text-on-surface-variant">procurement@vendorbridge.io</p>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-outline uppercase mb-3">From (Vendor):</h3>
              <p className="font-body-lg font-bold text-on-surface text-lg">{po.vendor?.companyName || 'TechSolutions Inc.'}</p>
              <p className="font-body-md text-on-surface-variant mt-1">Vendor ID: {po.vendor?._id?.toString().substring(0, 8) || 'VND-291'}</p>
              <p className="font-body-md text-on-surface-variant">{po.vendor?.email || 'sales@techsolutions.com'}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-12">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-outline-variant/30">
                  <th className="text-left py-4 font-label-caps text-label-caps text-outline uppercase">Description</th>
                  <th className="text-right py-4 font-label-caps text-label-caps text-outline uppercase w-32">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                <tr>
                  <td className="py-6">
                    <p className="font-body-md font-bold text-on-surface">Procurement Services for {po.poNumber}</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">Based on approved quotation for RFQ: {typeof po.rfq === 'object' ? po.rfq?.title : po.rfq}</p>
                  </td>
                  <td className="py-6 text-right font-data-mono font-medium text-on-surface">
                    ${po.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80">
              <div className="flex justify-between py-3 border-b border-outline-variant/30">
                <span className="font-body-md text-on-surface-variant font-medium">Subtotal</span>
                <span className="font-data-mono text-on-surface font-medium">
                  ${po.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-outline-variant/30">
                <span className="font-body-md text-on-surface-variant font-medium">Tax (10%)</span>
                <span className="font-data-mono text-on-surface font-medium">
                  ${po.taxAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-4 mt-2 bg-surface-container rounded-xl px-4 border border-outline-variant/30">
                <span className="font-headline-md text-on-surface font-bold text-lg">Total Due</span>
                <span className="font-data-mono text-primary font-bold text-xl">
                  ${po.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-outline-variant/30 text-center font-body-sm text-outline">
            <p>Payment is due within 30 days. Please include the Invoice Number on your check.</p>
            <p className="mt-1">Thank you for doing business with us!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
