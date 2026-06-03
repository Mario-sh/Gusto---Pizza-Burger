import { Star, MessageSquare } from 'lucide-react';
import { Review } from '../types';

interface ReviewSectionProps {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <section id="avis" className="py-20 bg-brand-cream relative overflow-hidden text-brand-dark">
      {/* Dynamic Background dots and accents */}
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-brand-yellow/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-brand-red/5 rounded-full blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title and heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-red font-outfit uppercase font-semibold text-xs tracking-widest block mb-2">Amour et Partage</span>
          <h2 className="font-display text-4xl sm:text-5xl text-brand-dark tracking-tight leading-none uppercase">
            Ce que disent nos clients
          </h2>
          <p className="font-sans font-light text-gray-500 text-sm sm:text-base mt-4">
            Voici les retours d’expérience de nos gourmets d’exception. Rejoignez-nous et partagez vous aussi votre expérience Gusto !
          </p>
        </div>

        {/* Row Grid of Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-yellow/5 relative flex flex-col justify-between"
            >
              {/* Quote marks bubble decorator */}
              <div className="absolute top-4 right-6 text-brand-yellow/15 font-display text-7xl select-none">
                “
              </div>

              <div>
                {/* Rating Stars row */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-sm font-sans font-normal text-gray-600 leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Details Card */}
              <div className="flex items-center gap-4.5 pt-4 border-t border-gray-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-outfit font-bold text-sm text-brand-dark">{rev.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-green-600 font-semibold uppercase tracking-wider">Achat Vérifié</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review feedback CTA banner */}
        <div className="mt-14 p-6.5 rounded-3xl bg-[#1e0b0c] text-white max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/5">
          <div className="flex gap-3 items-center text-center sm:text-left">
            <div className="p-3 bg-white/5 rounded-2xl text-brand-yellow flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-outfit font-bold text-sm text-white">Une suggestion ou un délice à partager ?</h4>
              <p className="text-gray-400 text-xs mt-0.5">Laissez un avis et recevez un coupon de -10% !</p>
            </div>
          </div>
          <button
            onClick={() => alert("Merci pour votre fidélité ! Notre module d'avis est disponible uniquement pour les commandes vérifiées.")}
            className="px-5 py-2.5 rounded-xl bg-brand-yellow text-[#1e0b0c] font-outfit font-bold text-xs shrink-0 tracking-wide shadow-md shadow-brand-yellow/10 hover:scale-105 transition-all cursor-pointer"
          >
            Écrire un avis
          </button>
        </div>

      </div>
    </section>
  );
}
