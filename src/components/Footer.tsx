import { Flame, Instagram, Facebook, Compass, Award, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Foot Grid details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand block */}
          <div className="space-y-4 text-center md:text-left">
            <a href="#accueil" className="inline-flex items-center gap-2 group">
              <span className="p-2 rounded-xl bg-gradient-to-tr from-brand-red to-orange-500 text-white shadow-lg group-hover:scale-110 transition-all">
                <Flame className="w-5 h-5 animate-pulse" />
              </span>
              <span className="font-display text-2xl tracking-wide bg-gradient-to-r from-white via-brand-yellow to-white bg-clip-text text-transparent">Gusto</span>
            </a>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Le meilleur de la restauration rapide premium à Lyon. Des pizzas savoureuses et des burgers cuisinés à la demande avec passion et ingrédients frais.
            </p>
            <div className="flex justify-center md:justify-start gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-brand-yellow transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-brand-yellow transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="text-center md:text-left">
            <h4 className="font-outfit font-bold text-sm text-brand-yellow uppercase tracking-wider mb-4">Notre Menu</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#menu" className="hover:text-white transition-colors">Burgers Gourmet</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Pizzas Feu de Bois</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Frites & Accompaniments</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Mocktails & Limonades</a></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="text-center md:text-left">
            <h4 className="font-outfit font-bold text-sm text-brand-yellow uppercase tracking-wider mb-4">Horaires d'ouverture</h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="flex justify-between md:justify-start gap-4">
                <span className="font-semibold text-gray-300">Lundi - Vendredi:</span>
                <span>11h30 - 14h30 / 18h30 - 23h00</span>
              </p>
              <p className="flex justify-between md:justify-start gap-4">
                <span className="font-semibold text-gray-300">Samedi - Dimanche:</span>
                <span className="text-brand-yellow">11h30 - 00h30 non-stop</span>
              </p>
              <p className="text-[10px] text-pink-500 font-medium">✨ Service de livraison disponible 24/7</p>
            </div>
          </div>

          {/* Service features list */}
          <div className="text-center md:text-left">
            <h4 className="font-outfit font-bold text-sm text-brand-yellow uppercase tracking-wider mb-4">Nos Engagements</h4>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex gap-2 items-center justify-center md:justify-start">
                <Compass className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span>Livraison écologique à vélo</span>
              </li>
              <li className="flex gap-2 items-center justify-center md:justify-start">
                <Award className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span>Chefs certifiés et diplômés</span>
              </li>
              <li className="flex gap-2 items-center justify-center md:justify-start">
                <ShieldCheck className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span>Hygiène et traçabilité contrôlées</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Separator and copyright info of Gusto store */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[11px] text-gray-500 font-light">
            © {new Date().getFullYear()} Gusto. Tous droits réservés. Conçu avec amour pour les passionnés de burgers et pizzas de Lyon.
          </p>
          <div className="flex gap-4 text-[11px] text-gray-500 font-light">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">CGV</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
