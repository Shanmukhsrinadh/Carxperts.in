import { useState } from 'react';
import { buildSellWhatsAppMessage, WHATSAPP_NUMBER } from '../utils/helpers';

const initial = {
  carName: '',
  brand: '',
  year: '',
  kmsDriven: '',
  accidental: 'no',
  insurance: 'yes',
};

export default function SellModal({ onClose }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.carName.trim()) e.carName = 'Required';
    if (!form.brand.trim()) e.brand = 'Required';
    if (!form.year || isNaN(form.year) || form.year < 1990 || form.year > new Date().getFullYear())
      e.year = 'Enter a valid year';
    if (!form.kmsDriven || isNaN(form.kmsDriven) || form.kmsDriven < 0)
      e.kmsDriven = 'Enter valid KMs';
    return e;
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    const msg = buildSellWhatsAppMessage(form);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,17,32,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg fade-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="hero-gradient px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-bold">Sell Your Car</h2>
            <p className="text-slate-300 text-sm mt-0.5">Get the best price — we'll contact you on WhatsApp</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Car Name *</label>
              <input
                name="carName"
                value={form.carName}
                onChange={handleChange}
                placeholder="e.g. Swift VXI"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition ${errors.carName ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.carName && <p className="text-red-500 text-xs mt-1">{errors.carName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Brand *</label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="e.g. Maruti Suzuki"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition ${errors.brand ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Year *</label>
              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="e.g. 2021"
                min="1990"
                max={new Date().getFullYear()}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition ${errors.year ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">KMs Driven *</label>
              <input
                name="kmsDriven"
                type="number"
                value={form.kmsDriven}
                onChange={handleChange}
                placeholder="e.g. 35000"
                min="0"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition ${errors.kmsDriven ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.kmsDriven && <p className="text-red-500 text-xs mt-1">{errors.kmsDriven}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Accidental?</label>
              <select
                name="accidental"
                value={form.accidental}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Insurance Valid?</label>
              <select
                name="insurance"
                value={form.insurance}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl btn-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
