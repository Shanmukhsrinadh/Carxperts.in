import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import cars from '../data/cars.json';
import { formatPrice, formatKms, buildWhatsAppMessage, WHATSAPP_NUMBER, CALL_NUMBER } from '../utils/helpers';

function calcEMI(price) {
  const down = price * 0.2;
  const principal = price - down;
  const r = 9 / 12 / 100;
  const n = 48;
  const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

function Badge({ value, positive, label }) {
  const yes = value === 'yes';
  const good = yes ? positive : !positive;
  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${good ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${good ? 'bg-green-100' : 'bg-red-100'}`}>
        {good ? (
          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        ) : (
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        )}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className={`text-sm font-black ${good ? 'text-green-700' : 'text-red-600'}`}>{yes ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

const OVERVIEW_ICON = {
  year: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  kms: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  fuel: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  gear: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  owner: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  city: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  color: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  body: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1h8l2-1z" /></svg>,
  engine: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  power: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  torque: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  mileage: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  seats: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  boot: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
  ground: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  tank: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  drive: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
};

function SpecCard({ icon, label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-bold text-slate-800 leading-snug">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="accent-bar w-1 h-6 rounded-full flex-shrink-0" />
      <h3 className="text-lg font-black text-slate-800">{children}</h3>
    </div>
  );
}

export default function CarDetail({ compareList, onToggleCompare }) {
  const { id } = useParams();
  const car = cars.find(c => c.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const isInCompare = compareList.some(c => c.id === car?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveImg(0);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Car not found</h2>
        <Link to="/" className="text-sky-500 hover:underline">← Back to fleet</Link>
      </div>
    );
  }

  const whatsappMsg = buildWhatsAppMessage(car);
  const emi = calcEMI(car.price);
  const similarCars = cars.filter(c => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-5">
          <Link to="/" className="hover:text-sky-500 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Home
          </Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link to="/#fleet" className="hover:text-sky-500 transition-colors">Fleet</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-slate-700 font-semibold truncate">{car.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="relative aspect-video bg-slate-100">
                <img
                  src={car.images[activeImg]}
                  alt={car.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {car.financeAvailable === 'yes' && (
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-sky-500 text-white shadow">EMI Available</span>
                )}
                {car.sunroof === 'yes' && (
                  <span className="absolute top-4 left-36 text-xs font-bold px-3 py-1 rounded-full bg-indigo-500 text-white shadow">Sunroof</span>
                )}
                {/* Image nav arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(i => (i - 1 + car.images.length) % car.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={() => setActiveImg(i => (i + 1) % car.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
                  {activeImg + 1} / {car.images.length}
                </div>
              </div>
              <div className="flex gap-2 p-3">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${activeImg === i ? 'border-sky-500 shadow-sm' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <SectionTitle>Car Overview</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: OVERVIEW_ICON.year,  label: 'Year',          value: car.year },
                  { icon: OVERVIEW_ICON.kms,   label: 'KMs Driven',    value: formatKms(car.kmsDriven) },
                  { icon: OVERVIEW_ICON.fuel,  label: 'Fuel Type',     value: car.fuelType },
                  { icon: OVERVIEW_ICON.gear,  label: 'Transmission',  value: car.transmission },
                  { icon: OVERVIEW_ICON.owner, label: 'Ownership',     value: car.ownership },
                  { icon: OVERVIEW_ICON.city,  label: 'Reg. City',     value: car.registrationCity },
                  { icon: OVERVIEW_ICON.color, label: 'Colour',        value: car.color },
                  { icon: OVERVIEW_ICON.body,  label: 'Body Type',     value: car.bodyType },
                ].map(s => (
                  <SpecCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
                ))}
              </div>
            </div>

            {/* Engine & Performance */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <SectionTitle>Engine & Performance</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: OVERVIEW_ICON.engine,  label: 'Engine',            value: car.engineDisplacement },
                  { icon: OVERVIEW_ICON.engine,  label: 'Engine Type',       value: car.engineType },
                  { icon: OVERVIEW_ICON.power,   label: 'Max Power',         value: car.maxPower },
                  { icon: OVERVIEW_ICON.torque,  label: 'Max Torque',        value: car.maxTorque },
                  { icon: OVERVIEW_ICON.mileage, label: car.fuelType === 'Electric' ? 'Range' : 'Mileage', value: car.mileage },
                  { icon: OVERVIEW_ICON.drive,   label: 'Drive Type',        value: car.driveType },
                  { icon: OVERVIEW_ICON.seats,   label: 'Seating Capacity',  value: `${car.seatingCapacity} Persons` },
                  { icon: OVERVIEW_ICON.boot,    label: 'Boot Space',        value: car.bootSpace },
                  { icon: OVERVIEW_ICON.ground,  label: 'Ground Clearance',  value: car.groundClearance },
                  { icon: OVERVIEW_ICON.tank,    label: car.fuelType === 'Electric' ? 'Battery' : 'Fuel Tank', value: car.fuelTankCapacity },
                ].map(s => (
                  <SpecCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <SectionTitle>Features & Highlights</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {car.features.map(f => (
                  <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
                    <svg className="w-3 h-3 text-sky-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Condition & Documentation */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <SectionTitle>Condition & Documentation</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <Badge value={car.insurance}        positive={true}  label="Insurance Valid" />
                <Badge value={car.accidental}       positive={false} label="Accidental" />
                <Badge value={car.financeAvailable} positive={true}  label="Finance Available" />
                <Badge value={car.sunroof}          positive={true}  label="Sunroof" />
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tyre Condition</p>
                  <p className="text-sm font-bold text-slate-800">{car.tyreCondition}</p>
                </div>
              </div>
            </div>

            {/* Similar Cars */}
            {similarCars.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <SectionTitle>Similar Cars You May Like</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {similarCars.map(c => (
                    <Link
                      key={c.id}
                      to={`/car/${c.id}`}
                      className="group rounded-xl overflow-hidden border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="h-32 bg-slate-100 overflow-hidden">
                        <img src={c.images[0]} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <p className="text-[9px] font-bold text-sky-600 uppercase tracking-widest">{c.brand}</p>
                        <p className="text-sm font-black text-slate-800 truncate">{c.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-slate-400">{c.year} · {(c.kmsDriven/1000).toFixed(0)}k km</p>
                          <p className="text-sm font-black text-gradient">{formatPrice(c.price)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Price & CTAs */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-0.5">{car.brand} · {car.bodyType}</p>
                <h1 className="text-xl font-black text-slate-800 leading-tight">{car.name}</h1>
                <p className="text-xs text-slate-400 mt-0.5 mb-4">{car.year} · {car.color} · {car.registrationCity}</p>
                <div className="accent-bar h-0.5 rounded-full mb-4" />

                <p className="text-3xl font-black text-gradient leading-none">{formatPrice(car.price)}</p>
                <p className="text-xs text-slate-400 mt-0.5 mb-1">All-inclusive price · No hidden costs</p>

                {/* EMI estimate */}
                <div className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-xl px-3 py-2.5 mt-3 mb-5">
                  <svg className="w-4 h-4 text-sky-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <p className="text-xs text-sky-700">
                    <span className="font-black text-sm">~{formatPrice(emi)}/mo</span>
                    <span className="text-slate-500"> · 20% down · 48 months @ 9%</span>
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: 'Year',    value: car.year },
                    { label: 'KMs',     value: `${(car.kmsDriven/1000).toFixed(0)}k` },
                    { label: 'Fuel',    value: car.fuelType },
                  ].map(s => (
                    <div key={s.label} className="text-center bg-slate-50 rounded-xl p-2.5">
                      <p className="text-[9px] text-slate-400 font-semibold uppercase">{s.label}</p>
                      <p className="font-black text-slate-800 text-sm mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 active:scale-95 transition-all mb-2.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enquire on WhatsApp
                </a>

                {/* Call */}
                <a
                  href={`tel:${CALL_NUMBER.replace(/\s/g, '')}`}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 active:scale-95 transition-all mb-2.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Call {CALL_NUMBER}
                </a>

                {/* Compare */}
                <button
                  onClick={() => onToggleCompare(car)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all active:scale-95 ${isInCompare ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-500'}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {isInCompare ? 'Remove from Compare' : 'Add to Compare'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Why Buy From Big Boy Cars</p>
                <div className="space-y-2.5">
                  {[
                    { icon: '🔍', text: '150-Point Inspection Certified' },
                    { icon: '📄', text: 'RC Transfer Assistance' },
                    { icon: '💳', text: 'Easy Finance from ₹0 Down' },
                    { icon: '🚗', text: 'Doorstep Delivery Available' },
                    { icon: '🛡️', text: 'No Hidden Charges, Ever' },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="text-base">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Share / Save */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Share This Car</p>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/?text=Check out this ${car.name} on Big Boy Cars: ${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-semibold hover:bg-green-100 transition"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Share
                  </a>
                  <button
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy Link
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
