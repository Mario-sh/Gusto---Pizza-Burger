import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Star, Heart } from 'lucide-react';
import { MenuItem } from '../types';

interface PopularSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export default function PopularSection({ items, onSelectItem }: PopularSectionProps) {
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'burger' | 'pizza' | 'side' | 'drink'>('all');
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'burger', label: 'Burgers 🍔' },
    { id: 'pizza', label: 'Pizzas 🍕' },
    { id: 'side', label: 'Accompagnements 🍟' },
    { id: 'drink', label: 'Boissons 🍹' },
  ];

  const filteredItems = items.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section id="menu" className="py-24 bg-white relative overflow-hidden">
      
      {/* Ketchup bottom splash decorative element */}
      <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-brand-red/10 to-transparent pointer-events-none" />
      
      {/* Fine-tuned dark red splat circles on the bottom corner sides mirroring the actual design splash */}
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-red rounded-full opacity-60 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-brand-red rounded-full opacity-60 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title and indicators line */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-brand-red font-outfit uppercase font-semibold text-xs tracking-widest block mb-2">Populaires & Irréprochables</span>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-dark tracking-tight leading-none uppercase">
              Nos Incontournables
            </h2>
          </div>

          {/* Dots resembling slider state from design mock, but fully interactive to switch tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-brand-cream rounded-full border border-gray-100">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'w-6 bg-brand-yellow'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                title={cat.label}
              />
            ))}
          </div>
        </div>

        {/* Categories Horizontal scrolling Selector */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-outfit text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-dark text-brand-yellow shadow-lg shadow-brand-dark/15 scale-102 font-semibold'
                  : 'bg-[#faf5eb] text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Display Item Cards in responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isFav = favorites.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group bg-brand-cream/80 hover:bg-brand-cream rounded-3xl p-6 transition-all duration-300 border border-brand-yellow/10 hover:border-brand-yellow/30 hover:shadow-[0_15px_30px_rgba(241,179,26,0.1)] flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative">
                    {/* Circle Image backdrop like design mock */}
                    <div className="mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-xl transition-shadow relative bg-gradient-to-tr from-amber-500/20 to-orange-500/15">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Badges */}
                    {item.tags?.map((tag) => (
                      <span key={tag} className="absolute -top-1 -left-1 bg-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider scale-95 origin-top-left shadow-sm">
                        {tag}
                      </span>
                    ))}

                    {/* Fav Heart */}
                    <button
                      id={`fav-btn-${item.id}`}
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute -top-1 right-2 p-1.5 rounded-full bg-white shadow-md text-gray-400 hover:text-brand-red hover:scale-110 transition-all cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-brand-red text-brand-red' : ''}`} />
                    </button>
                  </div>

                  {/* Texts details */}
                  <div className="mt-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1.5 justify-center">
                        <Star className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
                        <span className="font-mono text-xs font-bold text-gray-800">{item.rating}</span>
                        <span className="text-gray-400 text-[10px]">({item.reviewsCount})</span>
                      </div>
                      
                      <h3 className="text-center font-display text-lg text-brand-dark group-hover:text-brand-red transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      
                      <p className="text-center text-xs text-gray-500 line-clamp-2 mt-1.5 min-h-[32px] font-sans font-light leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-brand-yellow/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">À partir de</span>
                        <span className="font-outfit font-bold text-lg text-[#cc1e25]">{item.price.toFixed(2)} €</span>
                      </div>

                      <div className="p-2.5 rounded-full bg-brand-yellow group-hover:bg-brand-red text-brand-dark group-hover:text-white transition-all duration-300 shadow-md group-hover:scale-110 active:scale-90">
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
