import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="glass-nav sticky top-0 z-50 w-full py-4 px-4 md:px-12 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-primary p-2 rounded-xl text-white transform group-hover:rotate-12 transition-transform duration-300">
                    <i className="fa-solid fa-compass text-xl"></i>
                </div>
                <span className="text-2xl font-bold tracking-tight text-primary">Wanderlust</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    const query = e.target.q.value;
                    const params = new URLSearchParams();
                    if (query) params.set('q', query);
                    window.location.href = `/?${params.toString()}`;
                }}
                className="hidden md:flex items-center bg-white border border-gray-200 rounded-full py-1.5 px-4 shadow-sm hover:shadow-md transition-shadow"
            >
                <input 
                    type="text" 
                    name="q"
                    placeholder="Search destinations" 
                    className="outline-none text-sm font-medium w-48 lg:w-64 px-2"
                />
                <button type="submit" className="bg-primary p-2 rounded-full text-white ml-2 hover:bg-primary-hover transition-colors">
                    <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </button>
            </form>

            {/* Right Side Nav */}
            <div className="flex items-center gap-4">
                <Link to="/" className="hidden sm:block text-sm font-semibold hover:bg-gray-100 py-2 px-4 rounded-full transition-colors">Explore</Link>
                {user && (
                    <Link to="/listings/new" className="hidden sm:block text-sm font-semibold hover:bg-gray-100 py-2 px-4 rounded-full transition-colors">Host home</Link>
                )}
                
                {/* User Menu Container */}
                <div 
                    className="flex items-center gap-3 border border-gray-200 rounded-full py-1.5 px-3 hover:shadow-md transition-all cursor-pointer bg-white relative"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <i className="fa-solid fa-bars text-gray-600"></i>
                    <div className="bg-gray-500 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center overflow-hidden">
                        {user ? (
                             <span className="text-xs font-bold">{user.username.charAt(0).toUpperCase()}</span>
                        ) : (
                            <i className="fa-solid fa-user text-xs"></i>
                        )}
                    </div>

                    {/* Auth Dropdown Menu - Reactive version of the EJS dropdown */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-[100] transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                            {!user ? (
                                <>
                                    <Link to="/signup" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Sign up</Link>
                                    <Link to="/login" className="block px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors">Log in</Link>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Signed in as</p>
                                        <p className="text-sm font-semibold text-gray-800 truncate">@{user.username}</p>
                                    </div>
                                    <Link to="/listings/new" className="block sm:hidden px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors">Host your home</Link>
                                    <button 
                                        onClick={logout}
                                        className="w-full text-left block px-4 py-3 text-sm font-normal text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        Log out
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
