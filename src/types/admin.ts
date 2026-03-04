import type { Product } from './index';

export type OrderStatus =
'pending' |
'processing' |
'completed' |
'cancelled' |
'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  dateCreated: string;
  dateModified: string;
  total: number;
  shippingTotal: number;
  paymentMethod: string;
  paymentMethodTitle: string;
  customerId: string;
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  items: OrderItem[];
  notes: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  dateCreated: string;
  ordersCount: number;
  totalSpent: number;
  avatarUrl?: string;
  billing: {
    address: string;
    city: string;
    postcode: string;
    country: string;
    phone: string;
  };
}

export interface Plugin {
  id: string;
  name: string;
  pluginUri: string;
  version: string;
  description: string;
  author: string;
  authorUri: string;
  status: 'active' | 'inactive';
  updateAvailable: boolean;
  newVersion?: string;
}

export interface WPSettings {
  apiUrl: string;
  consumerKey: string;
  consumerSecret: string;
  verifySsl: boolean;
  version: 'wc/v3' | 'wc/v2' | 'wc/v1';
}

export interface DashboardStats {
  totalSales: number;
  netSales: number;
  ordersCount: number;
  itemsSold: number;
  customersCount: number;
  recentOrders: Order[];
  topProducts: {product: Product;quantitySold: number;revenue: number;}[];
}