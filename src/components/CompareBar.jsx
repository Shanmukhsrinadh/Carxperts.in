import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

export default function CompareBar({ compareList, onRemove, onClear }) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-dark shadow-2xl border-t border-white/10 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 overflow-x-auto">
        <span className="text-slate-300 text-sm font-medium whitespace-nowrap">
          Compare ({compareList.length}/3):
        </span>
        <div className="flex gap-3 flex-1">
          {compareList.map(car => (
            <div key={car.id} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 whitespace-nowrap">
              <img src={car.images[0]} alt={car.name} className="w-8 h-8 rounded-md object-cover" />
              <div>
                <p className="text-white text-xs font-semibold leading-tight">{car.name}</p>
                <p className="text-sky-400 text-xs">{formatPrice(car.price)}</p>
              </div>
              <button
                onClick={() => onRemove(car.id)}
                className="text-slate-400 hover:text-white ml-1 transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onClear}
            className="text-slate-400 hover:text-white text-xs transition whitespace-nowrap"
          >
            Clear all
          </button>
          {compareList.length >= 2 && (
            <Link
              to="/compare"
              className="px-4 py-2 rounded-lg btn-primary text-white text-sm font-semibold whitespace-nowrap hover:opacity-90 transition"
            >
              Compare Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
