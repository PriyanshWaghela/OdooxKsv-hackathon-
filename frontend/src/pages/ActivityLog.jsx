import { useState, useEffect } from 'react';
import { Activity, Clock, FileText, ShoppingCart, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activity?_t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'RFQ_CREATED': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'QUOTE_SUBMITTED': return <ShoppingCart className="w-5 h-5 text-amber-500" />;
      case 'PO_GENERATED': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default: return <Activity className="w-5 h-5 text-slate-500" />;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'RFQ_CREATED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'QUOTE_SUBMITTED': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'PO_GENERATED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-inner">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Activity Log</h1>
          <p className="text-slate-500 mt-1">Real-time tracking of all procurement actions.</p>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 border border-white/50 shadow-sm">
        <div className="relative border-l-2 border-slate-100 ml-6 space-y-10 py-4">
          {activities.length === 0 && (
            <p className="text-slate-500 ml-6">No activity recorded yet.</p>
          )}
          {activities.map((activity, idx) => (
            <div key={activity.id + idx} className="relative pl-8 group">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm group-hover:border-blue-200 group-hover:scale-110 transition-all">
                {getIcon(activity.type)}
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 group-hover:border-blue-100 group-hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-slate-800">{activity.title}</h3>
                    <span className={cn("px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border", getBadgeColor(activity.type))}>
                      {activity.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    {new Date(activity.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
