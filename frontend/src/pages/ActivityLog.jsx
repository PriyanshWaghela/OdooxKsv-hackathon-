import { useState, useEffect } from 'react';

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
      case 'RFQ_CREATED': return 'description';
      case 'QUOTE_SUBMITTED': return 'request_quote';
      case 'PO_GENERATED': return 'receipt_long';
      default: return 'settings';
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'RFQ_CREATED': return 'bg-primary-fixed text-on-primary-fixed';
      case 'QUOTE_SUBMITTED': return 'bg-secondary-container text-on-secondary-container';
      case 'PO_GENERATED': return 'bg-tertiary-fixed text-on-tertiary-fixed';
      default: return 'bg-surface-dim text-on-surface-variant';
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 md:px-xl py-lg max-w-[1200px] w-full mx-auto">
      {/* Header Section */}
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-on-surface mb-2">Activity &amp; Logs</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Procurement audit trail</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-xl">
        <button className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-body-sm text-body-sm font-medium transition-colors">All</button>
        <button className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors border border-transparent hover:border-outline-variant/50">System</button>
        <button className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors border border-transparent hover:border-outline-variant/50">Proc</button>
        <button className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors border border-transparent hover:border-outline-variant/50">Vendor</button>
        <button className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors border border-transparent hover:border-outline-variant/50">Mgr</button>
      </div>

      {/* Timeline */}
      <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-[0px_4px_24px_rgba(15,23,42,0.04)]">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-[2.25rem] top-2 bottom-2 w-[2px] bg-surface-variant"></div>
          <div className="flex flex-col gap-1">
            {activities.length === 0 && (
              <p className="text-on-surface-variant ml-12">No activity recorded yet.</p>
            )}
            {activities.map((activity, idx) => (
              <div key={activity.id || idx} className="flex gap-4 md:gap-6 items-start p-3 rounded-lg hover:bg-surface-container transition-colors group cursor-default">
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-surface-container-lowest shrink-0 mt-1 ${getBadgeColor(activity.type)}`}>
                  <span className="material-symbols-outlined text-[18px] md:text-[20px]">{getIcon(activity.type)}</span>
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-1 pt-1 md:pt-2">
                  <div className="flex flex-col">
                    <p className="font-body-md text-body-md text-on-surface"><span className="font-medium text-primary">{activity.title}</span> - {activity.type.replace('_', ' ')}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{activity.description}</p>
                  </div>
                  <span className="font-data-mono text-data-mono text-on-surface-variant text-[12px]">{new Date(activity.date).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
