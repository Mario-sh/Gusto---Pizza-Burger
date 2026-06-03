import { MenuItem, Review } from './types';
import threeBurgersImg from './assets/images/three_burgers_1780449891089.png';
import heroPizzaBurgerImg from './assets/images/hero_pizza_burger_1780449874158.png';
import miniBurgerImg from './assets/images/mini_burger_thumbnail_1780449921107.png';
import pizzaImg from './assets/images/pizza_thumbnail_1780449949417.png';
import friesImg from './assets/images/fries_thumbnail_1780449907975.png';
import onionRingsImg from './assets/images/onion_rings_thumbnail_1780449935607.png';

export const MENU_ITEMS: MenuItem[] = [
  // SPECIALS
  {
    id: 'special-trio',
    name: 'Le Trio Gusto Burgers',
    description: 'Trois mini-burgers gourmets signatures : Classique Cheddar, Bacon Fumé et Spicy Jalapeño, servis chauds avec de savoureuses sauces.',
    price: 18.90,
    category: 'burger',
    image: threeBurgersImg,
    rating: 4.9,
    reviewsCount: 142,
    tags: ['Populaire', 'Spécialité'],
    options: {
      sauces: ['Sauce Maison', 'Barbecue', 'Moutarde Miel'],
      extras: [
        { name: 'Cheddar Extra', price: 1.50 },
        { name: 'Double Bacon', price: 2.00 }
      ]
    }
  },
  {
    id: 'special-duo',
    name: 'Duo Royal Burger & Pizza',
    description: 'Une somptueuse pizza pepperoni croustillante couronnée d’un double cheeseburger suprême, préparé au feu de bois.',
    price: 24.50,
    category: 'pizza',
    image: heroPizzaBurgerImg,
    rating: 5.0,
    reviewsCount: 389,
    tags: ['Nouveauté', 'Giga Format'],
    options: {
      sizes: [
        { name: 'Standard', priceAdjustment: 0 },
        { name: 'XXL (Partage)', priceAdjustment: 6.00 }
      ],
      sauces: ['Marlon Sauce', 'Sauce Piquante Casa'],
      extras: [
        { name: 'Fromage supplémentaire', price: 2.50 }
      ]
    }
  },
  
  // BURGERS
  {
    id: 'burger-cheddar',
    name: 'Supreme Cheesy Burger',
    description: 'Pain brioché toasté, double steak haché de bœuf Angus, double cheddar mature, cornichons, oignons frais, salade croquante et sauce Gusto secrète.',
    price: 12.50,
    category: 'burger',
    image: miniBurgerImg, // matches mini_burger
    rating: 4.8,
    reviewsCount: 120,
    tags: ['Best Seller'],
    options: {
      sizes: [
        { name: 'Simple Steak', priceAdjustment: 0 },
        { name: 'Double Steak', priceAdjustment: 3.00 },
        { name: 'Triple Steak (Monumental)', priceAdjustment: 5.50 }
      ],
      sauces: ['Sauce Gusto', 'Sauce Poivre', 'Ketchup Curry'],
      extras: [
        { name: 'Bœuf supplémentaire', price: 3.00 },
        { name: 'Bacon grillé', price: 1.50 },
        { name: 'Rondelles d’oignon croustillantes', price: 1.20 }
      ]
    }
  },

  // PIZZAS
  {
    id: 'pizza-margherita',
    name: 'Mini Pizza Margherita',
    description: 'Sauce tomate artisanale mijotée maison, mozzarella di bufala crémeuse, parmesan râpé, basilic frais luxuriant et filet d’huile d’olive extra vierge.',
    price: 10.90,
    category: 'pizza',
    image: pizzaImg, // matches pizza_thumbnail
    rating: 4.7,
    reviewsCount: 95,
    vegetarian: true,
    options: {
      sizes: [
        { name: 'Individuelle (22cm)', priceAdjustment: 0 },
        { name: 'Moyenne (30cm)', priceAdjustment: 3.50 }
      ],
      extras: [
        { name: 'Champignons frais', price: 1.50 },
        { name: 'Olives Kalamata', price: 1.00 },
        { name: 'Extra Mozzarella', price: 2.00 }
      ]
    }
  },

  // SIDES
  {
    id: 'side-fries',
    name: 'Frites Rustiques Dorées',
    description: 'Pommes de terre fraîches coupées à la main, saupoudrées d’un mélange secret d’herbes aromatiques et sel de Guérande, d’un croustillant absolu.',
    price: 4.50,
    category: 'side',
    image: friesImg, // matches fries_thumbnail
    rating: 4.9,
    reviewsCount: 220,
    vegetarian: true,
    options: {
      sizes: [
        { name: 'Format Standard', priceAdjustment: 0 },
        { name: 'Format XXL (À partager)', priceAdjustment: 2.00 }
      ],
      sauces: ['Mayonnaise Truffe', 'Ketchup Artisanal', 'Maison Allégée']
    }
  },
  {
    id: 'side-onion-rings',
    name: 'Onion Rings Suprêmes',
    description: 'Rondelles d’oignons doux espagnols enrobées d’une chapelure panko extra-croustillante maison, servies avec sauce fumée barbecue.',
    price: 5.20,
    category: 'side',
    image: onionRingsImg, // matches onion_rings_thumbnail
    rating: 4.6,
    reviewsCount: 88,
    vegetarian: true,
    options: {
      sauces: ['Sauce BBQ Fumée', 'Sauce Samouraï', 'Sauce Aïoli']
    }
  },

  // DRINKS
  {
    id: 'drink-cola',
    name: 'Limonade Maison Gingembre Orange',
    description: 'Limonade artisanale pressée à froid, pur jus d’orange bio, gingembre frais râpé et fines bulles rafraîchissantes.',
    price: 3.90,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 65,
    vegetarian: true
  },
  {
    id: 'drink-mojito',
    name: 'Mocktail Virgin Citron Vert Basilic',
    description: 'Feuilles de basilic frais pilées, jus de citron vert biologique, sucre de canne brut et eau pétillante fraîche.',
    price: 4.80,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop', // fallback to stunning aesthetic cocktail
    rating: 4.8,
    reviewsCount: 42,
    vegetarian: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'review-1',
    name: 'Amélie Dupont',
    rating: 5,
    comment: 'Une expérience gustative absolument incroyable ! Le double burger au cheddar est ultra-juteux et la sauce maison est une pure merveille. Service ultra-rapide en plus.',
    date: 'Hier',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'review-2',
    name: 'Thomas Morel',
    rating: 5,
    comment: 'Le concept de combiner un burger gourmet directement à côté d’une pizza de qualité supérieure est du pur génie ! Les frites aux herbes de Guérande sont divines.',
    date: 'Il y a 3 jours',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'review-3',
    name: 'Sonia Khelifi',
    rating: 4,
    comment: 'Superbe décoration et les produits sont d’une qualité incomparable. Mention spéciale pour les frites fraîches maison et le Mocktail Citron Vert Basilic hyper rafraîchissant.',
    date: 'Il y a 1 semaine',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  }
];
