import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PurchaseOrders() {
    const { currentRole, user } = useAuth();
    const [pos, setPos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/pos')
            .then(res => res.json())
            .then(data => {
                let filteredData = data;
                if (currentRole === 'Vendor' && user) {
                    filteredData = data.filter(po => (po.vendor?._id || po.vendor) === user._id);
                }
                setPos(filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [currentRole, user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Generated': return 'bg-tertiary-container/20 text-tertiary';
            case 'Invoiced': return 'bg-primary-container/20 text-primary';
            case 'Paid': return 'bg-secondary-container/30 text-secondary';
            default: return 'bg-surface-variant/50 text-on-surface-variant';
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex justify-between items-end mb-sm mt-4">
                <div>
                    <h2 className="font-display-lg text-display-lg text-on-background tracking-tight">Order & Invoice Hub</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Manage and track all vendor procurement documents.</p>
                </div>
                {currentRole === 'Procurement Officer' && (
                    <button className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-body-md text-body-md px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined">add</span>
                        New Purchase Order
                    </button>
                )}
            </header>

            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_24px_rgba(15,23,42,0.04)] overflow-hidden flex-1 border border-outline-variant/30 flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-container border-b border-outline-variant/50">
                            <tr>
                                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Document ID</th>
                                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Date</th>
                                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Base Amount</th>
                                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Total (Inc. Tax)</th>
                                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/30">
                            {pos.map((po) => (
                                <tr key={po._id} className="hover:bg-surface-variant/30 transition-colors group">
                                    <td className="p-4 font-data-mono text-data-mono text-on-surface font-medium">
                                        {po.poNumber}
                                    </td>
                                    <td className="p-4 font-data-mono text-data-mono text-on-surface-variant">
                                        {new Date(po.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="p-4 font-data-mono text-data-mono text-on-surface">
                                        ${po.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 font-data-mono text-data-mono text-primary font-bold text-right">
                                        ${po.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-body-sm text-body-sm font-medium ${getStatusColor(po.status)}`}>
                                            {po.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link 
                                            to={`/invoice?po=${po.poNumber}`}
                                            className="inline-flex items-center gap-2 text-primary hover:text-primary-fixed-variant bg-primary-container/20 hover:bg-primary-container/40 px-3 py-1.5 rounded-lg transition-colors font-body-sm font-semibold"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">receipt</span>
                                            View Invoice
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {pos.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-on-surface-variant font-body-md">
                                        No Purchase Orders generated yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
