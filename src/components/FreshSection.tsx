import { motion } from 'motion/react';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';

interface FreshSectionProps {
  onOrderSpecial: (item: MenuItem) => void;
  trioItem: MenuItem;
}

export default function FreshSection({ onOrderSpecial, trioItem }: FreshSectionProps) {
  return (
    <section id="specialites" className="relative py-24 bg-brand-cream overflow-hidden scroll-mt-20">
      
      {/* Background blobs for orange splash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[35%] bg-amber-400/25 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Scattered floating ingredients (from design mock) */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-[15%] text-2xl select-none pointer-events-none"
      >
        🍅
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-[10%] text-3xl select-none pointer-events-none"
      >
        🥬
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 right-[12%] text-2xl select-none pointer-events-none"
      >
        🌶️
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-[18%] text-3xl select-none pointer-events-none"
      >
        🍕
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Texts - Centered */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-[#1e0b0c] text-xs font-outfit font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
            La signature du chef
          </div>
          
          <h2 className="font-display text-4xl sm:text-6xl text-[#1e0b0c] tracking-tight leading-none mb-6 uppercase">
            Frais, Chaud & <br/>
            <span className="text-brand-red">Irresistible</span>
          </h2>
          
          <p className="font-sans font-light text-gray-700 leading-relaxed text-sm sm:text-base">
            Découvrez notre célèbre assortiment de trois mini burgers gourmets préparés à la commande. Des petits pains briochés pétris chaque matin par notre maître boulanger, garnis d’une viande savoureuse, de fromages affinés sélectionnés et de sauces faites maison.
          </p>
        </div>

        {/* Visual - Centered 3 Burgers with yellow/orange brush stroke style design */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Back brush stroke banner background with CSS/Tailwind */}
          <div className="absolute top-[15%] left-[5%] right-[5%] bottom-[15%] bg-gradient-to-r from-amber-500 via-brand-yellow to-orange-400 rounded-[50px] rotate-[-2deg] skew-x-3 shadow-inner opacity-90 z-0 flex items-center justify-center overflow-hidden">
            {/* White paint splat mask effect */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-brand-cream skew-x-12 origin-top-left" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-brand-cream skew-x-12 origin-bottom-right" />
            
            {/* Background pattern lines */}
            <div className="w-full h-full opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* Three burgers main image wrapped in beautiful responsive motion style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="relative z-10 flex justify-center py-10 px-4"
          >
            <div className="relative group max-w-[680px]">
              <img
                src={trioItem.image}
                alt="Trois burgers gourmets"
                className="w-full h-auto object-cover drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)] group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Special price tag */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 bg-[#cc1e25] text-white px-5 py-3 rounded-2xl shadow-xl font-outfit uppercase tracking-wider border-2 border-brand-cream">
                <p className="text-[9px] font-semibold text-amber-200 leading-none mb-1">Prix Spécial Trio</p>
                <p className="text-lg font-bold leading-none">{trioItem.price.toFixed(2)} €</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA underneath the visual */}
        <div className="text-center mt-12 relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOrderSpecial(trioItem)}
            className="inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl bg-[#cc1e25] hover:bg-red-700 text-white font-outfit font-bold text-lg tracking-wider transition-all shadow-xl shadow-brand-red/20 border-2 border-white/5 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            Commander ce Trio Gourmet
          </motion.button>
          <p className="mt-3.5 text-xs text-gray-500 font-medium">
            *Servi chaud avec frites fraîches incluses !
          </p>
        </div>

      </div>
    </section>
  );
}
