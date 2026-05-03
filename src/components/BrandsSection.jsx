const BRANDS = [
  { name: 'Maruti Suzuki', color: 'from-blue-50 to-blue-100', text: 'text-blue-700', border: 'border-blue-200', initial: 'MS' },
  { name: 'Hyundai',       color: 'from-sky-50 to-sky-100',   text: 'text-sky-700',  border: 'border-sky-200',  initial: 'HY' },
  { name: 'Honda',         color: 'from-red-50 to-red-100',   text: 'text-red-700',  border: 'border-red-200',  initial: 'HO' },
  { name: 'Toyota',        color: 'from-rose-50 to-rose-100', text: 'text-rose-700', border: 'border-rose-200', initial: 'TY' },
  { name: 'Tata',          color: 'from-indigo-50 to-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', initial: 'TA' },
  { name: 'Kia',           color: 'from-violet-50 to-violet-100', text: 'text-violet-700', border: 'border-violet-200', initial: 'KI' },
  { name: 'BMW',           color: 'from-slate-50 to-slate-100', text: 'text-slate-700', border: 'border-slate-200', initial: 'BM' },
  { name: 'Mahindra',      color: 'from-amber-50 to-amber-100', text: 'text-amber-700', border: 'border-amber-200', initial: 'MH' },
  { name: 'Volkswagen',    color: 'from-cyan-50 to-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200', initial: 'VW' },
  { name: 'Skoda',         color: 'from-green-50 to-green-100', text: 'text-green-700', border: 'border-green-200', initial: 'SK' },
  { name: 'Audi',          color: 'from-zinc-50 to-zinc-100', text: 'text-zinc-700', border: 'border-zinc-200', initial: 'AU' },
];

export default function BrandsSection({ onBrandClick }) {
  return (
    <section className="bg-white py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">Browse by Brand</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">Top Brands, All Verified</h2>
          <p className="text-slate-400 mt-2 max-w-md mx-auto">Click any brand to instantly filter the fleet</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {BRANDS.map(brand => (
            <button
              key={brand.name}
              onClick={() => onBrandClick(brand.name)}
              className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${brand.border} bg-gradient-to-br ${brand.color} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${brand.text} bg-white shadow-sm`}>
                {brand.initial}
              </div>
              <span className={`text-sm font-semibold ${brand.text}`}>{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
