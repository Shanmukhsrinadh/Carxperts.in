const STEPS = [
  {
    number: '01',
    title: 'Browse & Filter',
    desc: 'Explore our curated fleet of verified pre-owned cars. Filter by brand, budget, fuel type, and more — no pressure, no sales calls.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: 'bg-sky-500',
    light: 'bg-sky-50',
    text: 'text-sky-600',
  },
  {
    number: '02',
    title: 'Inspect & Test Drive',
    desc: 'Visit us or we come to you. Every car has cleared a 150-point inspection. Take it for a test drive — no commitment required.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-indigo-500',
    light: 'bg-indigo-50',
    text: 'text-indigo-600',
  },
  {
    number: '03',
    title: 'Finance & Paperwork',
    desc: 'Choose from flexible EMI options or pay outright. We handle all the RC transfer, insurance, and paperwork — stress-free.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
    color: 'bg-violet-500',
    light: 'bg-violet-50',
    text: 'text-violet-600',
  },
  {
    number: '04',
    title: 'Drive Home Happy',
    desc: 'Pick up your car or get it delivered to your doorstep. Enjoy a 7-day return policy — because we stand behind every car we sell.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'bg-emerald-500',
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">Simple Process</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">How It Works</h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto text-base">
            From browsing to driving away — we've made buying a pre-owned car the easiest thing you'll do this year.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-200 via-indigo-200 to-emerald-200 z-0" />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl ${step.light} ${step.text} flex items-center justify-center`}>
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-slate-100 select-none">{step.number}</span>
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              <div className={`mt-4 w-8 h-1 rounded-full ${step.color}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
