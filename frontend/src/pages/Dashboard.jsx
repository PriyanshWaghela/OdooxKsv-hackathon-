import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Dashboard() {
    const { currentRole, user } = useAuth();
    
    // States
    const [stats, setStats] = useState({
        totalQuotations: 0,
        activeRFQs: 0,
        pendingApprovals: 0,
        purchaseOrders: 0,
        totalSpend: 0,
        pendingInvoices: 0,
        topVendors: []
    });
    const [rfqs, setRfqs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, rfqsRes, posRes] = await Promise.all([
                fetch('/api/dashboard/stats?_t=' + Date.now()),
                fetch('/api/rfqs?_t=' + Date.now()),
                fetch('/api/pos?_t=' + Date.now())
            ]);

            const statsData = await statsRes.json();
            const rfqsData = await rfqsRes.json();
            const posData = await posRes.json();

            if (currentRole === 'Vendor') {
                const vendorRfqs = rfqsData.filter(r => r.status === 'Pending' || r.status === 'Quoted');
                setRfqs(vendorRfqs);
                
                // Calculate vendor specific stats
                const myPOs = posData.filter(po => (po.vendor?._id || po.vendor) === user?._id);
                let mySpend = 0;
                let myPendingInvoices = 0;
                myPOs.forEach(po => {
                    mySpend += po.amount || 0;
                    if (po.status !== 'Paid') myPendingInvoices++;
                });

                setStats({
                    ...statsData,
                    totalSpend: mySpend,
                    activeRFQs: vendorRfqs.length,
                    pendingInvoices: myPendingInvoices,
                    purchaseOrders: myPOs.length
                });
            } else {
                setRfqs(rfqsData);
                setStats(statsData);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentRole, user]);

    // Format currency
    const formatCurrency = (amount) => {
        if (amount >= 1000) {
            return '$' + (amount / 1000).toFixed(1) + 'k';
        }
        return '$' + amount;
    };

    const actionRequiredRFQs = rfqs.filter(r => r.status === 'Pending' || r.status === 'Quoted').slice(0, 3);

    return (
        <div className="flex flex-col gap-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end mt-4">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Command Center</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">Overview of your procurement ecosystem today.</p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm bg-surface-container px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                    System Operational
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_24px_rgba(15,23,42,0.04)] flex flex-col justify-between border border-surface-variant/50 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Total Spend (YTD)</span>
                        <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                    </div>
                    <div className="relative z-10">
                        {loading ? (
                            <div className="h-10 bg-surface-container rounded w-32 animate-pulse"></div>
                        ) : (
                            <span className="font-data-mono text-data-mono text-4xl text-on-surface tracking-tight">{formatCurrency(stats.totalSpend)}</span>
                        )}
                        <div className="flex items-center gap-1 mt-2 text-secondary font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                            <span>Live Data</span>
                        </div>
                    </div>
                </div>
                
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_24px_rgba(15,23,42,0.04)] flex flex-col justify-between border border-surface-variant/50 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Active RFQs</span>
                        <div className="p-2 bg-secondary-container/30 rounded-lg text-secondary">
                            <span className="material-symbols-outlined">request_quote</span>
                        </div>
                    </div>
                    <div className="relative z-10">
                        {loading ? (
                            <div className="h-10 bg-surface-container rounded w-20 animate-pulse"></div>
                        ) : (
                            <span className="font-data-mono text-data-mono text-4xl text-on-surface tracking-tight">{stats.activeRFQs}</span>
                        )}
                        <div className="flex items-center gap-1 mt-2 text-on-surface-variant font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                            <span>{stats.pendingApprovals} pending vendor response</span>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_24px_rgba(15,23,42,0.04)] flex flex-col justify-between border border-surface-variant/50 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Pending Invoices</span>
                        <div className="p-2 bg-tertiary-container/20 rounded-lg text-tertiary">
                            <span className="material-symbols-outlined">receipt_long</span>
                        </div>
                    </div>
                    <div className="relative z-10">
                        {loading ? (
                            <div className="h-10 bg-surface-container rounded w-20 animate-pulse"></div>
                        ) : (
                            <span className="font-data-mono text-data-mono text-4xl text-on-surface tracking-tight">{stats.pendingInvoices}</span>
                        )}
                        <div className="flex items-center gap-1 mt-2 text-error font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px]">warning</span>
                            <span>Require immediate review</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter min-h-[400px]">
                <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-surface-variant/50 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-headline-md text-headline-md text-on-surface">Procurement Trends</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Monthly spend vs. projected budget</p>
                        </div>
                        <button className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm hover:bg-surface-container px-3 py-1.5 rounded-lg transition-colors border border-outline-variant">
                            This Year
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>
                    <div className="flex-1 flex items-end gap-4 mt-4 relative pb-6 border-b border-surface-variant/50">
                        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-on-surface-variant font-data-mono text-[10px]">
                            <span>$100k</span><span>$75k</span><span>$50k</span><span>$25k</span><span>0</span>
                        </div>
                        <div className="absolute inset-0 left-10 bottom-6 flex flex-col justify-between z-0 pointer-events-none">
                            <div className="w-full h-px bg-surface-variant/50"></div><div className="w-full h-px bg-surface-variant/50"></div><div className="w-full h-px bg-surface-variant/50"></div><div className="w-full h-px bg-surface-variant/50"></div><div className="w-full h-px"></div>
                        </div>
                        <div className="flex-1 flex items-end justify-between pl-12 relative z-10 h-full w-full">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((m, i) => (
                                <div key={m} className="flex flex-col items-center gap-2 group w-full">
                                    <div className={`w-full max-w-[40px] bg-primary/20 rounded-t-md relative hover:bg-primary/30 transition-colors cursor-pointer`} style={{height: `${[40, 55, 80, 65, 95][i]}%`}}>
                                        <div className={`absolute bottom-0 w-full ${m==='May'?'bg-secondary':'bg-primary'} rounded-t-md`} style={{height: `${[60, 70, 50, 85, 40][i]}%`}}></div>
                                    </div>
                                    <span className="font-label-caps text-label-caps text-on-surface-variant">{m}</span>
                                </div>
                            ))}
                             <div className="flex flex-col items-center gap-2 group w-full">
                                <div className="w-full max-w-[40px] bg-surface-container rounded-t-md h-[10%] relative border border-dashed border-outline-variant"></div>
                                <span className="font-label-caps text-label-caps text-on-surface-variant">Jun</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-surface-variant/50 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                            Action Required
                            {actionRequiredRFQs.length > 0 && (
                                <span className="bg-error-container text-on-error-container font-label-caps text-[10px] px-2 py-0.5 rounded-full flex items-center justify-center">
                                    {actionRequiredRFQs.length}
                                </span>
                            )}
                        </h3>
                    </div>
                    <div className="flex flex-col gap-3 overflow-y-auto pr-2 -mr-2">
                        {loading ? (
                            <div className="text-center py-4 text-on-surface-variant">Loading actions...</div>
                        ) : actionRequiredRFQs.length > 0 ? (
                            actionRequiredRFQs.map(rfq => (
                                <Link to="/rfqs" key={rfq._id} className="p-4 rounded-lg bg-surface hover:bg-surface-container-high transition-colors border border-transparent hover:border-surface-variant flex items-start gap-3 cursor-pointer group">
                                    <div className="w-8 h-8 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="material-symbols-outlined text-[18px]">draw</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">Review {rfq.title}</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">Created by {rfq.createdBy}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="font-label-caps text-[10px] bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">Status: {rfq.status}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-8 text-on-surface-variant flex flex-col items-center">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">check_circle</span>
                                <p>You're all caught up!</p>
                            </div>
                        )}
                    </div>
                    {actionRequiredRFQs.length > 0 && (
                        <Link to="/rfqs" className="mt-auto pt-4 w-full text-center font-body-sm text-body-sm text-primary hover:text-primary-fixed-variant transition-colors font-semibold block">
                            View all pending actions
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
