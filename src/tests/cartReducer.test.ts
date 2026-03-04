import { describe, it, expect, beforeEach } from './testUtils';
import type { Product } from '../types';

// Inline cart reducer for testing (mirrors CartContext logic)
interface CartItem {
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
{type: 'ADD_ITEM';product: Product;quantity?: number;} |
{type: 'REMOVE_ITEM';productId: string;} |
{type: 'UPDATE_QUANTITY';productId: string;quantity: number;} |
{type: 'CLEAR_CART';} |
{type: 'TOGGLE_DRAWER';} |
{type: 'OPEN_DRAWER';} |
{type: 'CLOSE_DRAWER';} |
{type: 'HIDE_TOAST';};

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
            { ...i, quantity: i.quantity + qty } :
            i
            ),
            lastAddedProduct: action.product,
            showToast: true
          };
        }
        return {
          ...state,
          items: [...state.items, { product: action.product, quantity: qty }],
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
          { ...i, quantity: action.quantity } :
          i
          )
        };
      }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    case 'HIDE_TOAST':
      return { ...state, showToast: false };
    default:
      return state;
  }
}

// Mock product for testing
const mockProduct: Product = {
  id: 'test-001',
  name: 'Test Product',
  slug: 'test-product',
  brand: 'Test Brand',
  category: 'anabolizzanti',
  price: 50.0,
  sku: 'TEST-SKU-001',
  availability: 'InStock',
  rating: 4.5,
  reviewCount: 100,
  description: 'Test description',
  shortDescription: 'Short test description',
  tags: ['test', 'mock'],
  imageAlt: 'Test image'
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 'test-002',
  name: 'Test Product 2',
  slug: 'test-product-2',
  sku: 'TEST-SKU-002',
  price: 75.0
};

let initialState: CartState;

describe('Cart Reducer — ADD_ITEM', () => {
  beforeEach(() => {
    initialState = {
      items: [],
      isDrawerOpen: false,
      lastAddedProduct: null,
      showToast: false
    };
  });

  it('should add new item to empty cart', () => {
    const state = cartReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe('test-001');
    expect(state.items[0].quantity).toBe(1);
  });

  it('should add item with custom quantity', () => {
    const state = cartReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct,
      quantity: 3
    });
    expect(state.items[0].quantity).toBe(3);
  });

  it('should increment quantity for existing item', () => {
    const stateWithItem = cartReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct,
      quantity: 2
    });
    const state = cartReducer(stateWithItem, {
      type: 'ADD_ITEM',
      product: mockProduct,
      quantity: 3
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(5);
  });

  it('should set lastAddedProduct and showToast', () => {
    const state = cartReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct
    });
    expect(state.lastAddedProduct?.id).toBe('test-001');
    expect(state.showToast).toBe(true);
  });

  it('should handle multiple different products', () => {
    let state = cartReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct
    });
    state = cartReducer(state, {
      type: 'ADD_ITEM',
      product: mockProduct2
    });
    expect(state.items).toHaveLength(2);
  });
});

describe('Cart Reducer — REMOVE_ITEM', () => {
  beforeEach(() => {
    initialState = {
      items: [
      { product: mockProduct, quantity: 2 },
      { product: mockProduct2, quantity: 1 }],

      isDrawerOpen: false,
      lastAddedProduct: null,
      showToast: false
    };
  });

  it('should remove item by productId', () => {
    const state = cartReducer(initialState, {
      type: 'REMOVE_ITEM',
      productId: 'test-001'
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe('test-002');
  });

  it('should not change state for non-existent productId', () => {
    const state = cartReducer(initialState, {
      type: 'REMOVE_ITEM',
      productId: 'nonexistent'
    });
    expect(state.items).toHaveLength(2);
  });
});

describe('Cart Reducer — UPDATE_QUANTITY', () => {
  beforeEach(() => {
    initialState = {
      items: [{ product: mockProduct, quantity: 2 }],
      isDrawerOpen: false,
      lastAddedProduct: null,
      showToast: false
    };
  });

  it('should update quantity for existing item', () => {
    const state = cartReducer(initialState, {
      type: 'UPDATE_QUANTITY',
      productId: 'test-001',
      quantity: 5
    });
    expect(state.items[0].quantity).toBe(5);
  });

  it('should remove item when quantity is 0', () => {
    const state = cartReducer(initialState, {
      type: 'UPDATE_QUANTITY',
      productId: 'test-001',
      quantity: 0
    });
    expect(state.items).toHaveLength(0);
  });

  it('should remove item when quantity is negative', () => {
    const state = cartReducer(initialState, {
      type: 'UPDATE_QUANTITY',
      productId: 'test-001',
      quantity: -1
    });
    expect(state.items).toHaveLength(0);
  });
});

describe('Cart Reducer — CLEAR_CART', () => {
  it('should remove all items', () => {
    const stateWithItems: CartState = {
      items: [
      { product: mockProduct, quantity: 2 },
      { product: mockProduct2, quantity: 1 }],

      isDrawerOpen: true,
      lastAddedProduct: mockProduct,
      showToast: true
    };
    const state = cartReducer(stateWithItems, { type: 'CLEAR_CART' });
    expect(state.items).toHaveLength(0);
  });
});

describe('Cart Reducer — Drawer Actions', () => {
  beforeEach(() => {
    initialState = {
      items: [],
      isDrawerOpen: false,
      lastAddedProduct: null,
      showToast: false
    };
  });

  it('TOGGLE_DRAWER should toggle isDrawerOpen', () => {
    let state = cartReducer(initialState, { type: 'TOGGLE_DRAWER' });
    expect(state.isDrawerOpen).toBe(true);
    state = cartReducer(state, { type: 'TOGGLE_DRAWER' });
    expect(state.isDrawerOpen).toBe(false);
  });

  it('OPEN_DRAWER should set isDrawerOpen to true', () => {
    const state = cartReducer(initialState, { type: 'OPEN_DRAWER' });
    expect(state.isDrawerOpen).toBe(true);
  });

  it('CLOSE_DRAWER should set isDrawerOpen to false', () => {
    const openState = { ...initialState, isDrawerOpen: true };
    const state = cartReducer(openState, { type: 'CLOSE_DRAWER' });
    expect(state.isDrawerOpen).toBe(false);
  });
});

describe('Cart Reducer — Toast Actions', () => {
  it('HIDE_TOAST should set showToast to false', () => {
    const stateWithToast: CartState = {
      items: [],
      isDrawerOpen: false,
      lastAddedProduct: mockProduct,
      showToast: true
    };
    const state = cartReducer(stateWithToast, { type: 'HIDE_TOAST' });
    expect(state.showToast).toBe(false);
  });
});

describe('Cart Calculations', () => {
  it('should calculate correct total items', () => {
    const items: CartItem[] = [
    { product: mockProduct, quantity: 2 },
    { product: mockProduct2, quantity: 3 }];

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    expect(totalItems).toBe(5);
  });

  it('should calculate correct total price', () => {
    const items: CartItem[] = [
    { product: mockProduct, quantity: 2 }, // 50 * 2 = 100
    { product: mockProduct2, quantity: 3 } // 75 * 3 = 225
    ];
    const totalPrice = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    expect(totalPrice).toBe(325);
  });
});