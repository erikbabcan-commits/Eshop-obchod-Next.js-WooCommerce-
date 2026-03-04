// ── API Service Layer ─────────────────────────────────────
// Production-ready fetch client. All secrets stay on the server;
// authentication is handled via HTTP-only cookies (credentials: "include").

import type { Product, Category, Brand, User } from '../types';

// ── Base URL ──────────────────────────────────────────────
// Set NEXT_PUBLIC_API_BASE_URL in your .env for cross-origin setups.
// Falls back to "" (same-origin) when not set.
const API_BASE_URL: string =
typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL ||
'';

// ── Errors ────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
  public status: number,
  public statusText: string,
  public body?: unknown)
  {
    super(`API ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

// ── Core request helper ───────────────────────────────────

const DEFAULT_TIMEOUT_MS = 10_000;

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  timeoutMs?: number;
}

async function request<T>(
path: string,
options: RequestOptions = {})
: Promise<T> {
  const { body, timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...rest } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const isFormData = body instanceof FormData;

  const defaultHeaders: Record<string, string> = {};
  if (!isFormData) {
    defaultHeaders['Content-Type'] = 'application/json';
  }
  defaultHeaders['Accept'] = 'application/json';

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      credentials: 'include',
      signal: controller.signal,
      headers: {
        ...defaultHeaders,
        ...(headers as Record<string, string>)
      },
      body: isFormData ?
      body as FormData :
      body != null ?
      JSON.stringify(body) :
      undefined
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {

        // response may not be JSON
      }throw new ApiError(response.status, response.statusText, errorBody);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new ApiError(408, 'Request timeout');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ── Typed HTTP helpers ────────────────────────────────────

function get<T>(path: string, opts?: Omit<RequestOptions, 'body'>): Promise<T> {
  return request<T>(path, { ...opts, method: 'GET' });
}

function post<T>(
path: string,
body?: unknown,
opts?: Omit<RequestOptions, 'body'>)
: Promise<T> {
  return request<T>(path, { ...opts, method: 'POST', body });
}

function put<T>(
path: string,
body?: unknown,
opts?: Omit<RequestOptions, 'body'>)
: Promise<T> {
  return request<T>(path, { ...opts, method: 'PUT', body });
}

function del<T>(path: string, opts?: Omit<RequestOptions, 'body'>): Promise<T> {
  return request<T>(path, { ...opts, method: 'DELETE' });
}

// ── Products ──────────────────────────────────────────────

async function fetchProducts(): Promise<Product[]> {
  return get<Product[]>('/api/products');
}

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await get<Product>(`/api/products/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  return get<Product[]>(`/api/categories/${encodeURIComponent(slug)}/products`);
}

async function fetchProductsByBrand(slug: string): Promise<Product[]> {
  return get<Product[]>(`/api/brands/${encodeURIComponent(slug)}/products`);
}

async function fetchSearchResults(query: string): Promise<Product[]> {
  return get<Product[]>(`/api/products/search?q=${encodeURIComponent(query)}`);
}

// ── Categories ────────────────────────────────────────────

async function fetchCategories(): Promise<Category[]> {
  return get<Category[]>('/api/categories');
}

async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await get<Category>(`/api/categories/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

// ── Brands ────────────────────────────────────────────────

async function fetchBrands(): Promise<Brand[]> {
  return get<Brand[]>('/api/brands');
}

async function fetchBrandBySlug(slug: string): Promise<Brand | null> {
  try {
    return await get<Brand>(`/api/brands/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

// ── Auth ──────────────────────────────────────────────────
// Session is managed via HTTP-only cookies set by the server.
// No tokens are stored on the client.

async function login(email: string, password: string): Promise<User> {
  return post<User>('/api/auth/login', { email, password });
}

async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<User> {
  return post<User>('/api/auth/register', data);
}

async function getCurrentUser(): Promise<User | null> {
  try {
    return await get<User>('/api/auth/me');
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      return null;
    }
    throw err;
  }
}

async function logout(): Promise<void> {
  return post<void>('/api/auth/logout');
}

// ── Orders ────────────────────────────────────────────────

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderPayload {
  items: {productId: string;quantity: number;}[];
  shipping: ShippingAddress;
  paymentMethod: string;
}

async function submitOrder(
order: OrderPayload)
: Promise<{orderId: string;success: boolean;}> {
  return post<{orderId: string;success: boolean;}>('/api/orders', order);
}

// ── Newsletter ────────────────────────────────────────────

async function subscribeNewsletter(
email: string)
: Promise<{success: boolean;}> {
  return post<{success: boolean;}>('/api/newsletter/subscribe', { email });
}

// ── Export ─────────────────────────────────────────────────

export const api = {
  products: {
    getAll: fetchProducts,
    getBySlug: fetchProductBySlug,
    getByCategory: fetchProductsByCategory,
    getByBrand: fetchProductsByBrand,
    search: fetchSearchResults
  },
  categories: {
    getAll: fetchCategories,
    getBySlug: fetchCategoryBySlug
  },
  brands: {
    getAll: fetchBrands,
    getBySlug: fetchBrandBySlug
  },
  auth: {
    login,
    register,
    getCurrentUser,
    logout
  },
  orders: {
    submit: submitOrder
  },
  newsletter: {
    subscribe: subscribeNewsletter
  }
};

// Re-export helpers for direct usage if needed
export { get, post, put, del, request };