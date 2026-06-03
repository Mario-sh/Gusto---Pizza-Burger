import React from 'react';
import { ShoppingBag, ChevronRight, Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  activeSection: string;
}

export default function Header({ cartCount, onCartOpen, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { title: 'Accueil', href: '#accueil' },
    { title: 'Spécialités', href: '#specialites' },
    { title: 'Le Menu', href: '#menu' },
    { title: 'Avis Clients', href: '#avis' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e0b0c]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#accueil" className="flex items-center gap-2 group">
              <span className="p-2 rounded-xl bg-gradient-to-tr from-brand-red to-orange-500 text-white shadow-lg group-hover:scale-115 transition-all duration-300">
                <Flame className="w-6 h-6 animate-pulse" />
              </span>
              <span className="font-display text-2xl tracking-wide bg-gradient-to-r from-white via-brand-yellow to-white bg-clip-text text-transparent">Gusto</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`text-sm tracking-wider uppercase font-outfit font-medium transition-colors duration-200 ${
                    isActive ? 'text-brand-yellow font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="relative py-2">
                    {link.title}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-yellow rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls - Cart & Checkout Button */}
          <div className="hidden md:flex items-center gap-6">
            <button
              id="cart-btn-desktop"
              onClick={onCartOpen}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all duration-200 group active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-brand-yellow transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white text-[10px] font-bold font-mono tracking-tight shadow-md border border-[#1e0b0c]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow hover:bg-amber-400 text-[#1e0b0c] font-outfit font-semibold text-sm tracking-wide transition-all duration-300 shadow-xl hover:shadow-brand-yellow/10"
            >
              Commander En Ligne
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button & Basket link */}
          <div className="flex md:hidden items-center gap-4">
            <button
              id="cart-btn-mobile"
              onClick={onCartOpen}
              className="relative p-2 rounded-full bg-white/5 text-white active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-white text-[9px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              id="mobile-drawer-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 text-white active:scale-120 transition-transform duration-150 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1e0b0c] border-t border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block px-3 py-2 text-base font-outfit text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                >
                  {link.title}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCartOpen();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-white text-sm font-outfit cursor-pointer active:bg-white/10"
                >
                  <span>Mon Panier ({cartCount})</span>
                  <ShoppingBag className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const menuEl = document.querySelector('#menu');
                    if (menuEl) {
                      menuEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-yellow text-[#1e0b0c] font-outfit font-semibold text-sm cursor-pointer active:scale-[0.98] transition-transform"
                >
                  Commander Maintenant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
