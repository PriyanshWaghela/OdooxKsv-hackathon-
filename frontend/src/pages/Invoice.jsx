import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import html2pdf from 'html2pdf.js';

export function Invoice() {
  const [searchParams] = useSearchParams();
  const poNumber = searchParams.get('po');
  const { user } = useAuth();
  
  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const invoiceRef = React.useRef(null);

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
    if (!invoiceRef.current) return;
    
    const element = invoiceRef.current;
    const opt = {
      margin: 1,
      filename: `Invoice_${po.poNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(opt).save();
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
    <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <header className="pt-xl px-xl pb-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-sm sticky top-0 bg-background/80 backdrop-blur-md z-40 print:hidden">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Purchase Order &amp; Invoice</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">{po.poNumber} auto generated after approval</p>
        </div>
        <div className="flex items-center gap-sm">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-xs px-sm py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">picture_as_pdf</span>
            PDF
          </button>
          <button 
            onClick={handleEmail}
            disabled={sending}
            className="flex items-center gap-xs px-sm py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-body-md text-body-md disabled:bg-primary/50"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-on-primary/20 border-t-on-primary rounded-full animate-spin"></div>
            ) : (
              <span className="material-symbols-outlined">mail</span>
            )}
            {sending ? 'Sending...' : 'Email'}
          </button>
        </div>
      </header>

      {/* Document Canvas */}
      <div className="flex-1 px-xl py-lg flex justify-center items-start">
        {/* The Paper Document */}
        <div id="invoice-content" ref={invoiceRef} className="bg-surface-container-lowest w-full max-w-4xl rounded-xl shadow-[0px_4px_24px_rgba(15,23,42,0.04)] p-xl border border-surface-container-high relative overflow-hidden print:shadow-none print:border-none print:w-full">
          {/* Subtle Top Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
          
          {/* Document Header Section */}
          <div className="flex flex-col md:flex-row justify-between gap-xl mb-xl">
            {/* Left: Addresses */}
            <div className="flex flex-col md:flex-row gap-xl flex-1">
              <div className="flex-1">
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-xs">Billed To</h3>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold mb-base">VendorBridge Inc.</p>
                <p className="font-body-md text-body-md text-on-surface-variant">123 Enterprise Way<br/>San Francisco, CA 94105</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">procurement@vendorbridge.io</p>
              </div>
              <div className="flex-1">
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-xs">From Vendor</h3>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold mb-base">{po.vendor?.companyName || 'TechSolutions Inc.'}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Vendor ID: {po.vendor?._id?.toString().substring(0, 8) || 'VND-291'}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">{po.vendor?.email || 'sales@techsolutions.com'}</p>
              </div>
            </div>
            
            {/* Right: Invoice Meta */}
            <div className="text-left md:text-right">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Invoice #{po.poNumber.replace('PO-', 'INV-')}</h2>
              <div className="font-body-md text-body-md text-on-surface-variant grid grid-cols-2 md:flex md:flex-col gap-x-sm gap-y-base justify-end">
                <div className="flex justify-between md:justify-end gap-sm">
                  <span className="font-label-caps text-label-caps">Date Issued:</span>
                  <span className="font-data-mono text-data-mono text-on-surface">{new Date(po.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between md:justify-end gap-sm">
                  <span className="font-label-caps text-label-caps">PO Number:</span>
                  <span className="font-data-mono text-data-mono text-on-surface">{po.poNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Table */}
          <div className="mt-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-on-surface-variant">
                  <th className="py-sm px-xs font-label-caps text-label-caps uppercase w-12 text-center">S.No</th>
                  <th className="py-sm px-sm font-label-caps text-label-caps uppercase">Description</th>
                  <th className="py-sm px-sm font-label-caps text-label-caps uppercase text-right w-32">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                <tr className="hover:bg-surface-container-lowest/50 transition-colors group">
                  <td className="py-md px-xs font-data-mono text-data-mono text-on-surface-variant text-center">01</td>
                  <td className="py-md px-sm">
                    <p className="font-body-md text-body-md font-medium text-on-surface">Procurement Services for {po.poNumber}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Based on approved quotation for RFQ: {typeof po.rfq === 'object' ? po.rfq?.title : po.rfq}</p>
                  </td>
                  <td className="py-md px-sm font-data-mono text-data-mono text-on-surface text-right font-medium">
                    ${po.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Subtotals */}
          <div className="mt-md flex justify-end">
            <div className="w-full max-w-sm">
              <div className="flex justify-between py-xs px-sm font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-data-mono text-data-mono text-on-surface">${po.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-xs px-sm font-body-md text-body-md text-on-surface-variant">
                <span>Tax (10%)</span>
                <span className="font-data-mono text-data-mono text-on-surface">${po.taxAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Document Footer */}
          <div className="mt-lg pt-lg border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
            {/* Status Badge */}
            <div className={`flex items-center gap-2 px-sm py-1.5 rounded-full ${po.status === 'Invoiced' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'}`}>
              <span className="material-symbols-outlined text-sm">{po.status === 'Invoiced' ? 'check_circle' : 'schedule'}</span>
              <span className="font-label-caps text-label-caps tracking-wider uppercase">{po.status === 'Invoiced' ? 'Invoice Sent' : 'Pending Payment'}</span>
            </div>
            
            {/* Total */}
            <div className="flex items-baseline gap-sm">
              <span className="font-body-lg text-body-lg text-on-surface-variant">Total Amount</span>
              <span className="font-headline-lg text-headline-lg font-data-mono text-primary">${po.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Additional Notes / T&C */}
          <div className="mt-xl pt-md text-center">
            <p className="font-body-sm text-body-sm text-outline">Payment is due within 30 days of the invoice date. Please include the invoice number on your check or wire transfer referencing {po.poNumber}.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
