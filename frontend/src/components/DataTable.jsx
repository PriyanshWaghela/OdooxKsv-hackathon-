import { cn } from '../lib/utils';
import { MoreVertical, ExternalLink, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRole } from '../context/AuthContext';

const statusStyles = {
  'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
  'Quoted': 'bg-blue-100 text-blue-700 border-blue-200',
  'Approved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'PO_Generated': 'bg-purple-100 text-purple-700 border-purple-200',
};

export function DataTable({ data }) {
  const { currentRole } = useRole();

  return (
    <div className="glass rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-medium uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">RFQ Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-slate-500 truncate max-w-xs">
                  {item.description}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full border",
                    statusStyles[item.status] || 'bg-slate-100 text-slate-700 border-slate-200'
                  )}>
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      {currentRole === 'Vendor' ? (
                        <Link 
                          to={`/submit-quote?rfq=${item._id}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <PenTool className="w-4 h-4 mr-1.5" />
                          Submit Quote
                        </Link>
                      ) : (
                        item.status === 'PO_Generated' ? (
                          <Link 
                            to={`/compare?rfq=${item._id}`}
                            className="text-emerald-600 hover:text-emerald-800 flex items-center bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors font-medium text-xs whitespace-nowrap"
                            title="View Accepted Quote"
                          >
                            View Accepted Quote
                          </Link>
                        ) : (
                          <Link 
                            to={`/compare?rfq=${item._id}`}
                            className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                            title="View Quotations"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                        )
                      )}
                      <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-lg hover:bg-slate-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  No RFQs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
