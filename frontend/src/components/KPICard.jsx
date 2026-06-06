import { cn } from '../lib/utils';

export function KPICard({ title, value, icon: Icon, trend, colorClass }) {
  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-110", colorClass)}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-xl", colorClass, "bg-opacity-10 text-current")}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex items-center text-sm relative z-10">
        {trend && (
          <>
            <span className={cn("font-medium", trend.isPositive ? "text-emerald-500" : "text-rose-500")}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </span>
            <span className="text-slate-400 ml-2">vs last month</span>
          </>
        )}
      </div>
    </div>
  );
}
