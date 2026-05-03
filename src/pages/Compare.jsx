import { Link } from 'react-router-dom';
import { formatPrice, formatKms, buildWhatsAppMessage, WHATSAPP_NUMBER } from '../utils/helpers';

const ROWS = [
  { label: 'Price', key: 'price', render: v => formatPrice(v) },
  { label: 'Year', key: 'year' },
  { label: 'KMs Driven', key: 'kmsDriven', render: v => formatKms(v) },
  { label: 'Fuel Type', key: 'fuelType' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Color', key: 'color' },
  { label: 'Tyre Condition', key: 'tyreCondition' },
  { label: 'Insurance', key: 'insurance', badge: true },
  { label: 'Accidental', key: 'accidental', badge: true, negative: true },
  { label: 'Finance Available', key: 'financeAvailable', badge: true },
  { label: 'Sunroof', key: 'sunroof', badge: true },
];

function isDiff(cars, key) {
  const vals = cars.map(c => c[key]);
  return new Set(vals).size > 1;
}

function CellBadge({ value, negative }) {
  const yes = value === 'yes';
  const isGood = negative ? !yes : yes;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
      {yes ? (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {yes ? 'Yes' : 'No'}
    </span>
  );
}

export default function Compare({ compareList, onRemove }) {
  if (compareList.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 fade-in">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-700 mb-2">No Cars Selected</h2>
        <p className="text-slate-400 mb-6 max-w-sm">Go to the fleet and tap the compare icon on any car to add it here. You can compare up to 3 cars.</p>
        <Link to="/" className="px-6 py-3 rounded-xl btn-primary text-white font-bold hover:opacity-90 transition shadow-md">
          Browse Fleet
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Compare Cars</h1>
          <p className="text-slate-400 mt-1">Side-by-side comparison of your selected cars</p>
        </div>
        <Link to="/" className="text-sm text-sky-600 hover:text-sky-700 font-semibold">
          + Add more cars
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-md border border-slate-100 bg-white">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-5 text-sm font-bold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-100 w-40">Feature</th>
              {compareList.map(car => (
                <th key={car.id} className="p-5 bg-slate-50 border-b border-slate-100">
                  <div className="flex flex-col items-center gap-3">
                    <img src={car.images[0]} alt={car.name} className="w-full max-w-40 h-28 object-cover rounded-xl shadow-sm" />
                    <div className="text-center">
                      <p className="text-xs font-semibold text-sky-600 uppercase">{car.brand}</p>
                      <p className="text-sm font-black text-slate-800">{car.name}</p>
                    </div>
                    <button
                      onClick={() => onRemove(car.id)}
                      className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => {
              const diff = isDiff(compareList, row.key);
              return (
                <tr
                  key={row.key}
                  className={`border-b border-slate-50 last:border-0 ${diff ? 'bg-amber-50/40' : ''}`}
                >
                  <td className="p-4 pl-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-600">{row.label}</span>
                      {diff && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">diff</span>
                      )}
                    </div>
                  </td>
                  {compareList.map(car => {
                    const val = car[row.key];
                    return (
                      <td key={car.id} className="p-4 text-center">
                        {row.badge ? (
                          <CellBadge value={val} negative={row.negative} />
                        ) : (
                          <span className={`text-sm font-bold ${diff ? 'text-slate-900' : 'text-slate-700'}`}>
                            {row.render ? row.render(val) : val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* CTA row */}
            <tr className="bg-slate-50 border-t border-slate-100">
              <td className="p-4 pl-5 text-sm font-semibold text-slate-600">Enquire</td>
              {compareList.map(car => (
                <td key={car.id} className="p-4 text-center">
                  <div className="flex flex-col gap-2 items-center">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(car)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                    <Link
                      to={`/car/${car.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg btn-primary text-white text-xs font-bold hover:opacity-90 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
