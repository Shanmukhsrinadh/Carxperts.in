const MILESTONES = [
  { year: '2014', event: 'Founded in a single garage in Mumbai with 5 cars and a big dream.' },
  { year: '2017', event: 'Expanded to 3 cities. Crossed 500 happy customers and launched finance tie-ups.' },
  { year: '2020', event: 'Went digital-first with virtual tours and doorstep delivery during the pandemic.' },
  { year: '2024', event: 'Now serving 12 cities, 2000+ cars sold, and rated 4.9★ by our customers.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Story */}
          <div className="fade-in">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-800 leading-tight mb-6">
              Born from a
              <br />
              <span className="text-gradient">love of cars.</span>
              <br />
              Built on trust.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              AutoPrime started in a small garage in Mumbai in 2014. Our founder Rohan Mehta spent years watching families overpay for cars they couldn't fully trust — and decided to fix that. Not with gimmicks, but with transparency.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Every car in our fleet goes through a rigorous 150-point check. Every price is what you pay — no dealer markups, no hidden service charges, no last-minute surprises. We believe buying a used car should feel as good as buying a new one.
            </p>

            {/* Values chips */}
            <div className="flex flex-wrap gap-2">
              {['Transparency First', 'No Hidden Costs', '150-Point Check', 'Doorstep Delivery', '7-Day Returns', 'Easy Finance'].map(val => (
                <span key={val} className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                  {val}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="relative fade-in">
            {/* Background accent */}
            <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full bg-gradient-to-br from-sky-50 to-indigo-50 blur-2xl opacity-80 pointer-events-none" />

            <div className="relative space-y-0">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-5">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full btn-primary flex items-center justify-center text-white text-xs font-black shadow-md flex-shrink-0">
                      {m.year.slice(2)}
                    </div>
                    {i < MILESTONES.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-sky-300 to-indigo-200 my-1 min-h-8" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-8 ${i === MILESTONES.length - 1 ? 'pb-0' : ''}`}>
                    <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">{m.year}</p>
                    <p className="text-slate-700 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stat card */}
            <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '2000+', label: 'Cars Sold' },
                  { value: '12', label: 'Cities' },
                  { value: '4.9★', label: 'Avg Rating' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-black text-gradient">{s.value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
