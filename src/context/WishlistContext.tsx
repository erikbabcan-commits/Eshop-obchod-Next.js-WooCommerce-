import React, {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useReducer } from
'react';
import type { Product } from '../types';
interface WishlistState {
  items: Product[];
}
type WishlistAction =
{
  type: 'ADD_ITEM';
  product: Product;
} |
{
  type: 'REMOVE_ITEM';
  productId: string;
} |
{
  type: 'CLEAR_WISHLIST';
} |
{
  type: 'LOAD_FROM_STORAGE';
  items: Product[];
};
interface WishlistContextValue {
  items: Product[];
  totalItems: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}
const STORAGE_KEY = 'isteroidi_wishlist';
const initialState: WishlistState = {
  items: []
};
function wishlistReducer(
state: WishlistState,
action: WishlistAction)
: WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':{
        const exists = state.items.some((i) => i.id === action.product.id);
        if (exists) return state;
        return {
          ...state,
          items: [...state.items, action.product]
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.productId)
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        items: action.items
      };
    default:
      return state;
  }
}
const WishlistContext = createContext<WishlistContextValue | null>(null);
export function WishlistProvider({ children }: {children: React.ReactNode;}) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved) as Product[];
        dispatch({
          type: 'LOAD_FROM_STORAGE',
          items
        });
      }
    } catch {

      // ignore parse errors
    }}, []);
  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);
  const addItem = useCallback((product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      product
    });
  }, []);
  const removeItem = useCallback((productId: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      productId
    });
  }, []);
  const isInWishlist = useCallback(
    (productId: string) => state.items.some((i) => i.id === productId),
    [state.items]
  );
  const clearWishlist = useCallback(() => {
    dispatch({
      type: 'CLEAR_WISHLIST'
    });
  }, []);
  const value: WishlistContextValue = {
    items: state.items,
    totalItems: state.items.length,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist
  };
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>);

}
export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}