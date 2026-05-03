import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onSellClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/compare', label: 'Compare' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-1 3 3 3-3 2 1z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3 3 3m0 5V9a1 1 0 011-1h2a1 1 0 011 1v7" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Auto<span className="text-gradient">Prime</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === to
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={onSellClick}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold btn-primary text-white shadow-md hover:opacity-90 transition-all duration-200"
            >
              Sell Car
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-1 fade-in">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                  location.pathname === to
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onSellClick(); }}
              className="w-full mt-1 px-4 py-2 rounded-lg text-sm font-semibold btn-primary text-white"
            >
              Sell Car
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
