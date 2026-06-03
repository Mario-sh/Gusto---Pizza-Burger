import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, Plus, Minus, Info } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function ItemCustomizeModal({ item, onClose, onAddToCart }: ItemCustomizeModalProps) {
  if (!item) return null;

  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<string>(
    item.options?.sizes?.[0]?.name || ''
  );
  const [selectedSauce, setSelectedSauce] = React.useState<string>(
    item.options?.sauces?.[0] || ''
  );
  const [selectedExtras, setSelectedExtras] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState('');

  const calculateAddedPrice = () => {
    let extraCost = 0;
    
    // Size adjustment
    if (item.options?.sizes && selectedSize) {
      const sizeOption = item.options.sizes.find(s => s.name === selectedSize);
      if (sizeOption) {
        extraCost += sizeOption.priceAdjustment;
      }
    }

    // Extras
    if (item.options?.extras) {
      selectedExtras.forEach(extraName => {
        const extra = item.options?.extras?.find(e => e.name === extraName);
        if (extra) {
          extraCost += extra.price;
        }
      });
    }

    return Number(extraCost.toFixed(2));
  };

  const handleExtraToggle = (extraName: string) => {
    if (selectedExtras.includes(extraName)) {
      setSelectedExtras(selectedExtras.filter(e => e !== extraName));
    } else {
      setSelectedExtras([...selectedExtras, extraName]);
    }
  };

  const currentSinglePrice = item.price + calculateAddedPrice();
  const totalPrice = currentSinglePrice * quantity;

  const handleSubmit = () => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      menuItem: item,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedSauce: selectedSauce || undefined,
      selectedExtras: selectedExtras.length > 0 ? selectedExtras : undefined,
      addedPrice: calculateAddedPrice(),
      notes: notes.trim() ? notes : undefined
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1e0b0c]/80 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row z-10"
      >
        {/* Left Side: Stunning Large Image */}
        <div className="md:w-5/12 bg-brand-cream p-8 flex items-center justify-center relative min-h-[220px] md:min-h-0 border-b md:border-b-0 md:border-r border-brand-yellow/10">
          <button
            id="close-customize-modal-mobile"
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-white text-gray-700 shadow-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white/60 relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-brand-yellow/20 px-4 py-2 rounded-xl text-center">
            <p className="text-xs text-brand-dark/90 font-medium inline-flex items-center gap-1">
              <Info className="w-3.5 h-3.5 inline text-brand-red flex-shrink-0" />
              Chaque plat est cuit à la minute
            </p>
          </div>
        </div>

        {/* Right Side: Options scrollable list */}
        <div className="md:w-7/12 flex flex-col max-h-[60vh] md:max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-100 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-[#cc1e25] tracking-widest uppercase">{item.category}</span>
              <h3 className="font-display text-2xl text-brand-dark mt-1">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </div>
            <button
              id="close-customize-modal-desktop"
              onClick={onClose}
              className="hidden md:block p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options content */}
          <div className="p-6 space-y-6 overflow-y-auto flex-grow no-scrollbar">
            
            {/* Sizes picker */}
            {item.options?.sizes && (
              <div>
                <h4 className="font-outfit font-semibold text-sm text-brand-dark mb-3">Sélectionnez la taille</h4>
                <div className="grid grid-cols-2 gap-3">
                  {item.options.sizes.map((sz) => (
                    <button
                      key={sz.name}
                      onClick={() => setSelectedSize(sz.name)}
                      className={`p-3 rounded-2xl flex items-center justify-between border-2 transition-all cursor-pointer ${
                        selectedSize === sz.name
                          ? 'border-brand-yellow bg-brand-yellow/10 font-medium'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-sm text-brand-dark">{sz.name}</span>
                      <span className="text-xs font-mono text-gray-500">
                        {sz.priceAdjustment > 0 ? `+${sz.priceAdjustment.toFixed(2)} €` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sauces selector */}
            {item.options?.sauces && (
              <div>
                <h4 className="font-outfit font-semibold text-sm text-brand-dark mb-3">Choisissez votre sauce</h4>
                <div className="flex flex-wrap gap-2">
                  {item.options.sauces.map((sauce) => (
                    <button
                      key={sauce}
                      onClick={() => setSelectedSauce(sauce)}
                      className={`px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all border ${
                        selectedSauce === sauce
                          ? 'bg-[#1e0b0c] text-brand-yellow border-transparent shadow'
                          : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      {sauce}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extras picker */}
            {item.options?.extras && (
              <div>
                <h4 className="font-outfit font-semibold text-sm text-brand-dark mb-3">Suppléments recommandés</h4>
                <div className="space-y-2.5">
                  {item.options.extras.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.name);
                    return (
                      <label
                        key={extra.name}
                        className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-amber-100/10 border-brand-yellow/30'
                            : 'bg-white border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleExtraToggle(extra.name)}
                            className="w-4.5 h-4.5 rounded text-brand-red focus:ring-brand-red border-gray-300 accent-brand-red cursor-pointer"
                          />
                          <span className="text-sm font-medium text-brand-dark">{extra.name}</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-[#cc1e25]">+{extra.price.toFixed(2)} €</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Preparation Notes */}
            <div>
              <h4 className="font-outfit font-semibold text-sm text-brand-dark mb-2">Instructions de cuisine</h4>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex. Pas d'oignons, sauce à part, bien cuit..."
                className="w-full text-sm p-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:bg-white transition-all h-20 outline-none resize-none font-sans"
              />
            </div>

          </div>

          {/* Footer containing total calculation and checkout buttons */}
          <div className="p-6 border-t border-gray-100 bg-[#faf5eb]/50 flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-200 rounded-full bg-white py-1.5 px-3 shadow-sm">
              <button
                id="qty-decrease-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-full text-gray-500 hover:text-brand-red hover:bg-gray-100 active:scale-90 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-mono font-bold text-sm text-brand-dark">{quantity}</span>
              <button
                id="qty-increase-btn"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-full text-gray-500 hover:text-[#cc1e25] hover:bg-gray-100 active:scale-90 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total dynamic price and Add to Cart Button */}
            <button
              id="add-to-cart-action"
              onClick={handleSubmit}
              className="flex-grow inline-flex items-center justify-between px-6 py-3.5 rounded-2xl bg-brand-red hover:bg-red-700 text-white font-outfit font-bold tracking-wide transition-all shadow-md shadow-brand-red/10 cursor-pointer active:scale-98"
            >
              <span>Ajouter au panier</span>
              <span className="font-mono">{totalPrice.toFixed(2)} €</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
