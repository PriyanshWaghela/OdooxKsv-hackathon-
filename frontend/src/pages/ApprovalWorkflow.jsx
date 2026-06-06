import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export function ApprovalWorkflow() {
  return (
    <div className="flex-1 max-w-container-max mx-auto w-full animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="mb-xl pt-sm">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-base">Approval Workflow</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-base">
          <span className="font-semibold text-primary">RFQ:</span> Office Furniture Q3 
          <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
          <span className="font-semibold text-primary">Vendor:</span> Infra Supplies 
          <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
          <span className="font-data-mono text-data-mono text-on-surface">$3400</span>
        </p>
      </header>

      {/* Stepper */}
      <section className="mb-xl bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between relative">
          {/* Line background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-variant z-0"></div>
          
          {/* Step 1: Done */}
          <div className="relative z-10 flex flex-col items-center gap-xs w-1/3">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
            <span className="font-label-caps text-label-caps text-primary uppercase">Created</span>
          </div>
          
          {/* Step 2: Active */}
          <div className="relative z-10 flex flex-col items-center gap-xs w-1/3">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest border-2 border-primary text-primary flex items-center justify-center shadow-sm">
              <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
            </div>
            <span className="font-label-caps text-label-caps text-on-surface uppercase">Pending Approval</span>
          </div>
          
          {/* Step 3: Next */}
          <div className="relative z-10 flex flex-col items-center gap-xs w-1/3">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest border-2 border-outline-variant text-outline flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">hourglass_empty</span>
            </div>
            <span className="font-label-caps text-label-caps text-outline-variant uppercase">Approved/Rejected</span>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Left Card: Approval Details */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-surface-variant/50">
          <div className="flex items-center gap-sm mb-lg pb-sm border-b border-surface-variant">
            <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined">fact_check</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Approval Details</h2>
          </div>
          <div className="space-y-md">
            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-sm text-on-surface-variant">
                <span className="material-symbols-outlined">star</span>
                <span className="font-body-md text-body-md">Vendor Rating</span>
              </div>
              <span className="font-data-mono text-data-mono text-on-surface font-semibold bg-surface-container px-xs py-1 rounded">4.5 / 5</span>
            </div>
            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-sm text-on-surface-variant">
                <span className="material-symbols-outlined">local_shipping</span>
                <span className="font-body-md text-body-md">Delivery Time</span>
              </div>
              <span className="font-data-mono text-data-mono text-on-surface font-semibold bg-surface-container px-xs py-1 rounded">10 days</span>
            </div>
            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-sm text-on-surface-variant">
                <span className="material-symbols-outlined">verified_user</span>
                <span className="font-body-md text-body-md">Compliance Score</span>
              </div>
              <span className="font-data-mono text-data-mono text-secondary font-semibold bg-secondary-container/30 px-xs py-1 rounded">98%</span>
            </div>
          </div>
        </div>

        {/* Right Card: Action Panel */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_24px_rgba(15,23,42,0.04)] border border-surface-variant/50 flex flex-col">
          <div className="flex items-center gap-sm mb-lg pb-sm border-b border-surface-variant">
            <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">edit_note</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Action Panel</h2>
          </div>
          <div className="flex-1 flex flex-col">
            <label className="font-body-sm text-body-sm text-on-surface-variant mb-xs font-semibold" htmlFor="remarks">Review Remarks (Optional)</label>
            <textarea 
              className="w-full bg-surface rounded-lg border border-outline-variant p-sm font-body-md text-body-md text-on-surface focus:border-primary focus:ring-4 focus:ring-primary-fixed/50 transition-all resize-none outline-none mb-lg" 
              id="remarks" 
              placeholder="Enter any conditions or notes regarding this approval..." 
              rows="6"
            ></textarea>
            <div className="mt-auto flex items-center justify-end gap-sm pt-sm border-t border-surface-variant">
              <button className="px-lg py-sm rounded-lg border border-error text-error font-body-md text-body-md font-semibold hover:bg-error-container/50 focus:ring-2 focus:ring-error transition-all flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">close</span>
                Reject
              </button>
              <button className="px-lg py-sm rounded-lg bg-secondary text-on-secondary font-body-md text-body-md font-semibold hover:opacity-90 focus:ring-2 focus:ring-secondary-fixed transition-all flex items-center gap-xs shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}