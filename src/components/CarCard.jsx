import { useNavigate } from 'react-router-dom';
import { formatPrice, buildWhatsAppMessage, WHATSAPP_NUMBER, CALL_NUMBER } from '../utils/helpers';

const KM_ICON = (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const FUEL_ICON = (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const GEAR_ICON = (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);
const WA_ICON = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const CALL_ICON = (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
  </svg>
);

export default function CarCard({ car, compareList, onToggleCompare }) {
  const navigate = useNavigate();
  const isInCompare = compareList.some(c => c.id === car.id);
  const whatsappMsg = buildWhatsAppMessage(car);

  const CompareBtn = ({ cls }) => (
    <button
      onClick={e => { e.stopPropagation(); onToggleCompare(car); }}
      title={isInCompare ? 'Remove from compare' : 'Add to compare'}
      className={cls}
    >
      {isInCompare
        ? <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
        : <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
      }
    </button>
  );

  return (
    /* overflow-visible so the arrow button can hang below the card */
    <div
      onClick={() => navigate(`/car/${car.id}`)}
      className="car-card relative bg-white rounded-2xl cursor-pointer fade-in group"
    >
      {/* ── Shine overlay (covers whole card, pointer-events-none) ── */}
      <div className="shine-sweep pointer-events-none rounded-2xl" />

      {/* ══════ MOBILE — compact horizontal ══════ */}
      <div className="flex sm:hidden h-28 overflow-hidden rounded-2xl border border-slate-100">
        <div className="relative w-28 flex-shrink-0 bg-slate-50">
          <img src={car.images[0]} alt={car.name} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {car.financeAvailable === 'yes' && (
            <span className="absolute bottom-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sky-500 text-white">EMI</span>
          )}
        </div>
        <div className="flex-1 min-w-0 p-2.5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wide leading-tight">{car.brand}</p>
              <p className="text-sm font-black text-slate-800 leading-tight truncate">{car.name}</p>
              <p className="text-base font-black text-gradient leading-tight">{formatPrice(car.price)}</p>
            </div>
            <CompareBtn cls={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${isInCompare ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-500'}`} />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="font-semibold">{car.year}</span>
            <span className="text-slate-300">·</span>
            <span>{(car.kmsDriven / 1000).toFixed(0)}k km</span>
            <span className="text-slate-300">·</span>
            <span>{car.fuelType}</span>
          </div>
          <div className="flex gap-1.5">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-green-500 text-white text-[10px] font-bold hover:bg-green-600 transition">
              {WA_ICON} WhatsApp
            </a>
            <a href={`tel:${CALL_NUMBER.replace(/\s/g, '')}`} onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-800 text-white text-[10px] font-bold hover:bg-slate-700 transition">
              {CALL_ICON} Call
            </a>
          </div>
        </div>
      </div>

      {/* ══════ DESKTOP — card-image style ══════ */}
      <div className="hidden sm:block">

        {/* Image zone — clipped to rounded top */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-b from-slate-100 to-white">
          <img src={car.images[0]} alt={car.name} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />

          {/* Subtle dark gradient at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Badges — top left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {car.financeAvailable === 'yes' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/95 text-white shadow-sm">Finance</span>
            )}
            {car.sunroof === 'yes' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/95 text-white shadow-sm">Sunroof</span>
            )}
          </div>

          {/* Body type pill — bottom left */}
          <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/45 text-white backdrop-blur-sm">
            {car.bodyType}
          </span>

          {/* Compare — top right */}
          <CompareBtn cls={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${isInCompare ? 'bg-indigo-600 text-white' : 'bg-white/90 text-slate-400 hover:text-indigo-600 hover:bg-white'}`} />
        </div>

        {/* Info zone — NOT overflow-hidden so arrow can hang below */}
        <div className="relative bg-white rounded-b-2xl border border-t-0 border-slate-100 px-4 pt-3.5 pb-14">

          {/* Brand */}
          <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-0.5">{car.brand}</p>

          {/* Car name */}
          <h3 className="text-[15px] font-black text-slate-800 leading-snug mb-3">{car.name}</h3>

          {/* Specs row */}
          <div className="flex items-center gap-2.5 mb-4 text-[11px] text-slate-500 flex-wrap">
            <span className="flex items-center gap-1 font-medium">
              {KM_ICON}
              {(car.kmsDriven / 1000).toFixed(0)}k km
            </span>
            <span className="w-px h-3 bg-slate-200 flex-shrink-0" />
            <span className="flex items-center gap-1 font-medium">
              {FUEL_ICON}
              {car.fuelType}
            </span>
            <span className="w-px h-3 bg-slate-200 flex-shrink-0" />
            <span className="flex items-center gap-1 font-medium">
              {GEAR_ICON}
              {car.transmission}
            </span>
          </div>

          {/* Price + quick contacts */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">All-in price</p>
              <p className="text-xl font-black text-gradient leading-none">{formatPrice(car.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                title="WhatsApp"
                className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200 shadow-sm"
              >{WA_ICON}</a>
              <a
                href={`tel:${CALL_NUMBER.replace(/\s/g, '')}`}
                onClick={e => e.stopPropagation()}
                title="Call"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 shadow-sm"
              >{CALL_ICON}</a>
            </div>
          </div>

          {/* ── Arrow CTA — hangs below card bottom-right ── */}
          <button
            onClick={e => { e.stopPropagation(); navigate(`/car/${car.id}`); }}
            title="View details"
            className="arrow-btn absolute -bottom-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg z-20"
          >
            {/* Arrow: -45deg by default (↗), rotates to 0deg (→) on hover via CSS */}
            <svg
              className="arrow-icon w-5 h-5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
