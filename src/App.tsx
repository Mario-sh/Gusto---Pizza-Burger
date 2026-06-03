import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FreshSection from './components/FreshSection';
import PopularSection from './components/PopularSection';
import ReviewSection from './components/ReviewSection';
import ItemCustomizeModal from './components/ItemCustomizeModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

import { MENU_ITEMS, REVIEWS } from './data';
import { MenuItem, CartItem } from './types';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [selectedCustomizeItem, setSelectedCustomizeItem] = React.useState<MenuItem | null>(null);
  const [activeSection, setActiveSection] = React.useState('accueil');

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'specialites', 'menu', 'avis'];
      const scrollPosition = window.scrollY + 120; // offsets header height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (newCartItem: CartItem) => {
    // Check if exactly same item with same option modifications already exists to group quantity
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.menuItem.id === newCartItem.menuItem.id &&
        item.selectedSize === newCartItem.selectedSize &&
        item.selectedSauce === newCartItem.selectedSauce &&
        JSON.stringify(item.selectedExtras) === JSON.stringify(newCartItem.selectedExtras) &&
        item.notes === newCartItem.notes
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += newCartItem.quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Find dynamic special item records from the catalog data
  const duoRoyalItem = MENU_ITEMS.find((it) => it.id === 'special-duo') || MENU_ITEMS[1];
  const trioTrioItem = MENU_ITEMS.find((it) => it.id === 'special-trio') || MENU_ITEMS[0];

  return (
    <div className="min-h-screen bg-brand-cream text-gray-800 font-sans selection:bg-brand-yellow selection:text-brand-dark overflow-x-hidden antialiased">
      
      {/* Dynamic Header Component with Basket indicators */}
      <Header
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        onCartOpen={() => setCartOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections stack mirroring the original design picture layout */}
      <main>
        {/* Top Hero: Burger and pizza stacked on board backdrop */}
        <HeroSection
          onOrderSpecial={(item) => setSelectedCustomizeItem(item)}
          specialItem={duoRoyalItem}
        />

        {/* Middle Section: 3 stacked delicious cheeseburgers on orange stroke backdrop */}
        <FreshSection
          onOrderSpecial={(item) => setSelectedCustomizeItem(item)}
          trioItem={trioTrioItem}
        />

        {/* Bottom Section: 4 circular cards showing Fries, Mini burger, onion rings, petite marg pizza */}
        <PopularSection
          items={MENU_ITEMS}
          onSelectItem={(item) => setSelectedCustomizeItem(item)}
        />

        {/* Client reviews comments slider */}
        <ReviewSection reviews={REVIEWS} />
      </main>

      {/* Premium Footer holding legal pages and work schedules */}
      <Footer />

      {/* Slide-out Cart details overlay drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      {/* Interactive Detail choice customizing pop-up modal dialog and sizes selectors */}
      <AnimatePresence>
        {selectedCustomizeItem && (
          <ItemCustomizeModal
            item={selectedCustomizeItem}
            onClose={() => setSelectedCustomizeItem(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
