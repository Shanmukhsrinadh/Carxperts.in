import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cars from '../data/cars.json';
import { formatPrice } from '../utils/helpers';

const FEATURED = [
  cars.find(c => c.id === 3),  // Fortuner — premium visual
  cars.find(c => c.id === 8),  // Scorpio N
  cars.find(c => c.id === 2),  // Creta
  cars.find(c => c.id === 7),  // BMW
].filter(Boolean);

const TRUST_ITEMS = [
  { value: '12+',    label: 'Cars in Fleet' },
  { value: '2000+',  label: 'Cars Sold'     },
  { value: '10 Yrs', label: 'In Business'   },
  { value: '4.9 ★',  label: 'Avg Rating'    },
];

export default function Hero({ onSellClick, onBrowse }) {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState('');
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  function goTo(idx) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 300);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % FEATURED.length);
    }, 3800);
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      onBrowse(search.trim());
    } else {
      onBrowse('');
    }
  }

  const car = FEATURED[active];

  return (
    <section className="hero-gradient relative overflow-hidden min-h-[92svh] sm:min-h-[92vh] flex items-center">

      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4  w-[500px] h-[500px] rounded-full bg-sky-500/10   blur-3xl animate-pulse" />
        <div className="absolute bottom-0   right-0   w-[400px] h-[400px] rounded-full bg-indigo-600/12 blur-3xl" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2   left-1/2   w-[300px] h-[300px] rounded-full bg-violet-500/8  blur-2xl" />
        {/* subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)'
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-20 sm:py-0 -mt-4 sm:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="order-2 lg:order-1">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-300 text-xs font-bold uppercase tracking-widest">carxperts.in — Vijayawada's Most Trusted</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-white leading-[0.95] tracking-tight mb-5">
              Find Your
              <br />
              <span className="text-gradient">Perfect Drive</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Handpicked, verified pre-owned cars with full inspection reports. 
              Transparent pricing, zero hidden costs — and a car you'll love from day one.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative mb-8 max-w-md">
              <div className="relative flex items-center">
                <svg className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder='Try "Swift", "Creta", "BMW"…'
                  className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 rounded-xl btn-primary text-white text-sm font-bold hover:opacity-90 transition"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => onBrowse('')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-primary text-white font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Browse All Cars
              </button>
              <button
                onClick={onSellClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 text-white font-bold hover:bg-white/10 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sell My Car
              </button>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-4 gap-1 max-w-sm sm:max-w-none sm:flex sm:gap-8">
              {TRUST_ITEMS.map((t, i) => (
                <div key={t.label} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <p className="text-xl sm:text-2xl font-black text-white">{t.value}</p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5 sm:mt-0">{t.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Live car showcase ── */}
          <div className="hidden lg:flex order-1 lg:order-2 relative items-center justify-end">
            {/* Glow behind card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/10 to-indigo-600/15 blur-2xl scale-110" />

            {/* Featured car card */}
            <div className="relative w-full max-w-[460px]">
              {/* Main card */}
              <div
                onClick={() => navigate(`/car/${car.id}`)}
                className={`cursor-pointer bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${animating ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}
              >
                {/* Car image */}
                <div className="relative h-56 sm:h-64 bg-slate-100 overflow-hidden">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {car.sunroof === 'yes' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/90 text-white backdrop-blur-sm">Sunroof</span>
                    )}
                    {car.financeAvailable === 'yes' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/90 text-white backdrop-blur-sm">Finance</span>
                    )}
                  </div>

                  {/* Bottom overlay: price */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white/70 text-[10px] font-semibold uppercase tracking-widest">{car.brand}</p>
                      <p className="text-white font-black text-lg leading-tight">{car.name}</p>
                    </div>
                    <p className="text-2xl font-black text-white">{formatPrice(car.price)}</p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {car.year}
                    </span>
                    <span className="text-slate-200">·</span>
                    <span>{(car.kmsDriven/1000).toFixed(0)}k km</span>
                    <span className="text-slate-200">·</span>
                    <span>{car.fuelType}</span>
                    <span className="text-slate-200">·</span>
                    <span>{car.transmission}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{car.bodyType}</span>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {FEATURED.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-sky-400' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>

              {/* Floating trust badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800">150-Point</p>
                  <p className="text-[10px] text-slate-400 leading-none">Verified</p>
                </div>
              </div>

              {/* Floating EMI badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800">Easy EMI</p>
                  <p className="text-[10px] text-slate-400 leading-none">From 8.5% p.a.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ height: '60px' }}>
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#f1f5f9" />
        </svg>
      </div>
    </section>
  );
}
