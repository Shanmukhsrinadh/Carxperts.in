const REVIEWS = [
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    avatar: 'PS',
    avatarColor: 'from-pink-400 to-rose-500',
    car: 'Hyundai Creta SX 2022',
    rating: 5,
    text: "I was skeptical about buying a used car online, but AutoPrime completely changed my mind. The car was exactly as described, the paperwork took less than a day, and they delivered it to my doorstep. Genuinely impressed.",
  },
  {
    name: 'Arjun Nair',
    city: 'Bangalore',
    avatar: 'AN',
    avatarColor: 'from-sky-400 to-indigo-500',
    car: 'Toyota Fortuner 2021',
    rating: 5,
    text: "The team was incredibly transparent — showed me the full inspection report before I even asked. No pressure, no upselling. Just honest people helping me find the right car. Will definitely recommend to everyone I know.",
  },
  {
    name: 'Sneha Kulkarni',
    city: 'Pune',
    avatar: 'SK',
    avatarColor: 'from-violet-400 to-purple-500',
    car: 'Maruti Baleno Alpha 2022',
    rating: 5,
    text: "Got a great EMI deal through their finance team and drove home the same week! The car had zero issues — it's been 6 months and it runs like new. The post-sale support team is also super responsive.",
  },
  {
    name: 'Rahul Desai',
    city: 'Delhi',
    avatar: 'RD',
    avatarColor: 'from-emerald-400 to-teal-500',
    car: 'BMW 3 Series 2020',
    rating: 5,
    text: "Was nervous buying a luxury used car, but AutoPrime's 150-point inspection report gave me the confidence I needed. The pricing was fair and the process was completely hassle-free. 10/10 experience.",
  },
  {
    name: 'Meera Iyer',
    city: 'Chennai',
    avatar: 'MI',
    avatarColor: 'from-amber-400 to-orange-500',
    car: 'Tata Nexon EV Max 2023',
    rating: 5,
    text: "Switched to an EV and AutoPrime made the whole process so simple. They explained everything about the battery health, charging, and warranty. Felt like I was getting advice from a friend, not a salesperson.",
  },
  {
    name: 'Vikram Joshi',
    city: 'Hyderabad',
    avatar: 'VJ',
    avatarColor: 'from-cyan-400 to-sky-500',
    car: 'Kia Seltos HTX+ 2022',
    rating: 5,
    text: "Used the compare feature on the website to shortlist my top 3 cars and then WhatsApped them directly. Got a response within minutes. The entire buying journey was digital and smooth. Exactly what I needed.",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">Real Stories</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">What Our Customers Say</h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Over 2,000 families have found their perfect car with us. Here are a few of their stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div
              key={review.name}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-sky-200 hover:bg-white hover:shadow-md transition-all duration-300 fade-in flex flex-col"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Quote mark */}
              <svg className="w-8 h-8 text-sky-200 mb-3 flex-shrink-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z" />
              </svg>

              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">"{review.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.avatarColor} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                  {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{review.name}</p>
                  <p className="text-xs text-slate-400">{review.city} · {review.car}</p>
                </div>
                <Stars count={review.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Trust numbers */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '4.9 / 5', label: 'Average Rating', sub: 'Based on 1,800+ reviews' },
            { value: '98%', label: 'Would Recommend', sub: 'To a friend or family' },
            { value: '< 48 hrs', label: 'Finance Approval', sub: 'On average' },
            { value: '7 Days', label: 'Return Window', sub: 'No questions asked' },
          ].map(stat => (
            <div key={stat.label} className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-5 border border-sky-100 text-center">
              <p className="text-2xl font-black text-gradient mb-0.5">{stat.value}</p>
              <p className="text-sm font-bold text-slate-700">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
