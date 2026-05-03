import { useState, useMemo } from 'react';
import cars from '../data/cars.json';
import CarCard from '../components/CarCard';
import { formatPrice } from '../utils/helpers';

const BRANDS = ['All', ...Array.from(new Set(cars.map(c => c.brand))).sort()];
const FUELS = ['All', ...Array.from(new Set(cars.map(c => c.fuelType))).sort()];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹10L', min: 0, max: 1000000 },
  { label: '₹10L – ₹20L', min: 1000000, max: 2000000 },
  { label: '₹20L – ₹35L', min: 2000000, max: 3500000 },
  { label: 'Above ₹35L', min: 3500000, max: Infinity },
];

export default function Home({ compareList, onToggleCompare }) {
  const [brand, setBrand] = useState('All');
  const [fuel, setFuel] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

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

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-300 text-xs font-semibold uppercase tracking-wider">Premium Pre-Owned Cars</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Find Your
              <br />
              <span className="text-gradient">Perfect Drive</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl">
              Handpicked, verified pre-owned cars. Transparent pricing, easy finance, and zero hidden costs.
            </p>
            {/* Stats */}
            <div className="flex gap-8 sm:gap-12">
              {[
                { value: `${cars.length}+`, label: 'Cars Available' },
                { value: '100%', label: 'Verified' },
                { value: '0', label: 'Hidden Costs' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-100" style={{
          clipPath: 'ellipse(55% 100% at 50% 100%)'
        }} />
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pt-10 pb-6">
        <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
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
            {(brand !== 'All' || fuel !== 'All' || priceRange !== 0 || search || sort !== 'default') && (
              <button
                onClick={() => { setBrand('All'); setFuel('All'); setPriceRange(0); setSearch(''); setSort('default'); }}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 transition"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-800">
            Our Fleet
            <span className="ml-2 text-base font-semibold text-slate-400">({filtered.length} cars)</span>
          </h2>
          {compareList.length > 0 && (
            <span className="text-sm text-indigo-600 font-semibold">
              {compareList.length} car{compareList.length > 1 ? 's' : ''} selected for compare
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-bold text-slate-300">No cars match your filters</p>
            <p className="mt-1 text-sm">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((car, i) => (
              <div key={car.id} style={{ animationDelay: `${i * 60}ms` }}>
                <CarCard car={car} compareList={compareList} onToggleCompare={onToggleCompare} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
