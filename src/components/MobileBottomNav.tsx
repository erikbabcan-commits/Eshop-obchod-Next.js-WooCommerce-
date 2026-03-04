import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
export function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, openDrawer } = useCart();
  const { isAuthenticated } = useAuth();
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-4">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${isActive('/') ? 'text-accent' : 'text-gray-500 hover:text-gray-900'}`}>

          <HomeIcon
            size={20}
            className={isActive('/') ? 'fill-current' : ''}
            strokeWidth={isActive('/') ? 2 : 1.5} />

          <span className="font-sans text-xs font-medium tracking-wide">
            Home
          </span>
        </button>

        <button
          onClick={() => navigate('/search')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${isActive('/search') || location.pathname.startsWith('/category') ? 'text-accent' : 'text-gray-500 hover:text-gray-900'}`}>

          <SearchIcon
            size={20}
            strokeWidth={
            isActive('/search') || location.pathname.startsWith('/category') ?
            2.5 :
            1.5
            } />

          <span className="font-sans text-xs font-medium tracking-wide">
            Esplora
          </span>
        </button>

        <button
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center w-full h-full gap-1 text-gray-500 hover:text-gray-900 transition-colors group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

          <div className="relative">
            <ShoppingCartIcon
              size={20}
              className="group-hover:text-gray-900 transition-colors"
              strokeWidth={1.5} />

            {totalItems > 0 &&
            <span className="absolute -top-1.5 -right-2 w-5 h-5 bg-accent text-white font-mono text-xs font-bold rounded-full flex items-center justify-center leading-none shadow-sm animate-scale-in">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            }
          </div>
          <span className="font-sans text-xs font-medium tracking-wide group-hover:text-gray-900 transition-colors">
            Carrello
          </span>
        </button>

        <button
          onClick={() => navigate(isAuthenticated ? '/account' : '/login')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${isActive('/account') ? 'text-accent' : 'text-gray-500 hover:text-gray-900'}`}>

          <UserIcon
            size={20}
            className={isActive('/account') ? 'fill-current' : ''}
            strokeWidth={isActive('/account') ? 2 : 1.5} />

          <span className="font-sans text-xs font-medium tracking-wide">
            Account
          </span>
        </button>
      </div>
    </div>);

}