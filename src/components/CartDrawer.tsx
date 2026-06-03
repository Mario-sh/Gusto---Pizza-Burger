import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, MapPin, Phone, User, CheckCircle2, Ticket, CreditCard, Clock } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = React.useState('');
  const [discountPercent, setDiscountPercent] = React.useState(0);
  const [promoError, setPromoError] = React.useState('');
  const [promoSuccess, setPromoSuccess] = React.useState('');

  const [checkoutStep, setCheckoutStep] = React.useState<'cart' | 'shipping' | 'success'>('cart');
  const [deliveryType, setDeliveryType] = React.useState<'delivery' | 'pickup'>('delivery');
  
  // Shipping form fields
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [formError, setFormError] = React.useState('');

  const subtotal = cartItems.reduce(
    (acc, it) => acc + (it.menuItem.price + it.addedPrice) * it.quantity,
    0
  );

  const deliveryFee = deliveryType === 'delivery' ? 2.50 : 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const grandTotal = subtotal + deliveryFee - discountAmount;

  const applyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    
    if (code === 'WELCOME15') {
      setDiscountPercent(15);
      setPromoSuccess('Code WELCOME15 appliqué : -15% !');
    } else if (code === 'GUSTO20') {
      if (subtotal >= 20) {
        setDiscountPercent(20);
        setPromoSuccess('Code GUSTO20 appliqué : -20% !');
      } else {
        setPromoError('Le code GUSTO20 nécessite au moins 20.00 € d’achat.');
      }
    } else {
      setPromoError('Code promotionnel invalide.');
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || (deliveryType === 'delivery' && !address)) {
      setFormError('Veuillez remplir correctement les champs d’informations obligatoires.');
      return;
    }
    setFormError('');
    setCheckoutStep('success');
  };

  const resetFlow = () => {
    onClearCart();
    setCheckoutStep('cart');
    setFullName('');
    setPhone('');
    setAddress('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1e0b0c]/80 backdrop-blur-xs"
      />

      {/* Slideout Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-red" />
              <h3 className="font-display text-xl text-brand-dark">Mon Panier</h3>
              <span className="bg-brand-yellow/30 text-brand-dark px-2 rounded-full font-mono text-xs font-bold font-sans">
                {cartItems.length}
              </span>
            </div>
            <button
              id="close-cart-drawer"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Checkout Steps */}
          {checkoutStep === 'cart' && (
            <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
              
              {cartItems.length === 0 ? (
                // Empty Cart State
                <div className="p-12 text-center my-auto flex flex-col items-center">
                  <span className="text-5xl mb-4 animate-bounce">🍕</span>
                  <h4 className="font-outfit font-bold text-lg text-brand-dark mb-1">Votre panier est bien vide</h4>
                  <p className="text-gray-400 text-xs px-6 mb-6">
                    Laissez-vous tenter par nos savoureux burgers artisanaux et nos pizzas croustillantes cuites au feu de bois.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-brand-yellow text-[#1e0b0c] font-outfit font-semibold text-sm rounded-full shadow-md"
                  >
                    Découvrir la carte
                  </button>
                </div>
              ) : (
                // Items Loop List
                <div className="p-6 space-y-4 flex-grow overflow-y-auto no-scrollbar">
                  {cartItems.map((item) => {
                    const singlePrice = item.menuItem.price + item.addedPrice;
                    const totalItemPrice = singlePrice * item.quantity;
                    return (
                      <motion.div
                        layout
                        key={item.id}
                        className="flex gap-4 p-4 rounded-2xl bg-[#faf5eb]/60 border border-brand-yellow/5 hover:border-brand-yellow/25 transition-all relative"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-white shadow-md flex-shrink-0">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <h4 className="font-outfit font-bold text-sm text-brand-dark">{item.menuItem.name}</h4>
                          
                          {/* Selected options tags */}
                          <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-gray-500 font-medium">
                            {item.selectedSize && <span className="bg-white px-1.5 py-0.5 rounded border border-gray-100 italic">{item.selectedSize}</span>}
                            {item.selectedSauce && <span className="bg-white px-1.5 py-0.5 rounded border border-gray-100 font-sans">{item.selectedSauce}</span>}
                            {item.selectedExtras?.map(ext => (
                              <span key={ext} className="bg-[#cc1e25]/5 text-[#cc1e25] px-1.5 py-0.5 rounded border border-[#cc1e25]/10">+ {ext}</span>
                            ))}
                          </div>

                          {item.notes && (
                            <p className="text-[10px] text-pink-700 font-medium mt-1.5 italic">" {item.notes} "</p>
                          )}

                          {/* Control buttons inside cart listing */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center rounded-lg bg-white border border-gray-100 py-0.5 px-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="text-gray-400 hover:text-brand-red px-1 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-mono font-bold text-xs text-brand-dark">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-400 hover:text-brand-red px-1 cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-mono text-sm font-bold text-[#cc1e25]">
                              {totalItemPrice.toFixed(2)} €
                            </span>
                          </div>
                        </div>

                        {/* Remove trash item */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-brand-red p-1 cursor-pointer"
                          title="Supprimer l'article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Promo section & totals bottom block */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-[#faf5eb]/40 space-y-4">
                  
                  {/* Promo Input */}
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Ticket className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Code Promo (ex. WELCOME15)"
                          className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-yellow font-sans bg-white"
                        />
                      </div>
                      <button
                        onClick={applyPromo}
                        className="px-4 py-2 bg-brand-dark text-brand-yellow rounded-xl text-xs font-outfit font-semibold cursor-pointer"
                      >
                        Appliquer
                      </button>
                    </div>

                    {promoError && <p className="text-[10px] text-brand-red font-medium">{promoError}</p>}
                    {promoSuccess && <p className="text-[10px] text-green-600 font-medium">{promoSuccess}</p>}
                  </div>

                  {/* Calculations details breakdown */}
                  <div className="text-xs space-y-1.5 font-sans">
                    <div className="flex justify-between text-gray-500">
                      <span>Sous-total</span>
                      <span className="font-mono">{subtotal.toFixed(2)} €</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Réduction ({discountPercent}%)</span>
                        <span className="font-mono">-{discountAmount.toFixed(2)} €</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500">
                      <span>Frais de livraison ({deliveryType === 'delivery' ? 'Domicile' : 'Sur Place'})</span>
                      <span className="font-mono">
                        {deliveryFee > 0 ? `${deliveryFee.toFixed(2)} €` : 'Gratuit'}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-outfit font-bold text-brand-dark pt-2 border-t border-gray-200/60">
                      <span>Total TTC</span>
                      <span className="font-mono text-[#cc1e25]">{grandTotal.toFixed(2)} €</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full py-3.5 bg-brand-red hover:bg-red-700 text-white rounded-2xl font-outfit font-bold text-center tracking-wide shadow-lg cursor-pointer"
                  >
                    Valider le panier
                  </button>
                </div>
              )}
            </div>
          )}

          {checkoutStep === 'shipping' && (
            // Shipping and delivery information form
            <div className="flex-1 flex flex-col justify-between overflow-y-auto p-6">
              <form onSubmit={handleCreateOrder} className="space-y-5 flex-grow overflow-y-auto pb-6 no-scrollbar">
                <div>
                  <h4 className="font-outfit font-bold text-lg text-brand-dark mb-1">Finalisez votre commande</h4>
                  <p className="text-xs text-gray-400">Renseignez vos coordonnées de livraison/paiement</p>
                </div>

                {/* Delivery tabs switcher */}
                <div className="bg-brand-cream p-1.5 rounded-xl flex gap-1 border border-gray-100">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`flex-1 py-2 text-xs font-outfit font-semibold rounded-lg transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'bg-[#1e0b0c] text-brand-yellow shadow'
                        : 'text-gray-600 hover:text-brand-dark'
                    }`}
                  >
                    🚲 Livraison Domicile (+2.50€)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`flex-1 py-2 text-xs font-outfit font-semibold rounded-lg transition-all cursor-pointer ${
                      deliveryType === 'pickup'
                        ? 'bg-[#1e0b0c] text-brand-yellow shadow'
                        : 'text-gray-600 hover:text-brand-dark'
                    }`}
                  >
                    🛖 À emporter (Gratuit)
                  </button>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Nom complet</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex. Jean Martin"
                      className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-yellow font-sans bg-white"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Numéro de téléphone</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex. 06 12 34 56 78"
                      className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-yellow font-sans bg-white"
                    />
                  </div>
                </div>

                {/* Address (conditional for delivery) */}
                {deliveryType === 'delivery' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Adresse de livraison</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required={deliveryType === 'delivery'}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex. 14 Rue de la République, Lyon"
                        className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-yellow font-sans bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Simulating mock payment method secure details check */}
                <div className="p-4 rounded-xl bg-green-50/50 border border-green-100 flex gap-2.5 items-start">
                  <CreditCard className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-outfit font-bold text-xs text-green-800">Paiement 100% sécurisé</h5>
                    <p className="text-[10px] text-green-700/80 mt-0.5 leading-snug">
                      Payez directement à la livraison par Carte Bancaire ou en Espèces / Ticket Restaurant selon votre choix.
                    </p>
                  </div>
                </div>

                {formError && <p className="text-xs text-brand-red font-medium text-center">{formError}</p>}

                {/* Buttons block */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-red hover:bg-red-700 text-white rounded-2xl font-outfit font-bold tracking-wide text-center cursor-pointer shadow-lg shadow-brand-red/10 animate-pulse"
                  >
                    Confirmer & Commander ({(grandTotal).toFixed(2)} €)
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full text-xs text-gray-400 hover:text-gray-600 text-center font-medium py-1.5"
                  >
                    Retourner au panier
                  </button>
                </div>
              </form>
            </div>
          )}

          {checkoutStep === 'success' && (
            // Beautiful Confetti order placement status checker
            <div className="flex-1 flex flex-col justify-center items-center p-8 text-center space-y-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-md shadow-green-100"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div>
                <h4 className="font-display text-2xl text-brand-dark mb-2">Commande Enregistrée !</h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-xs mx-auto">
                  Merci pour votre confiance, <span className="font-semibold text-brand-dark">{fullName}</span>. Notre pizzaïolo et notre chef préparent votre repas avec amour !
                </p>
              </div>

              {/* Order summary stats boxes */}
              <div className="w-full p-4 rounded-2xl bg-brand-cream border border-brand-yellow/15 space-y-3 font-sans max-w-xs mx-auto text-left">
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Clock className="w-4 h-4 text-brand-red" />
                  <div>
                    <span className="font-bold text-brand-dark">Temps de préparation estimé</span>
                    <p className="text-[10px] text-gray-400">Prêt en environ 20-25 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <MapPin className="w-4 h-4 text-brand-red" />
                  <div>
                    <span className="font-bold text-brand-dark">Mode de retrait</span>
                    <p className="text-[10px] text-gray-400">
                      {deliveryType === 'delivery' ? `Livré à : ${address}` : 'À récupérer au restaurant'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={resetFlow}
                className="px-6 py-3 bg-[#1e0b0c] hover:bg-black text-brand-yellow rounded-xl font-outfit font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
              >
                Super, merci !
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
