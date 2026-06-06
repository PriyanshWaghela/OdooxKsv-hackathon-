import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function TopBar({ title, subtitle, searchPlaceholder = "Search..." }) {
    const { currentRole, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="flex justify-between items-center w-full px-xl py-sm bg-transparent h-20 sticky top-0 z-40 backdrop-blur-sm">
            <div className="flex-1 flex items-center">
                <div className="relative w-96 mr-8">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input className="w-full bg-surface-container-lowest rounded-lg pl-10 pr-4 py-2 border border-outline-variant text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim transition-all outline-none font-body-md text-body-md shadow-sm" placeholder={searchPlaceholder} type="text" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <nav className="hidden lg:flex items-center gap-md mr-4">
                    <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer hover:opacity-80">Documents</a>
                    <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer hover:opacity-80">Team</a>
                    <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer hover:opacity-80">Settings</a>
                </nav>
                <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors relative cursor-pointer hover:opacity-80 text-on-surface-variant">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface-container-lowest"></span>
                </button>
                <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors cursor-pointer hover:opacity-80 text-on-surface-variant">
                    <span className="material-symbols-outlined">help_outline</span>
                </button>
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden cursor-pointer transition-transform hover:scale-105 flex items-center justify-center font-bold text-on-surface"
                    >
                        {currentRole?.substring(0, 2).toUpperCase() || 'US'}
                    </button>
                    
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-2 border-b border-outline-variant/50 mb-2">
                                <p className="font-body-sm font-semibold text-on-surface">Signed in as</p>
                                <p className="font-body-xs text-on-surface-variant truncate">{currentRole}</p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 font-body-md text-error hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
