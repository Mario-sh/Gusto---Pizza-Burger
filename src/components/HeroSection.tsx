import { motion } from 'motion/react';
import { ChevronRight, Percent, ShieldCheck, Zap } from 'lucide-react';
import { MenuItem } from '../types';

interface HeroSectionProps {
  onOrderSpecial: (item: MenuItem) => void;
  specialItem: MenuItem;
}

export default function HeroSection({ onOrderSpecial, specialItem }: HeroSectionProps) {
  return (
    <section id="accueil" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden hero-gradient text-white scroll-mt-20">
      {/* Dynamic Background decoratives */}
      <div className="absolute top-1/4 left-5 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating ingredients in foreground */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-[10%] hidden lg:block pointer-events-none select-none"
      >
        <span className="text-3xl filter drop-shadow">🌿</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 left-[45%] hidden lg:block pointer-events-none"
      >
        <span className="text-xl">🍅</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Columns - Large Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-center lg:self-start px-4 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/30 mb-6 text-brand-yellow text-sm font-outfit font-medium tracking-wide"
            >
              <Percent className="w-4 h-4 text-brand-yellow animate-bounce" />
              <span>Profitez de -15% sur votre première commande !</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-6 uppercase text-start"
            >
              <span className="block text-brand-yellow drop-shadow-[0_4px_12px_rgba(241,179,26,0.2)]">PIZZA &</span>
              <span className="block text-white">BURGER</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8 font-sans font-light leading-relaxed text-left"
            >
              Le rendez-vous ultime de la street-food premium. Des pizzas artisanales étirées à la main et rôties au four de pierre, associées à nos burgers légendaires au steak haché de bœuf Angus juteux et cheddar fondant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <button
                id="hero-order-now-btn"
                onClick={() => onOrderSpecial(specialItem)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-brand-red hover:bg-red-700 text-white font-outfit font-bold text-lg tracking-wide transition-all duration-300 shadow-xl shadow-brand-red/20 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Commander ce Duo
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-outfit font-medium transition-all duration-300 hover:border-brand-yellow/40 group cursor-pointer"
              >
                Découvrir le Menu
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🍔
                </motion.span>
              </a>
            </motion.div>

            {/* Core Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-10 max-w-md mx-auto lg:mx-0 text-left"
            >
              <div className="flex gap-2 items-start">
                <div className="p-1 rounded bg-brand-yellow/10 text-brand-yellow">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-outfit font-semibold text-xs text-white">100% Frais</h4>
                  <p className="text-[10px] text-gray-400">Ingrédients bio locaux</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="p-1 rounded bg-orange-500/10 text-orange-500">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-outfit font-semibold text-xs text-white text-clip">Chaud & Rapide</h4>
                  <p className="text-[10px] text-gray-400">Chez vous en &lt;30m</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="p-1 rounded bg-brand-red/10 text-brand-red">
                  <span>👨‍🍳</span>
                </div>
                <div>
                  <h4 className="font-outfit font-semibold text-xs text-white">Artisanal</h4>
                  <p className="text-[10px] text-gray-400">Fait maison à Lyon</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Columns - High Contrast Stacked Image Composition */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Round glowing backplate */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full bg-gradient-to-tr from-brand-red/20 to-brand-yellow/10 blur-3xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
              className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5"
            >
              <img
                src={specialItem.image}
                alt="Gusto Deluxe Pizza & Burger on Rustic Board"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Overlay rating indicator */}
              <div className="absolute top-4 left-4 bg-[#1e0b0c]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
                <span className="text-brand-yellow font-bold">★</span>
                <span className="font-mono text-xs font-bold">{specialItem.rating}</span>
                <span className="text-gray-400 text-[10px]/none flex">({specialItem.reviewsCount} avis)</span>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-brand-red text-white font-outfit font-bold rounded-2xl px-5 py-3 shadow-xl flex flex-col items-center">
                <span className="text-[10px] uppercase font-semibold tracking-wider opacity-90 leading-none mb-1">Duo Spécial</span>
                <span className="text-lg leading-none">{specialItem.price.toFixed(2)} €</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
