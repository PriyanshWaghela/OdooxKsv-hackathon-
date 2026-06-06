import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../context/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const { currentRole } = useRole();

  const allLinks = [
    { name: 'Dashboard', path: '/', icon: 'dashboard', roles: ['Procurement Officer', 'Vendor', 'Approver'] },
    { name: 'RFQs', path: '/rfqs', icon: 'request_quote', roles: ['Procurement Officer', 'Vendor', 'Approver'] },
    { name: 'Compare Quotes', path: '/compare', icon: 'compare_arrows', roles: ['Procurement Officer', 'Approver'] },
    { name: 'Purchase Orders', path: '/purchase-orders', icon: 'receipt_long', roles: ['Procurement Officer', 'Approver', 'Vendor'] },
    { name: 'Vendors', path: '/vendors', icon: 'factory', roles: ['Procurement Officer', 'Approver'] },
    { name: 'Activity', path: '/activity', icon: 'analytics', roles: ['Procurement Officer', 'Approver'] },
    { name: 'Settings', path: '/settings', icon: 'settings', roles: ['Procurement Officer'] },
  ];

  const links = allLinks.filter(link => link.roles.includes(currentRole));

  return (
    <nav className="fixed left-4 top-4 bottom-4 w-64 rounded-xl bg-surface-container-lowest shadow-[0px_4px_24px_rgba(15,23,42,0.04)] shadow-sm flex flex-col p-md z-50">
      <div className="flex items-center gap-3 mb-xl">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined fill">hub</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">VendorBridge</h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-1">Enterprise Procurement</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-grow overflow-y-auto hide-scrollbar">
        {links.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg font-body-md text-body-md transition-all duration-200 ease-in-out active:scale-95 ${isActive ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'}`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto pt-4 border-t border-outline-variant/30 flex items-center gap-3 p-2">
        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
          {currentRole.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-body-sm font-bold text-on-surface truncate">{currentRole}</p>
          <p className="font-body-sm text-on-surface-variant text-[10px] truncate">{currentRole.toLowerCase().replace(' ', '.')}@vendorbridge.io</p>
        </div>
      </div>
    </nav>
  );
}
