import React, { useEffect, useState, useRef, Component } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
  MenuIcon,
  UserIcon,
  HeartIcon,
  ChevronDownIcon,
  LogOutIcon,
  PackageIcon,
  ShieldCheckIcon,
  TruckIcon,
  StarIcon } from
'lucide-react';
import type { Language, CategorySlug, Product } from '../types';
import { LANGUAGES, searchProducts, CATEGORIES, PRODUCTS } from '../data/store';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { CartDrawer } from './CartDrawer';
import { CubeLogo } from './CubeLogo';
const NAV_CATEGORIES: {
  slug: CategorySlug;
  label: string;
}[] = [
{
  slug: 'anabolizzanti',
  label: 'Anabolizzanti'
},
{
  slug: 'bruciagrassi',
  label: 'Bruciagrassi'
},
{
  slug: 'ormoni',
  label: 'Ormoni'
},
{
  slug: 'peptidi',
  label: 'Peptidi'
},
{
  slug: 'pct',
  label: 'PCT'
},
{
  slug: 'sarms',
  label: 'SARMs'
},
{
  slug: 'hgh',
  label: 'HGH'
},
{
  slug: 'vitamine',
  label: 'Vitamine'
}];

const PROMO_MESSAGES = [
{
  text: 'Spedizione gratuita sopra €100',
  icon: <TruckIcon size={14} />
},
{
  text: 'Nuovi arrivi ogni settimana',
  icon: <StarIcon size={14} />
},
{
  text: 'Garanzia qualità farmaceutica',
  icon: <ShieldCheckIcon size={14} />
}];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [currentLang, setCurrentLang] = useState<Language>('it');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<CategorySlug | null>(
    null
  );
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems: wishlistItems } = useWishlist();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout>();
  const searchResults = searchProducts(searchValue);
  const hasResults = searchValue.length >= 2;
  const categoryMatch = location.pathname.match(/^\/category\/(.+)$/);
  const activeCategory = categoryMatch ?
  categoryMatch[1] as CategorySlug :
  null;
  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Promo banner rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  // Cart bounce animation trigger
  useEffect(() => {
    if (totalItems > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);
  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setHoveredCategory(null);
  }, [location.pathname]);
  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setIsSearchFocused(false);
      }
      if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(e.target as Node))
      {
        setIsMobileMenuOpen(false);
      }
      if (
      userMenuRef.current &&
      !userMenuRef.current.contains(e.target as Node))
      {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setIsSearchOpen(value.length >= 2);
  };
  const handleSearchSelect = (product: Product) => {
    setSearchValue('');
    setIsSearchOpen(false);
    setIsSearchFocused(false);
    navigate(`/product/${product.slug}`);
  };
  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      setIsSearchOpen(false);
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };
  const handleCategoryMouseEnter = (slug: CategorySlug) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setHoveredCategory(slug);
  };
  const handleCategoryMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 200);
  };
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };
  // Get data for mega menu
  const hoveredCategoryData = hoveredCategory ?
  CATEGORIES.find((c) => c.slug === hoveredCategory) :
  null;
  const megaMenuProducts = hoveredCategory ?
  PRODUCTS.filter((p) => p.category === hoveredCategory).slice(0, 3) :
  [];
  return (
    <>
      {/* Promo Banner */}
      <div className="bg-primary text-white px-4 py-2 relative overflow-hidden hidden sm:block cubes-overlay">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center relative h-6 z-10">
          {PROMO_MESSAGES.map((msg, idx) =>
          <div
            key={idx}
            className={`absolute flex items-center gap-2 font-sans text-xs font-medium tracking-wide transition-all duration-500 ${idx === promoIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              {msg.icon}
              {msg.text}
            </div>
          )}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/85 backdrop-blur-header shadow-md' : 'bg-white border-b border-gray-100'}`}
        ref={mobileMenuRef}>

        {/* Top bar — hreflang strip */}
        <div
          className={`bg-gray-50/80 border-b border-gray-100 px-4 md:px-6 lg:px-8 py-2 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>

          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <span className="font-mono font-bold text-xs tracking-widest text-gray-500 uppercase">
              ISTEROIDI.IT
            </span>
            <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
              {LANGUAGES.slice(0, 4).map((lang) =>
              <button
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={`font-mono text-xs font-bold uppercase px-2 py-1 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${currentLang === lang ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-200 hover:text-primary'}`}>

                  {lang}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="px-4 md:px-6 lg:px-8 py-3 lg:py-4">
          <div className="max-w-[1200px] mx-auto flex items-center gap-4 lg:gap-8">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}>

              {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 flex-shrink-0 group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
              aria-label="Torna alla homepage ISTEROIDI">

              <CubeLogo
                size={28}
                className="text-primary group-hover:text-accent transition-colors lg:w-8 lg:h-8" />

              <span className="text-2xl lg:text-3xl font-black font-sans text-primary tracking-tighter group-hover:text-accent transition-colors">
                ISTEROIDI
              </span>
            </button>

            {/* Desktop category nav */}
            <nav
              className="hidden lg:flex items-center gap-1 flex-1 relative"
              onMouseLeave={handleCategoryMouseLeave}>

              {NAV_CATEGORIES.map((cat) =>
              <button
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                onMouseEnter={() => handleCategoryMouseEnter(cat.slug)}
                className={`text-sm font-sans font-medium whitespace-nowrap px-3 py-2 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${activeCategory === cat.slug || hoveredCategory === cat.slug ? 'text-primary bg-gray-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>

                  {cat.label}
                </button>
              )}
              <span className="text-gray-200 mx-2" aria-hidden="true">
                |
              </span>
              <button
                onClick={() => navigate('/brands')}
                className="text-sm font-sans font-medium whitespace-nowrap px-3 py-2 rounded-md transition-colors text-gray-500 hover:text-primary hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                Marchi
              </button>

              {/* Mega Menu Dropdown */}
              {hoveredCategory && hoveredCategoryData &&
              <div
                className="absolute top-full left-0 mt-2 w-[560px] bg-white rounded-lg shadow-modal border border-gray-100 overflow-hidden animate-fade-up z-50"
                onMouseEnter={() => {
                  if (megaMenuTimeoutRef.current)
                  clearTimeout(megaMenuTimeoutRef.current);
                }}>

                  <div className="grid grid-cols-5">
                    {/* Left: Category Info */}
                    <div className="col-span-2 bg-gray-50 p-6 flex flex-col">
                      <h3 className="font-sans text-lg font-bold text-primary mb-2">
                        {hoveredCategoryData.label}
                      </h3>
                      <p className="font-sans text-sm text-gray-500 mb-6 flex-1 line-clamp-4">
                        {hoveredCategoryData.description}
                      </p>
                      <button
                      onClick={() => navigate(`/category/${hoveredCategory}`)}
                      className="font-sans font-semibold text-sm text-accent hover:text-accent-hover flex items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                        Vedi tutti i prodotti{' '}
                        <ChevronDownIcon size={14} className="-rotate-90" />
                      </button>
                    </div>
                    {/* Right: Top Products */}
                    <div className="col-span-3 p-6">
                      <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">
                        Top Prodotti
                      </span>
                      <div className="space-y-4">
                        {megaMenuProducts.map((p) =>
                      <div
                        key={p.id}
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="flex items-center gap-3 group cursor-pointer">

                            <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                              {p.imageUrl ?
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform" /> :


                          <span className="font-mono text-xs text-gray-300">
                                  IMG
                                </span>
                          }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-sans text-sm font-semibold text-primary group-hover:text-accent transition-colors truncate">
                                {p.name}
                              </p>
                              <p className="font-mono text-xs font-bold text-gray-900">
                                €{p.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </nav>

            {/* Search + Icons */}
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0 ml-auto">
              {/* Search */}
              <div className="relative hidden sm:block" ref={searchRef}>
                <div className="relative flex items-center">
                  <SearchIcon
                    className="absolute left-3 text-gray-400"
                    size={16} />

                  <input
                    type="search"
                    placeholder="Cerca prodotti..."
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      if (searchValue.length >= 2) setIsSearchOpen(true);
                    }}
                    className={`font-sans text-sm border border-gray-200 rounded-full pl-10 pr-8 h-10 bg-gray-50 text-primary placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all duration-300 ${isSearchFocused ? 'w-72' : 'w-48'}`} />

                  {searchValue &&
                  <button
                    onClick={() => {
                      setSearchValue('');
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-3 text-gray-400 hover:text-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full">

                      <XIcon size={14} />
                    </button>
                  }
                </div>

                {/* Search Results Dropdown */}
                {isSearchOpen && hasResults &&
                <div className="absolute top-full right-0 mt-2 w-[384px] bg-white border border-gray-100 rounded-lg shadow-modal z-50 overflow-hidden animate-fade-up">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Risultati per "{searchValue}"
                      </span>
                      <span className="font-mono text-xs text-gray-500">
                        {searchResults.length} trovati
                      </span>
                    </div>

                    {searchResults.length === 0 ?
                  <div className="p-6 text-center">
                        <p className="font-sans text-sm font-medium text-gray-900 mb-1">
                          Nessun prodotto trovato
                        </p>
                        <p className="font-sans text-xs text-gray-500">
                          Prova con un termine diverso o più generico.
                        </p>
                      </div> :

                  <ul className="max-h-[320px] overflow-y-auto scrollbar-thin divide-y divide-gray-50">
                        {searchResults.slice(0, 5).map((product) =>
                    <li key={product.id}>
                            <button
                        onClick={() => handleSearchSelect(product)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                              <div className="w-10 h-10 border border-gray-100 rounded bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {product.imageUrl ?
                          <img
                            src={product.imageUrl}
                            alt=""
                            className="w-full h-full object-cover mix-blend-multiply" /> :


                          <span className="font-mono text-xs text-gray-300">
                                    IMG
                                  </span>
                          }
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-sans text-sm font-semibold text-primary group-hover:text-accent transition-colors truncate">
                                  {product.name}
                                </p>
                                <span className="font-mono text-xs text-gray-400 block">
                                  {product.category}
                                </span>
                              </div>
                              <span className="font-mono text-sm font-bold text-primary">
                                €{product.price.toFixed(2)}
                              </span>
                            </button>
                          </li>
                    )}
                      </ul>
                  }

                    {searchResults.length > 5 &&
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full p-3 bg-gray-50 font-sans text-sm font-medium text-accent hover:text-accent-hover hover:bg-gray-100 transition-colors text-center border-t border-gray-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                        Vedi tutti i {searchResults.length} risultati
                      </button>
                  }
                  </div>
                }
              </div>

              {/* Mobile search button */}
              <button
                onClick={() => navigate('/search')}
                className="sm:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="Cerca">

                <SearchIcon size={20} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigate('/wishlist')}
                className="hidden sm:flex relative p-2 text-gray-600 hover:text-accent hover:bg-accent-light/50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="Preferiti">

                <HeartIcon size={20} />
                {wishlistItems > 0 &&
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-white font-mono text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    {wishlistItems}
                  </span>
                }
              </button>

              {/* User Account */}
              <div className="hidden sm:block relative" ref={userMenuRef}>
                <button
                  onClick={() =>
                  isAuthenticated ?
                  setIsUserMenuOpen(!isUserMenuOpen) :
                  navigate('/login')
                  }
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label="Account">

                  {isAuthenticated && user ?
                  <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center font-sans text-xs font-bold shadow-sm">
                      {user.firstName[0]}
                    </div> :

                  <UserIcon size={20} />
                  }
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && isAuthenticated && user &&
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-modal z-50 overflow-hidden animate-fade-up">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                      <p className="font-sans text-sm font-bold text-primary truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="font-sans text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/account');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-sans font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                        <UserIcon size={16} className="text-gray-400" /> Il mio
                        Profilo
                      </button>
                      <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/account');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-sans font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                        <PackageIcon size={16} className="text-gray-400" /> I
                        miei Ordini
                      </button>
                      <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/wishlist');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-sans font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                        <HeartIcon size={16} className="text-gray-400" />{' '}
                        Wishlist
                      </button>
                    </div>
                    <div className="p-1 border-t border-gray-50">
                      <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-sans font-medium text-error hover:bg-error-light rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                        <LogOutIcon size={16} /> Esci
                      </button>
                    </div>
                  </div>
                }
              </div>

              {/* Cart button */}
              <button
                onClick={openDrawer}
                className={`relative flex items-center justify-center gap-2 px-3 h-10 sm:px-4 sm:h-10 bg-primary text-white rounded-full hover:bg-primary-light transition-all duration-200 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${cartBounce ? 'animate-cart-bounce' : ''}`}
                aria-label="Carrello">

                <ShoppingCartIcon size={18} />
                <span className="hidden sm:inline font-sans font-semibold text-sm">
                  Carrello
                </span>
                {totalItems > 0 &&
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white font-mono text-xs font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                    {totalItems}
                  </span>
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen &&
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-fade-in max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-1">
                <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 px-4">
                  Categorie
                </span>
                {NAV_CATEGORIES.map((cat) =>
              <button
                key={cat.slug}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate(`/category/${cat.slug}`);
                }}
                className={`w-full text-left font-sans text-base font-medium px-4 py-3 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${activeCategory === cat.slug ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>

                    {cat.label}
                  </button>
              )}

                <div className="h-px bg-gray-100 my-4 mx-4"></div>

                <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/brands');
                }}
                className="w-full text-left font-sans text-base font-medium px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                  Tutti i Marchi
                </button>

                <div className="h-px bg-gray-100 my-4 mx-4"></div>

                <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 px-4">
                  Lingua
                </span>
                <div className="flex flex-wrap gap-2 px-4">
                  {LANGUAGES.slice(0, 4).map((lang) =>
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`font-mono text-xs font-bold uppercase px-3 py-2 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${currentLang === lang ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>

                      {lang}
                    </button>
                )}
                </div>
              </nav>
            </div>
          </div>
        }
      </header>

      <CartDrawer />
    </>);

}