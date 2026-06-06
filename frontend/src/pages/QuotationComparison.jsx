import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useRole } from '../context/AuthContext';

export function QuotationComparison() {
    const { currentRole } = useRole();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const rfqId = searchParams.get('rfq');

    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flashMessage, setFlashMessage] = useState(null);

    const [isPOGenerated, setIsPOGenerated] = useState(false);

    useEffect(() => {
        if (!rfqId) {
            setLoading(false);
            return;
        }

        // Fetch both quotes and the specific RFQ to check its status
        Promise.all([
            fetch('/api/quotes?_t=' + Date.now()).then(res => res.json()),
            fetch('/api/rfqs?_t=' + Date.now()).then(res => res.json())
        ])
        .then(([quotesData, rfqsData]) => {
            const currentRfq = rfqsData.find(r => String(r._id) === String(rfqId));
            if (currentRfq && currentRfq.status === 'PO_Generated') {
                setIsPOGenerated(true);
            }

            const relatedQuotes = quotesData.filter(q => {
                    const qRfqId = typeof q.rfq === 'object' && q.rfq ? q.rfq._id : q.rfq;
                    return String(qRfqId) === String(rfqId);
                });

                const enhancedQuotes = relatedQuotes.map((q) => ({
                    ...q,
                    vendorName: q.vendor?.companyName || 'Unknown Vendor',
                    rating: 4.5, // Dummy rating
                    deliveryDays: Math.round((new Date(q.deliveryDate) - new Date()) / (1000 * 60 * 60 * 24)) || 14
                }));

                setQuotes(enhancedQuotes);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [rfqId]);

    const handleAccept = async (quote) => {
        try {
            const res = await fetch('/api/pos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rfqId,
                    quoteId: quote._id,
                    vendorId: quote.vendor?._id || quote.vendor,
                    amount: quote.amount
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to generate PO');
            
            setFlashMessage({ type: 'success', text: 'Quote Accepted! Official PO has been generated.' });
            setTimeout(() => {
                navigate('/purchase-orders');
            }, 2000);
        } catch (e) {
            console.error(e);
            setFlashMessage({ type: 'error', text: e.message || 'Error generating PO' });
            setTimeout(() => setFlashMessage(null), 3000);
        }
    };

    const handleReject = async (quote) => {
        if (window.confirm('Are you sure you want to reject this bid?')) {
            try {
                const res = await fetch(`/api/quotes/${quote._id}/reject`, { method: 'POST' });
                if (!res.ok) throw new Error('Failed to reject');
                alert('Bid rejected');
                setQuotes(quotes.filter(q => q._id !== quote._id));
            } catch (e) {
                console.error(e);
                alert('Error rejecting bid');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!rfqId) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant">compare_arrows</span>
                </div>
                <h2 className="font-display-lg text-display-lg text-on-surface mb-4">No RFQ Selected</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8">Select a specific Request for Quotation (RFQ) to compare its bids and make a decision.</p>
                <Link to="/rfqs" className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-body-md text-body-md px-8 py-4 rounded-xl transition-colors shadow-sm">
                    View All RFQs
                </Link>
            </div>
        );
    }

    if (quotes.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant">hourglass_empty</span>
                </div>
                <h2 className="font-display-lg text-display-lg text-on-surface mb-2">No Quotes Received</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">RFQ ID: {rfqId.substring(0, 8)}...</p>
                <p className="font-body-md text-body-md text-outline">Waiting for vendors to submit their bids for this RFQ.</p>
            </div>
        );
    }

    const lowestBidAmount = Math.min(...quotes.map(q => q.amount));

    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative overflow-hidden">
            {flashMessage && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg font-body-md font-medium text-white transition-all duration-300 ${flashMessage.type === 'success' ? 'bg-secondary' : 'bg-error'}`}>
                    {flashMessage.text}
                </div>
            )}
            <div className="mb-lg flex justify-between items-end shrink-0 mt-4">
                <div>
                    <div className="flex items-center gap-xs mb-2">
                        <Link to="/rfqs" className="p-1 hover:bg-surface-container rounded-full transition-colors mr-2">
                            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
                        </Link>
                        <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded font-label-caps text-label-caps uppercase">
                            RFQ: {rfqId.substring(0, 8)}...
                        </span>
                        <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded font-label-caps text-label-caps uppercase flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">schedule</span> Active Bidding
                        </span>
                    </div>
                    <h1 className="font-display-lg text-display-lg text-on-surface">Quotation Comparison</h1>
                </div>
            </div>

            <div className="flex-1 flex bg-surface-container-lowest rounded-xl shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-outline-variant overflow-hidden">
                <div className="w-80 flex-shrink-0 bg-surface-bright border-r border-outline-variant flex flex-col">
                    <div className="h-28 p-md border-b border-outline-variant flex flex-col justify-end">
                        <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Evaluation Criteria</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="h-20 px-md border-b border-outline-variant flex flex-col justify-center bg-surface-bright">
                            <span className="font-body-md font-medium text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-outline">payments</span>
                                Base Amount
                            </span>
                        </div>
                        <div className="h-20 px-md border-b border-outline-variant flex flex-col justify-center bg-surface-bright">
                            <span className="font-body-md font-medium text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-outline">local_shipping</span>
                                Delivery Estimate
                            </span>
                        </div>
                        <div className="h-20 px-md border-b border-outline-variant flex flex-col justify-center bg-surface-bright">
                            <span className="font-body-md font-medium text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-outline">star</span>
                                Vendor Rating
                            </span>
                        </div>
                        <div className="h-24 px-md border-b border-outline-variant flex flex-col justify-center bg-surface-bright">
                            <span className="font-body-md font-medium text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-outline">gavel</span>
                                Actions
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto flex hide-scrollbar">
                    {quotes.map(quote => {
                        const isLowest = quote.amount === lowestBidAmount;
                        return (
                            <div key={quote._id} className="w-[320px] flex-shrink-0 border-r border-outline-variant flex flex-col hover:bg-surface-container-lowest transition-colors">
                                <div className="h-28 p-md border-b border-outline-variant flex flex-col justify-end bg-surface-container-lowest relative">
                                    {isLowest && (
                                        <div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px] flex items-center gap-1 shadow-sm">
                                            <span className="material-symbols-outlined text-[12px]">verified</span>
                                            Lowest Bid
                                        </div>
                                    )}
                                    <div className="w-10 h-10 rounded-lg bg-surface-variant/50 flex items-center justify-center font-bold text-on-surface mb-2 border border-outline-variant/30">
                                        {quote.vendorName.charAt(0)}
                                    </div>
                                    <h3 className="font-headline-md text-on-surface font-semibold truncate">{quote.vendorName}</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    <div className={`h-20 px-md border-b border-outline-variant flex items-center bg-surface-container-lowest ${isLowest ? 'text-secondary font-bold text-xl' : 'text-on-surface font-bold text-lg'}`}>
                                        <span className="font-data-mono">${quote.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="h-20 px-md border-b border-outline-variant flex items-center bg-surface-container-lowest">
                                        <span className="font-body-md font-medium text-on-surface-variant">{quote.deliveryDays} Days</span>
                                    </div>
                                    <div className="h-20 px-md border-b border-outline-variant flex items-center bg-surface-container-lowest">
                                        <span className="font-body-md text-tertiary-container font-bold tracking-widest flex items-center gap-1">
                                            {'★'.repeat(Math.floor(quote.rating))}
                                            <span className="text-on-surface-variant font-normal tracking-normal text-sm ml-1">({quote.rating})</span>
                                        </span>
                                    </div>
                                    <div className="h-24 px-md border-b border-outline-variant flex items-center justify-center gap-3 bg-surface-container-lowest">
                                        {quote.status === 'Accepted' ? (
                                            <div className="flex-1 bg-emerald-50 text-emerald-700 py-2.5 rounded-lg font-body-sm font-bold text-center border border-emerald-200">
                                                ✓ Accepted
                                            </div>
                                        ) : quote.status === 'Rejected' ? (
                                            <div className="flex-1 bg-rose-50 text-rose-700 py-2.5 rounded-lg font-body-sm font-bold text-center border border-rose-200">
                                            ✗ Rejected
                                        </div>
                                    ) : isPOGenerated ? (
                                        <div className="flex-1 bg-slate-100 text-slate-500 py-2.5 rounded-lg font-body-sm font-bold text-center border border-slate-200">
                                            PO Generated
                                        </div>
                                    ) : ['Approver', 'Procurement Officer'].includes(currentRole) ? (
                                        <>
                                                <button 
                                                    onClick={() => handleAccept(quote)}
                                                    className="flex-1 py-2.5 bg-primary text-on-primary rounded-lg font-body-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(quote)}
                                                    className="flex-1 py-2.5 bg-surface text-error border border-error/50 rounded-lg font-body-sm font-semibold hover:bg-error-container/30 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-on-surface-variant font-label-caps uppercase tracking-wider text-xs">
                                                Awaiting Approval
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
