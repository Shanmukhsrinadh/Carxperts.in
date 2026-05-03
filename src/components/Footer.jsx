export default function Footer({ onSellClick }) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-1 3 3 3-3 2 1z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Auto<span className="text-gradient">Prime</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Premium pre-owned cars. Handpicked, verified, and priced to perfection. Your dream car is just a call away.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-sky-400 transition-colors">Home</a></li>
              <li><a href="/compare" className="hover:text-sky-400 transition-colors">Compare Cars</a></li>
              <li>
                <button onClick={onSellClick} className="hover:text-sky-400 transition-colors">
                  Sell Your Car
                </button>
              </li>
            </ul>
          </div>

          {/* Sell CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sell With Us</h4>
            <p className="text-sm text-slate-400 mb-4">
              Get the best price for your car. Quick process, zero hassle.
            </p>
            <button
              onClick={onSellClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-primary text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Sell Your Car
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} AutoPrime. All rights reserved. | Premium Pre-owned Cars
        </div>
      </div>
    </footer>
  );
}
