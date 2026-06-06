import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, currentRole, logout } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center w-96 glass rounded-full px-4 py-2 bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
        <Search className="w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search RFQs, Vendors, POs..." 
          className="bg-transparent border-none outline-none w-full ml-3 text-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {currentRole?.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 leading-tight">{currentRole}</span>
            <span className="text-[10px] text-slate-500 leading-tight">{user?.email}</span>
          </div>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="w-px h-8 bg-slate-200"></div>

        <button 
          onClick={logout}
          className="flex items-center space-x-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
