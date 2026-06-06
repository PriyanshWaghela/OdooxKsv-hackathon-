import React from 'react';

export function ReportsAnalytics() {
  return (
    <div className="flex-1 w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-sm pt-4">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface tracking-tight mb-1">Reports &amp; Analytics</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Procurement data for year 2023</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">calendar_today</span>
            <select className="pl-10 pr-8 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer shadow-sm">
              <option>Year: 2023</option>
              <option>Year: 2022</option>
            </select>
          </div>
          <button className="p-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface-variant hover:text-primary hover:border-primary transition-colors shadow-sm flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">download</span>
          </button>
        </div>
      </header>

      {/* KPI Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-transparent relative overflow-hidden group hover:border-surface-variant transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">Total Spend</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-display-lg text-display-lg text-on-surface tracking-tight">$4.2M</h3>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <span className="material-symbols-outlined text-error text-sm">trending_up</span>
            <span className="font-body-sm text-body-sm text-error font-medium">+5.2%</span>
            <span className="font-body-sm text-body-sm text-outline ml-1">vs last year</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-transparent relative overflow-hidden group hover:border-surface-variant transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>request_quote</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">Active RFQs</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-display-lg text-display-lg text-on-surface tracking-tight">24</h3>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
            <span className="font-body-sm text-body-sm text-secondary font-medium">+2 new</span>
            <span className="font-body-sm text-body-sm text-outline ml-1">this week</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-transparent relative overflow-hidden group hover:border-surface-variant transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">Savings</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-display-lg text-display-lg text-on-surface tracking-tight">12%</h3>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
            <span className="font-body-sm text-body-sm text-secondary font-medium">+1.5%</span>
            <span className="font-body-sm text-body-sm text-outline ml-1">above target</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-transparent relative overflow-hidden group hover:border-surface-variant transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">Pending Invoices</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-display-lg text-display-lg text-on-surface tracking-tight">8</h3>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <span className="material-symbols-outlined text-outline text-sm">schedule</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Requires action</span>
          </div>
        </div>
      </section>

      {/* Grid Layout: Charts & Tables */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-gutter">
        {/* Left Card: Spend by Category */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)] flex flex-col min-h-[360px]">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface">Spend by Category</h3>
            <button className="text-primary hover:bg-primary-fixed rounded-full p-1 transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-4">
            {[
              { name: 'IT Hardware', val: 75, amount: '$1.2M', opacity: 100 },
              { name: 'Software Lic.', val: 55, amount: '$850k', opacity: 80 },
              { name: 'Marketing', val: 40, amount: '$600k', opacity: 60 },
              { name: 'Consulting', val: 25, amount: '$450k', opacity: 40 },
              { name: 'Office Supplies', val: 10, amount: '$150k', opacity: 20 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-32 font-body-sm text-body-sm text-on-surface-variant text-right truncate">{item.name}</div>
                <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div className={`h-full bg-primary-container rounded-full transition-all duration-300 ${item.opacity === 100 ? 'group-hover:bg-primary' : `opacity-${item.opacity} group-hover:opacity-100`}`} style={{ width: `${item.val}%` }}></div>
                </div>
                <div className="w-16 font-data-mono text-data-mono text-on-surface text-right">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Top Vendors */}
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)] flex flex-col min-h-[360px] overflow-hidden">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">Top Vendors</h3>
          </div>
          <div className="flex-1 overflow-x-auto -mx-2 px-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-variant">
                  <th className="py-2 px-2 font-label-caps text-label-caps text-on-surface-variant font-medium">Vendor</th>
                  <th className="py-2 px-2 font-label-caps text-label-caps text-on-surface-variant font-medium text-right">Spend</th>
                  <th className="py-2 px-2 font-label-caps text-label-caps text-on-surface-variant font-medium text-center">POs</th>
                </tr>
              </thead>
              <tbody className="font-data-mono text-data-mono">
                {[
                  { name: 'TechCorp Inc.', spend: '$850k', pos: 42 },
                  { name: 'Global Supply LLC', spend: '$620k', pos: 18 },
                  { name: 'CloudSystems', spend: '$410k', pos: 5 },
                  { name: 'Apex Marketing', spend: '$350k', pos: 12 },
                  { name: 'Omega Consult', spend: '$290k', pos: 8 },
                ].map((v, i) => (
                  <tr key={i} className="border-b border-surface-variant/50 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-2 text-on-surface font-medium truncate max-w-[120px]">{v.name}</td>
                    <td className="py-3 px-2 text-on-surface-variant text-right">{v.spend}</td>
                    <td className="py-3 px-2 text-on-surface-variant text-center">{v.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-2 border-t border-surface-variant">
            <button className="w-full text-center font-body-sm text-body-sm text-primary hover:text-on-primary-fixed-variant transition-colors py-1">View All Vendors</button>
          </div>
        </div>
      </section>

      {/* Bottom Card: Monthly Trend */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)] mb-8">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="font-headline-md text-headline-md text-on-surface">Monthly Trend</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-container"></div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">2023 Spend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">2022 Spend</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2 mt-8 relative">
          {/* Grid lines background */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
            {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-surface-variant/50"></div>)}
          </div>
          
          {/* Bars (Months) */}
          {[
            { m: 'Jan', v1: 40, v2: 30 }, { m: 'Feb', v1: 55, v2: 45 }, 
            { m: 'Mar', v1: 35, v2: 40 }, { m: 'Apr', v1: 60, v2: 50 },
            { m: 'May', v1: 80, v2: 60 }, { m: 'Jun', v1: 65, v2: 70 },
            { m: 'Jul', v1: 45, v2: 40 }, { m: 'Aug', v1: 75, v2: 65 },
            { m: 'Sep', v1: 85, v2: 75 }, { m: 'Oct', v1: 50, v2: 55 },
            { m: 'Nov', v1: 90, v2: 80 }, { m: 'Dec', v1: 100, v2: 85 }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 z-10 group">
              <div className="w-full max-w-[32px] flex items-end gap-0.5 md:gap-1 h-[200px]">
                <div className="w-1/2 bg-surface-variant rounded-t-sm transition-all duration-300 group-hover:opacity-80" style={{ height: `${item.v2}%` }}></div>
                <div className="w-1/2 bg-primary-container rounded-t-sm transition-all duration-300 group-hover:bg-primary" style={{ height: `${item.v1}%` }}></div>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{item.m}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}