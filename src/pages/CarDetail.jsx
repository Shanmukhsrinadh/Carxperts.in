import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import cars from '../data/cars.json';
import { formatPrice, formatKms, buildWhatsAppMessage, WHATSAPP_NUMBER, CALL_NUMBER } from '../utils/helpers';

const SPEC_ICON = {
  year: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ),
  fuel: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  kms: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
  ),
  gearbox: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
  ),
};

function Badge({ value, positive }) {
  const yes = value === 'yes';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${yes && positive ? 'bg-green-100 text-green-700' : !yes && !positive ? 'bg-green-100 text-green-700' : yes && !positive ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
      {yes ? (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {yes ? 'Yes' : 'No'}
    </span>
  );
}

export default function CarDetail({ compareList, onToggleCompare }) {
  const { id } = useParams();
  const car = cars.find(c => c.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Car not found</h2>
        <Link to="/" className="text-sky-500 hover:underline">← Back to fleet</Link>
      </div>
    );
  }

  const whatsappMsg = buildWhatsAppMessage(car);
  const isInCompare = compareList.some(c => c.id === car.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 fade-in">
        <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <span className="text-slate-700 font-medium">{car.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Gallery */}
        <div className="lg:col-span-2 fade-in">
          {/* Main image */}
          <div className="rounded-2xl overflow-hidden bg-slate-100 shadow-md aspect-video mb-3">
            <img
              src={car.images[activeImg]}
              alt={car.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3">
            {car.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? 'border-sky-500 shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Specs grid */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Year', value: car.year, icon: SPEC_ICON.year },
                { label: 'KMs Driven', value: formatKms(car.kmsDriven), icon: SPEC_ICON.kms },
                { label: 'Fuel Type', value: car.fuelType, icon: SPEC_ICON.fuel },
                { label: 'Transmission', value: car.transmission, icon: SPEC_ICON.gearbox },
                { label: 'Color', value: car.color },
                { label: 'Tyre Condition', value: car.tyreCondition },
              ].map(spec => (
                <div key={spec.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 text-sky-500 mb-2">
                    {spec.icon || <div className="w-5 h-5 rounded-full bg-sky-100" />}
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{spec.label}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Boolean specs */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Insurance', value: car.insurance, positive: true },
                { label: 'Accidental', value: car.accidental, positive: false },
                { label: 'Finance Available', value: car.financeAvailable, positive: true },
                { label: 'Sunroof', value: car.sunroof, positive: true },
              ].map(spec => (
                <div key={spec.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{spec.label}</span>
                  <Badge value={spec.value} positive={spec.positive} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4 fade-in">
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
              <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">{car.brand}</p>
              <h1 className="text-2xl font-black text-slate-800 leading-tight mb-1">{car.name}</h1>
              <p className="text-sm text-slate-400 mb-4">{car.year} • {car.color}</p>
              <div className="accent-bar h-0.5 rounded-full mb-5" />
              <p className="text-4xl font-black text-gradient mb-1">{formatPrice(car.price)}</p>
              <p className="text-sm text-slate-400 mb-6">All-inclusive price</p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="text-center bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">Year</p>
                  <p className="font-bold text-slate-800 text-sm">{car.year}</p>
                </div>
                <div className="text-center bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">KMs</p>
                  <p className="font-bold text-slate-800 text-sm">{(car.kmsDriven/1000).toFixed(0)}k</p>
                </div>
                <div className="text-center bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">Fuel</p>
                  <p className="font-bold text-slate-800 text-sm text-xs">{car.fuelType}</p>
                </div>
              </div>

              {/* CTAs */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition mb-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href={`tel:${CALL_NUMBER.replace(/\s/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition mb-3"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
                {CALL_NUMBER}
              </a>
              <button
                onClick={() => onToggleCompare(car)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition ${isInCompare ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-500'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {isInCompare ? 'Remove from Compare' : 'Add to Compare'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Why Buy From Us</p>
              <div className="space-y-2.5">
                {[
                  'Fully Inspected & Verified',
                  'Easy Finance Options',
                  'No Hidden Charges',
                  'Doorstep Delivery',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
