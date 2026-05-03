export default function FinanceBanner({ onSellClick }) {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="hero-gradient rounded-3xl overflow-hidden relative">
          {/* Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-10 sm:p-14">
            {/* Left: Finance */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/30 mb-5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-sky-300 text-xs font-bold uppercase tracking-wider">Finance Available</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Drive Today.
                <br />
                <span className="text-gradient">Pay in Easy EMIs.</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Get finance approved in under 48 hours. Flexible tenures from 12 to 60 months. Interest rates starting at just 8.5% per annum.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { label: 'Approval Time', value: '< 48 hrs' },
                  { label: 'Starting Rate', value: '8.5% p.a.' },
                  { label: 'Bank Partners', value: '10+' },
                ].map(f => (
                  <div key={f.label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                    <p className="text-white font-black text-lg">{f.value}</p>
                    <p className="text-slate-400 text-xs">{f.label}</p>
                  </div>
                ))}
              </div>
              <a
                href="tel:+919999999999"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
                Talk to Finance Team
              </a>
            </div>

            {/* Right: Sell CTA */}
            <div className="lg:border-l lg:border-white/10 lg:pl-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider">Selling Your Car?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Best Price.
                <br />
                <span className="text-gradient">Same Day Offer.</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Stop settling for lowball offers. We give you a fair market valuation and instant payment — no waiting, no negotiation games.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { label: 'Offer Time', value: '2 Hours' },
                  { label: 'Payment', value: 'Same Day' },
                  { label: 'Paperwork', value: 'We Handle It' },
                ].map(f => (
                  <div key={f.label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                    <p className="text-white font-black text-lg">{f.value}</p>
                    <p className="text-slate-400 text-xs">{f.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={onSellClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-bold hover:opacity-90 transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Get Instant Valuation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
