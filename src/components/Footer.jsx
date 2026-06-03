export default function Footer({ onSellClick }) {
  return (
    <footer className="bg-white pt-16 pb-6">

      {/* FULL WIDTH BACKGROUND */}
      <div className="bg-slate-900 rounded-3xl mx-3 sm:mx-6 lg:mx-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

        {/* ALIGNED CONTENT (same as About section) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* CTA */}
          <div className="border-b border-slate-800 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Ready to find your perfect car?
              </h2>
              <p className="text-slate-400 text-sm">
                Browse our verified fleet or speak to our team today.
              </p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <a
                href="tel:+918466996629"
                className="flex-1 sm:flex-none text-center px-4 py-2 rounded-lg border border-slate-700 text-white text-sm font-medium hover:border-slate-500 transition"
              >
                Call Us
              </a>

              <a
                href="/#fleet"
                className="flex-1 sm:flex-none text-center px-4 py-2 rounded-lg btn-primary text-white text-sm font-medium shadow-md"
              >
                Browse →
              </a>
            </div>

          </div>

          {/* Main Footer */}
          <div className="py-8 sm:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                    <img src="/logo.png" alt="carxperts.in logo" className="w-full h-full object-contain" />
                  </div>
                  <h1 className="text-lg font-bold text-white">carxperts.in</h1>
                </div>

                <p className="text-xs text-slate-400 mb-3">
                  Vijayawada's trusted pre-owned car dealership.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300">ISO Certified</span>
                  <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300">150-Point Check</span>
                  <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300">4.9★ Rated</span>
                </div>
              </div>

              {/* Explore */}
              <nav>
                <h3 className="text-xs font-semibold text-white mb-3 uppercase">Explore</h3>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="/" className="hover:text-sky-400">Home</a></li>
                  <li><a href="/#fleet" className="hover:text-sky-400">Browse Fleet</a></li>
                  <li><a href="/compare" className="hover:text-sky-400">Compare Cars</a></li>
                  <li><button onClick={onSellClick} className="hover:text-sky-400">Sell Your Car</button></li>
                </ul>
              </nav>

              {/* Services */}
              <div>
                <h3 className="text-xs font-semibold text-white mb-3 uppercase">Services</h3>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>Car Finance & EMI</li>
                  <li>RC Transfer</li>
                  <li>150-Point Inspection</li>
                  <li>Doorstep Delivery</li>
                </ul>
              </div>

              {/* Contact */}
              <address className="not-italic">
                <h3 className="text-xs font-semibold text-white mb-3 uppercase">Contact</h3>

                <div className="space-y-2 text-xs text-slate-400">
                  <a href="tel:+918466996629" className="block hover:text-white">
                    📞 +91 84669 96629
                  </a>
                  <a href="https://wa.me/918466996629" target="_blank" rel="noopener noreferrer" className="block hover:text-green-400">
                    💬 WhatsApp Us
                  </a>
                  <a href="https://maps.app.goo.gl/vb4cLMC7tRED9Pdg6" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-400">
                    📍 Vijayawada, Andhra Pradesh
                  </a>
                </div>

                <button
                  onClick={onSellClick}
                  className="mt-4 w-full py-2.5 rounded-lg btn-primary text-white text-xs font-semibold shadow-md"
                >
                  Sell Your Car →
                </button>
              </address>

            </div>

            {/* Bottom */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-2 text-[11px] text-slate-500">
              <p>© {new Date().getFullYear()} carxperts.in — Vijayawada, Andhra Pradesh</p>
              <div className="flex gap-4">
                <span className="hover:text-slate-300 cursor-pointer">Privacy</span>
                <span className="hover:text-slate-300 cursor-pointer">Terms</span>
                <span className="hover:text-slate-300 cursor-pointer">Disclaimer</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
