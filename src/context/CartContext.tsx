import React, {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useReducer } from
'react';
import type { Product } from '../types';
export interface CartItem {
  product: Product;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  lastAddedProduct: Product | null;
  showToast: boolean;
}
type CartAction =
{
  type: 'ADD_ITEM';
  product: Product;
  quantity?: number;
} |
{
  type: 'REMOVE_ITEM';
  productId: string;
} |
{
  type: 'UPDATE_QUANTITY';
  productId: string;
  quantity: number;
} |
{
  type: 'CLEAR_CART';
} |
{
  type: 'TOGGLE_DRAWER';
} |
{
  type: 'OPEN_DRAWER';
} |
{
  type: 'CLOSE_DRAWER';
} |
{
  type: 'HIDE_TOAST';
};
interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  lastAddedProduct: Product | null;
  showToast: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  hideToast: () => void;
}
const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
  lastAddedProduct: null,
  showToast: false
};
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':{
        const qty = action.quantity ?? 1;
        const existing = state.items.find(
          (i) => i.product.id === action.product.id
        );
        if (existing) {
          return {
            ...state,
            items: state.items.map((i) =>
            i.product.id === action.product.id ?
            {
              ...i,
              quantity: i.quantity + qty
            } :
            i
            ),
            lastAddedProduct: action.product,
            showToast: true
          };
        }
        return {
          ...state,
          items: [
          ...state.items,
          {
            product: action.product,
            quantity: qty
          }],

          lastAddedProduct: action.product,
          showToast: true
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId)
      };
    case 'UPDATE_QUANTITY':{
        if (action.quantity <= 0) {
          return {
            ...state,
            items: state.items.filter((i) => i.product.id !== action.productId)
          };
        }
        return {
          ...state,
          items: state.items.map((i) =>
          i.product.id === action.productId ?
          {
            ...i,
            quantity: action.quantity
          } :
          i
          )
        };
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen
      };
    case 'OPEN_DRAWER':
      return {
        ...state,
        isDrawerOpen: true
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        isDrawerOpen: false
      };
    case 'HIDE_TOAST':
      return {
        ...state,
        showToast: false
      };
    default:
      return state;
  }
}
export const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (state.showToast) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'HIDE_TOAST'
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.showToast, state.lastAddedProduct]);
  const hideToast = useCallback(
    () =>
    dispatch({
      type: 'HIDE_TOAST'
    }),
    []
  );
  const value: CartContextValue = {
    items: state.items,
    totalItems,
    totalPrice,
    isDrawerOpen: state.isDrawerOpen,
    lastAddedProduct: state.lastAddedProduct,
    showToast: state.showToast,
    addItem: (product, quantity) =>
    dispatch({
      type: 'ADD_ITEM',
      product,
      quantity
    }),
    removeItem: (productId) =>
    dispatch({
      type: 'REMOVE_ITEM',
      productId
    }),
    updateQuantity: (productId, quantity) =>
    dispatch({
      type: 'UPDATE_QUANTITY',
      productId,
      quantity
    }),
    clearCart: () =>
    dispatch({
      type: 'CLEAR_CART'
    }),
    openDrawer: () =>
    dispatch({
      type: 'OPEN_DRAWER'
    }),
    closeDrawer: () =>
    dispatch({
      type: 'CLOSE_DRAWER'
    }),
    toggleDrawer: () =>
    dispatch({
      type: 'TOGGLE_DRAWER'
    }),
    hideToast
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}