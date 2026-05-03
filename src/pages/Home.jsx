import { useState, useMemo, useRef } from 'react';
import cars from '../data/cars.json';
import CarCard from '../components/CarCard';
import HowItWorks from '../components/HowItWorks';
import AboutSection from '../components/AboutSection';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import FinanceBanner from '../components/FinanceBanner';

const BRANDS = ['All', ...Array.from(new Set(cars.map(c => c.brand))).sort()];
const FUELS = ['All', ...Array.from(new Set(cars.map(c => c.fuelType))).sort()];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹10L', min: 0, max: 1000000 },
  { label: '₹10L – ₹20L', min: 1000000, max: 2000000 },
  { label: '₹20L – ₹35L', min: 2000000, max: 3500000 },
  { label: 'Above ₹35L', min: 3500000, max: Infinity },
];

const BODY_TYPES = ['All', 'Hatchback', 'Sedan', 'SUV', 'Luxury'];

const BODY_TYPE_ICONS = {
  All: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Hatchback: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 11l2-4h10l2 4H5zm-2 2v3h1a2 2 0 004 0h6a2 2 0 004 0h1v-3H3zm4 3a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"/>
    </svg>
  ),
  Sedan: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 11l3-5h10l3 5H4zm-1 2v3h1a2 2 0 004 0h8a2 2 0 004 0h1v-3H3zm4 3a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"/>
    </svg>
  ),
  SUV: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 11l3-6h12l3 6H3zm-1 2v4h1.5a2.5 2.5 0 005 0h7a2.5 2.5 0 005 0H21v-4H2zm5 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
    </svg>
  ),
  Luxury: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 9l2-4h10l2 4H5zm-2 2v4h1a2 2 0 004 0h8a2 2 0 004 0h1v-4H3zm3.5 4a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2zM12 5v1" />
    </svg>
  ),
};

export default function Home({ compareList, onToggleCompare, onSellClick }) {
  const [brand, setBrand] = useState('All');
  const [fuel, setFuel] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [bodyType, setBodyType] = useState('All');
  const fleetRef = useRef(null);

  const filtered = useMemo(() => {
    let result = cars.filter(car => {
      const range = PRICE_RANGES[priceRange];
      const matchBrand = brand === 'All' || car.brand === brand;
      const matchFuel = fuel === 'All' || car.fuelType === fuel;
      const matchPrice = car.price >= range.min && car.price < range.max;
      const matchSearch = !search || car.name.toLowerCase().includes(search.toLowerCase()) || car.brand.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchFuel && matchPrice && matchSearch;
    });
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'year-desc') result = [...result].sort((a, b) => b.year - a.year);
    if (sort === 'kms-asc') result = [...result].sort((a, b) => a.kmsDriven - b.kmsDriven);
    return result;
  }, [brand, fuel, priceRange, search, sort]);

  const displayed = useMemo(() => {
    if (bodyType === 'All') return filtered;
    return filtered.filter(car => car.bodyType === bodyType);
  }, [filtered, bodyType]);

  function scrollToFleet() {
    fleetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const hasActiveFilters = brand !== 'All' || fuel !== 'All' || priceRange !== 0 || search || sort !== 'default';

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-violet-500/10 blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/30 mb-7">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-300 text-xs font-semibold uppercase tracking-wider">Mumbai's Most Trusted Pre-Owned Cars</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Find Your
              <br />
              <span className="text-gradient">Perfect Drive</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl">
              Handpicked, verified pre-owned cars from 10 years of experience. Transparent pricing, zero hidden costs, and a story behind every car we sell.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <button
                onClick={scrollToFleet}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-primary text-white font-bold shadow-lg hover:opacity-90 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Browse Fleet
              </button>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition"
              >
                Our Story
              </a>
            </div>

            <div className="flex flex-wrap gap-8 sm:gap-12">
              {[
                { value: `${cars.length}+`, label: 'Cars in Fleet' },
                { value: '2000+', label: 'Cars Sold' },
                { value: '10 Yrs', label: 'In Business' },
                { value: '4.9★', label: 'Customer Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ height: '60px' }}>
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#f1f5f9" />
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── FLEET (with filters) ── */}
      <section ref={fleetRef} id="fleet" className="bg-slate-50 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">Our Fleet</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800">Every Car, Fully Verified</h2>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">
              Each listing includes a complete inspection report. What you see online is exactly what you get in person.
            </p>
          </div>

          {/* ── Main Filter Bar ── */}
          <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-100 mb-4">
            <div className="flex flex-wrap gap-3 items-end">
              {/* Search */}
              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Search</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search cars…"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="min-w-36">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Brand</label>
                <select
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white transition"
                >
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Fuel */}
              <div className="min-w-36">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Fuel</label>
                <select
                  value={fuel}
                  onChange={e => setFuel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white transition"
                >
                  {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Price Range */}
              <div className="min-w-44">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Price Range</label>
                <select
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white transition"
                >
                  {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
                </select>
              </div>

              {/* Sort */}
              <div className="min-w-44">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Sort By</label>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white transition"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Newest First</option>
                  <option value="kms-asc">Lowest KMs</option>
                </select>
              </div>

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  onClick={() => { setBrand('All'); setFuel('All'); setPriceRange(0); setSearch(''); setSort('default'); setBodyType('All'); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 transition"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* ── Body Type Pills ── */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            {BODY_TYPES.map(type => {
              const count = type === 'All' ? filtered.length : filtered.filter(c => c.bodyType === type).length;
              const active = bodyType === type;
              return (
                <button
                  key={type}
                  onClick={() => setBodyType(type)}
                  disabled={count === 0}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    active
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md'
                      : count === 0
                        ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                        : 'text-slate-600 border-slate-200 bg-white hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  <span className={active ? 'text-white' : count === 0 ? 'text-slate-300' : 'text-slate-400'}>
                    {BODY_TYPE_ICONS[type]}
                  </span>
                  {type}
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Count + compare hint */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-800">{displayed.length}</span> of {cars.length} cars
              {brand !== 'All' && <span className="ml-1 text-sky-600 font-semibold">· {brand}</span>}
              {bodyType !== 'All' && <span className="ml-1 text-sky-600 font-semibold">· {bodyType}</span>}
            </p>
            {compareList.length > 0 && (
              <span className="text-sm text-indigo-600 font-semibold">
                {compareList.length} selected for compare
              </span>
            )}
          </div>

          {/* Grid */}
          {displayed.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-bold text-slate-300">No cars match your filters</p>
              <p className="mt-1 text-sm">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
              {displayed.map((car, i) => (
                <div key={car.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <CarCard car={car} compareList={compareList} onToggleCompare={onToggleCompare} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FINANCE + SELL BANNER ── */}
      <FinanceBanner onSellClick={onSellClick} />

      {/* ── WHY US ── */}
      <WhyUs />

      {/* ── ABOUT ── */}
      <AboutSection />

      {/* ── TESTIMONIALS ── */}
      <Testimonials />
    </div>
  );
}
