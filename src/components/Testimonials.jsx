const REVIEWS = [
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    avatar: 'PS',
    avatarColor: 'from-pink-400 to-rose-500',
    car: 'Hyundai Creta SX 2022',
    rating: 5,
    text: "AutoPrime completely changed my mind about buying used cars. The paperwork took less than a day, and they delivered it to my doorstep. Zero stress.",
  },
  {
    name: 'Arjun Nair',
    city: 'Bangalore',
    avatar: 'AN',
    avatarColor: 'from-sky-400 to-indigo-500',
    car: 'Toyota Fortuner 2021',
    rating: 5,
    text: "Showed me the full inspection report before I even asked. No pressure, no upselling. Just honest people helping me find the right car.",
  },
  {
    name: 'Sneha Kulkarni',
    city: 'Pune',
    avatar: 'SK',
    avatarColor: 'from-violet-400 to-purple-500',
    car: 'Maruti Baleno 2022',
    rating: 5,
    text: "Got a great EMI deal and drove home the same week! The car's been running like new for 6 months. Post-sale support is super responsive.",
  },
  {
    name: 'Rahul Desai',
    city: 'Delhi',
    avatar: 'RD',
    avatarColor: 'from-emerald-400 to-teal-500',
    car: 'BMW 3 Series 2020',
    rating: 5,
    text: "The 150-point inspection report gave me the confidence I needed. Pricing was fair and the process was completely hassle-free. 10/10.",
  },
  {
    name: 'Meera Iyer',
    city: 'Chennai',
    avatar: 'MI',
    avatarColor: 'from-amber-400 to-orange-500',
    car: 'Tata Nexon EV 2023',
    rating: 5,
    text: "They explained everything about battery health, charging, and warranty. Felt like advice from a friend, not a salesperson.",
  },
  {
    name: 'Vikram Joshi',
    city: 'Hyderabad',
    avatar: 'VJ',
    avatarColor: 'from-cyan-400 to-sky-500',
    car: 'Kia Seltos 2022',
    rating: 5,
    text: "Used the compare feature and WhatsApped directly. Got a response within minutes. The entire journey was digital and smooth.",
  },
  {
    name: 'Ananya Bose',
    city: 'Kolkata',
    avatar: 'AB',
    avatarColor: 'from-fuchsia-400 to-pink-500',
    car: 'Honda City 2020',
    rating: 5,
    text: "I was nervous about the RC transfer but they handled everything. Got the car home in 3 days. Best car buying experience ever.",
  },
  {
    name: 'Karthik Menon',
    city: 'Coimbatore',
    avatar: 'KM',
    avatarColor: 'from-lime-400 to-emerald-500',
    car: 'Mahindra Scorpio N 2023',
    rating: 5,
    text: "Flew in from Coimbatore to pick up the car. Worth every minute. The team was professional and the car was exactly as shown online.",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
      <Stars count={review.rating} />
      <p className="text-slate-300 text-sm leading-relaxed mt-3 mb-4">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.avatarColor} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-bold truncate">{review.name}</p>
          <p className="text-slate-500 text-xs truncate">{review.city} · {review.car}</p>
        </div>
      </div>
    </div>
  );
}

    const COLUMN_1 = [...REVIEWS, ...REVIEWS];
    const COLUMN_2 = [...REVIEWS.slice(3), ...REVIEWS.slice(0, 3), ...REVIEWS.slice(3)];
    const COLUMN_3 = [...REVIEWS.slice(5), ...REVIEWS.slice(0, 5), ...REVIEWS.slice(5)];

    function Column({ data, reverse }) {
      return (
        <div className="overflow-hidden h-[500px] relative">
          <div
            className={`flex flex-col gap-4 animate-vertical ${
              reverse ? "animate-vertical-reverse" : ""
            }`}
          >
            {data.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      );
    }

    export default function Testimonials() {
      return (
        <section className="py-24 bg-white overflow-hidden">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest">
              Testimonials
            </p>
            <h2 className="text-4xl font-black text-gray-900 mt-2">
              What our users say
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Discover how thousands of teams streamline their operations with our platform.
            </p>
          </div>

          {/* Columns */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            <Column data={COLUMN_1} />
            <Column data={COLUMN_2} reverse />
            <Column data={COLUMN_3} />
          </div>
        </section>
      );
    }
