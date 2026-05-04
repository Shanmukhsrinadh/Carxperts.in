import { useNavigate } from 'react-router-dom';
import { formatPrice, buildWhatsAppMessage, WHATSAPP_NUMBER, CALL_NUMBER } from '../utils/helpers';

const stop = (e) => e.stopPropagation();

const WA_ICON = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const CALL_ICON = (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
  </svg>
);

export default function CarCard({ car, compareList, onToggleCompare }) {
  const navigate = useNavigate();
  const isInCompare = compareList.some(c => c.id === car.id);
  const whatsappMsg = buildWhatsAppMessage(car);

  /* ─────────────────────────────────────────────
     MOBILE — Rapido-style compact horizontal card
     Shown only on xs screens (< 640 px / sm)
  ───────────────────────────────────────────── */
  const MobileCard = () => (
    <div
      onClick={() => navigate(`/car/${car.id}`)}
      className="sm:hidden flex items-stretch bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-transform"
      style={{ minHeight: '90px' }}
    >
      {/* Image */}
      <div className="relative flex-shrink-0 w-28 bg-slate-100">
        <img
          src={car.images[0]}
          alt={car.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {car.financeAvailable === 'yes' && (
          <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sky-500 text-white leading-none">
            EMI
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 px-3 py-2.5 flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <p className="text-[9px] font-bold text-sky-600 uppercase tracking-widest leading-none mb-0.5 truncate">
              {car.brand}
            </p>
            <p className="text-[13px] font-black text-slate-800 leading-tight truncate">
              {car.name}
            </p>
          </div>
          {/* Compare pill */}
          <button
            onClick={(e) => { stop(e); onToggleCompare(car); }}
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
              isInCompare
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            {isInCompare
              ? <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              : <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            }
          </button>
        </div>

        {/* Specs inline */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <span>{car.year}</span>
          <span className="text-slate-200">·</span>
          <span>{(car.kmsDriven / 1000).toFixed(0)}k km</span>
          <span className="text-slate-200">·</span>
          <span>{car.fuelType}</span>
        </div>

        {/* Bottom row — price + quick actions */}
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-black text-gradient leading-none">
            {formatPrice(car.price)}
          </p>
          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white transition-all"
            >
              {WA_ICON}
            </a>
            <a
              href={`tel:${CALL_NUMBER.replace(/\s/g, '')}`}
              onClick={stop}
              className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-700 hover:text-white transition-all"
            >
              {CALL_ICON}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─────────────────────────────────────────────
     DESKTOP — cut-corner card design
     Shown on sm and above (≥ 640 px)
  ───────────────────────────────────────────── */
  const DesktopCard = () => (
    <div className="hidden sm:block relative w-full group">
      {/* Card body */}
      <div
        onClick={() => navigate(`/car/${car.id}`)}
        className="relative w-full bg-[#f3f6fb] rounded-[24px] p-3.5 pb-12 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Shine sweep */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[24px] overflow-hidden"
          aria-hidden
        >
          <div className="shine-inner" />
        </div>

        {/* Image box */}
        <div className="relative bg-[#e9eef5] rounded-xl overflow-hidden"
          style={{ height: '160px' }}
        >
          <img
            src={car.images[0]}
            alt={car.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {car.financeAvailable === 'yes' && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-500/90 text-white backdrop-blur-sm">Finance</span>
            )}
            {car.sunroof === 'yes' && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/90 text-white backdrop-blur-sm">Sunroof</span>
            )}
          </div>

          {/* Body type */}
          <span className="absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-sm">
            {car.bodyType}
          </span>

          {/* Compare */}
          <button
            onClick={(e) => { stop(e); onToggleCompare(car); }}
            className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow transition-all duration-200 ${
              isInCompare ? 'bg-indigo-600 text-white' : 'bg-white/90 text-slate-400 hover:text-indigo-600 hover:bg-white'
            }`}
          >
            {isInCompare
              ? <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
              : <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            }
          </button>
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <p className="text-[9px] font-bold text-sky-600 uppercase tracking-widest mb-0.5">{car.brand}</p>
          <h3 className="text-[14px] font-extrabold text-slate-800 leading-tight truncate">{car.name}</h3>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500 mt-1.5">
            <span>{car.year}</span>
            <span className="text-slate-300">·</span>
            <span>{(car.kmsDriven / 1000).toFixed(0)}k km</span>
            <span className="text-slate-300">·</span>
            <span>{car.fuelType}</span>
            <span className="text-slate-300">·</span>
            <span>{car.transmission}</span>
          </div>

          <p className="text-[17px] font-black text-slate-900 mt-3">{formatPrice(car.price)}</p>
        </div>

        {/* Cut notch at bottom-right — same background as the page so it "cuts" the card */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-slate-50 rounded-tl-[28px]" />
      </div>

      {/* Floating arrow button centered on the cut corner */}
      <button
        onClick={() => navigate(`/car/${car.id}`)}
        className="hidden sm:flex absolute bottom-3 right-3 w-10 h-10 rounded-full btn-primary items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200 z-20"
        title="View details"
      >
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          style={{ transform: 'rotate(-45deg)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="w-full fade-in">
      <MobileCard />
      <DesktopCard />
    </div>
  );
}
