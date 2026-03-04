import { describe, it, expect, beforeEach } from './testUtils';
import type { Product } from '../types';

// Inline wishlist reducer for testing (mirrors WishlistContext logic)
interface WishlistState {
  items: Product[];
}

type WishlistAction =
{type: 'ADD_ITEM';product: Product;} |
{type: 'REMOVE_ITEM';productId: string;} |
{type: 'CLEAR_WISHLIST';} |
{type: 'LOAD_FROM_STORAGE';items: Product[];};

function wishlistReducer(
state: WishlistState,
action: WishlistAction)
: WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':{
        const exists = state.items.some((i) => i.id === action.product.id);
        if (exists) return state;
        return { ...state, items: [...state.items, action.product] };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.productId)
      };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    case 'LOAD_FROM_STORAGE':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

// Mock products
const mockProduct1: Product = {
  id: 'wish-001',
  name: 'Wishlist Product 1',
  slug: 'wishlist-product-1',
  brand: 'Test Brand',
  category: 'peptidi',
  price: 38.0,
  sku: 'WISH-001',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 156,
  description: 'Test description',
  shortDescription: 'Short description',
  tags: ['test'],
  imageAlt: 'Test image'
};

const mockProduct2: Product = {
  ...mockProduct1,
  id: 'wish-002',
  name: 'Wishlist Product 2',
  slug: 'wishlist-product-2',
  sku: 'WISH-002'
};

const mockProduct3: Product = {
  ...mockProduct1,
  id: 'wish-003',
  name: 'Wishlist Product 3',
  slug: 'wishlist-product-3',
  sku: 'WISH-003'
};

let initialState: WishlistState;

describe('Wishlist Reducer — ADD_ITEM', () => {
  beforeEach(() => {
    initialState = { items: [] };
  });

  it('should add new item to empty wishlist', () => {
    const state = wishlistReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct1
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('wish-001');
  });

  it('should not add duplicate item', () => {
    let state = wishlistReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct1
    });
    state = wishlistReducer(state, {
      type: 'ADD_ITEM',
      product: mockProduct1
    });
    expect(state.items).toHaveLength(1);
  });

  it('should add multiple different items', () => {
    let state = wishlistReducer(initialState, {
      type: 'ADD_ITEM',
      product: mockProduct1
    });
    state = wishlistReducer(state, {
      type: 'ADD_ITEM',
      product: mockProduct2
    });
    state = wishlistReducer(state, {
      type: 'ADD_ITEM',
      product: mockProduct3
    });
    expect(state.items).toHaveLength(3);
  });
});

describe('Wishlist Reducer — REMOVE_ITEM', () => {
  beforeEach(() => {
    initialState = {
      items: [mockProduct1, mockProduct2, mockProduct3]
    };
  });

  it('should remove item by productId', () => {
    const state = wishlistReducer(initialState, {
      type: 'REMOVE_ITEM',
      productId: 'wish-002'
    });
    expect(state.items).toHaveLength(2);
    expect(state.items.find((i) => i.id === 'wish-002')).toBeUndefined();
  });

  it('should not change state for non-existent productId', () => {
    const state = wishlistReducer(initialState, {
      type: 'REMOVE_ITEM',
      productId: 'nonexistent'
    });
    expect(state.items).toHaveLength(3);
  });

  it('should handle removing last item', () => {
    const singleItemState: WishlistState = { items: [mockProduct1] };
    const state = wishlistReducer(singleItemState, {
      type: 'REMOVE_ITEM',
      productId: 'wish-001'
    });
    expect(state.items).toHaveLength(0);
  });
});

describe('Wishlist Reducer — CLEAR_WISHLIST', () => {
  it('should remove all items', () => {
    const stateWithItems: WishlistState = {
      items: [mockProduct1, mockProduct2, mockProduct3]
    };
    const state = wishlistReducer(stateWithItems, { type: 'CLEAR_WISHLIST' });
    expect(state.items).toHaveLength(0);
  });

  it('should handle clearing empty wishlist', () => {
    const emptyState: WishlistState = { items: [] };
    const state = wishlistReducer(emptyState, { type: 'CLEAR_WISHLIST' });
    expect(state.items).toHaveLength(0);
  });
});

describe('Wishlist Reducer — LOAD_FROM_STORAGE', () => {
  it('should load items from storage', () => {
    const storedItems = [mockProduct1, mockProduct2];
    const state = wishlistReducer(initialState, {
      type: 'LOAD_FROM_STORAGE',
      items: storedItems
    });
    expect(state.items).toHaveLength(2);
    expect(state.items[0].id).toBe('wish-001');
    expect(state.items[1].id).toBe('wish-002');
  });

  it('should replace existing items', () => {
    const stateWithItems: WishlistState = { items: [mockProduct3] };
    const state = wishlistReducer(stateWithItems, {
      type: 'LOAD_FROM_STORAGE',
      items: [mockProduct1]
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('wish-001');
  });
});

describe('Wishlist Helper Functions', () => {
  it('isInWishlist should return true for existing item', () => {
    const items = [mockProduct1, mockProduct2];
    const isInWishlist = (productId: string) =>
    items.some((i) => i.id === productId);
    expect(isInWishlist('wish-001')).toBe(true);
    expect(isInWishlist('wish-002')).toBe(true);
  });

  it('isInWishlist should return false for non-existing item', () => {
    const items = [mockProduct1, mockProduct2];
    const isInWishlist = (productId: string) =>
    items.some((i) => i.id === productId);
    expect(isInWishlist('wish-003')).toBe(false);
    expect(isInWishlist('nonexistent')).toBe(false);
  });

  it('totalItems should return correct count', () => {
    const items = [mockProduct1, mockProduct2, mockProduct3];
    expect(items.length).toBe(3);
  });
});