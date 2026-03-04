import type { Order, Customer, Plugin, WPSettings } from '../types/admin';

export const MOCK_ORDERS: Order[] = [
{
  id: 'ord_1',
  number: '1042',
  status: 'processing',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  dateModified: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  total: 145.5,
  shippingTotal: 9.9,
  paymentMethod: 'card',
  paymentMethodTitle: 'Carta di Credito',
  customerId: 'cust_1',
  billing: {
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mario.rossi@example.it',
    phone: '+39 333 1234567',
    address: 'Via Roma 1',
    city: 'Milano',
    postcode: '20100',
    country: 'IT'
  },
  shipping: {
    firstName: 'Mario',
    lastName: 'Rossi',
    address: 'Via Roma 1',
    city: 'Milano',
    postcode: '20100',
    country: 'IT'
  },
  items: [
  {
    id: 'item_1',
    productId: 'p001',
    name: 'Testosterone Enantato 250mg/ml',
    quantity: 2,
    price: 42.0,
    total: 84.0
  },
  {
    id: 'item_2',
    productId: 'p007',
    name: 'Tamoxifene 20mg — Nolvadex',
    quantity: 1,
    price: 24.0,
    total: 24.0
  },
  {
    id: 'item_3',
    productId: 'p026',
    name: 'ZMA — Zinco Magnesio B6',
    quantity: 2,
    price: 14.0,
    total: 28.0
  }],

  notes: 'Consegna al mattino se possibile'
},
{
  id: 'ord_2',
  number: '1041',
  status: 'completed',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  dateModified: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  total: 340.0,
  shippingTotal: 0,
  paymentMethod: 'crypto',
  paymentMethodTitle: 'Bitcoin',
  customerId: 'cust_2',
  billing: {
    firstName: 'Luca',
    lastName: 'Bianchi',
    email: 'luca.b@example.com',
    phone: '+39 344 9876543',
    address: 'Piazza Garibaldi 5',
    city: 'Roma',
    postcode: '00100',
    country: 'IT'
  },
  shipping: {
    firstName: 'Luca',
    lastName: 'Bianchi',
    address: 'Piazza Garibaldi 5',
    city: 'Roma',
    postcode: '00100',
    country: 'IT'
  },
  items: [
  {
    id: 'item_4',
    productId: 'p014',
    name: 'Somatropina HGH 200 UI Kit',
    quantity: 1,
    price: 340.0,
    total: 340.0
  }],

  notes: ''
},
{
  id: 'ord_3',
  number: '1040',
  status: 'pending',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  dateModified: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  total: 85.0,
  shippingTotal: 9.9,
  paymentMethod: 'bank',
  paymentMethodTitle: 'Bonifico Bancario',
  customerId: 'cust_3',
  billing: {
    firstName: 'Giuseppe',
    lastName: 'Verdi',
    email: 'g.verdi@example.it',
    phone: '+39 322 4567890',
    address: 'Via Napoli 12',
    city: 'Napoli',
    postcode: '80100',
    country: 'IT'
  },
  shipping: {
    firstName: 'Giuseppe',
    lastName: 'Verdi',
    address: 'Via Napoli 12',
    city: 'Napoli',
    postcode: '80100',
    country: 'IT'
  },
  items: [
  {
    id: 'item_5',
    productId: 'p006',
    name: 'Ostarine MK-2866 25mg',
    quantity: 1,
    price: 52.0,
    total: 52.0
  },
  {
    id: 'item_6',
    productId: 'p021',
    name: 'T3 Cytomel 25mcg — Liotironina',
    quantity: 1,
    price: 22.0,
    total: 22.0
  }],

  notes: 'Attendo coordinate bancarie'
},
{
  id: 'ord_4',
  number: '1039',
  status: 'cancelled',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  dateModified: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
  total: 120.0,
  shippingTotal: 9.9,
  paymentMethod: 'paypal',
  paymentMethodTitle: 'PayPal',
  customerId: 'cust_4',
  billing: {
    firstName: 'Antonio',
    lastName: 'Esposito',
    email: 'antonio.e@example.it',
    phone: '+39 338 1122334',
    address: 'Corso Vittorio Emanuele 45',
    city: 'Torino',
    postcode: '10100',
    country: 'IT'
  },
  shipping: {
    firstName: 'Antonio',
    lastName: 'Esposito',
    address: 'Corso Vittorio Emanuele 45',
    city: 'Torino',
    postcode: '10100',
    country: 'IT'
  },
  items: [
  {
    id: 'item_7',
    productId: 'p011',
    name: 'Trenbolone Enantato 200mg/ml',
    quantity: 1,
    price: 72.0,
    total: 72.0
  },
  {
    id: 'item_8',
    productId: 'p002',
    name: 'Nandrolone Decanoato 300mg/ml',
    quantity: 1,
    price: 48.5,
    total: 48.5
  }],

  notes: 'Annullato dal cliente'
}];


export const MOCK_CUSTOMERS: Customer[] = [
{
  id: 'cust_1',
  email: 'mario.rossi@example.it',
  firstName: 'Mario',
  lastName: 'Rossi',
  role: 'customer',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  ordersCount: 3,
  totalSpent: 450.5,
  billing: {
    address: 'Via Roma 1',
    city: 'Milano',
    postcode: '20100',
    country: 'IT',
    phone: '+39 333 1234567'
  }
},
{
  id: 'cust_2',
  email: 'luca.b@example.com',
  firstName: 'Luca',
  lastName: 'Bianchi',
  role: 'customer',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  ordersCount: 1,
  totalSpent: 340.0,
  billing: {
    address: 'Piazza Garibaldi 5',
    city: 'Roma',
    postcode: '00100',
    country: 'IT',
    phone: '+39 344 9876543'
  }
},
{
  id: 'cust_3',
  email: 'g.verdi@example.it',
  firstName: 'Giuseppe',
  lastName: 'Verdi',
  role: 'customer',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  ordersCount: 5,
  totalSpent: 890.0,
  billing: {
    address: 'Via Napoli 12',
    city: 'Napoli',
    postcode: '80100',
    country: 'IT',
    phone: '+39 322 4567890'
  }
},
{
  id: 'cust_4',
  email: 'antonio.e@example.it',
  firstName: 'Antonio',
  lastName: 'Esposito',
  role: 'customer',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  ordersCount: 0,
  totalSpent: 0,
  billing: {
    address: 'Corso Vittorio Emanuele 45',
    city: 'Torino',
    postcode: '10100',
    country: 'IT',
    phone: '+39 338 1122334'
  }
},
{
  id: 'cust_admin',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'administrator',
  dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(),
  ordersCount: 0,
  totalSpent: 0,
  billing: {
    address: '',
    city: '',
    postcode: '',
    country: '',
    phone: ''
  }
}];


export const MOCK_PLUGINS: Plugin[] = [
{
  id: 'woocommerce',
  name: 'WooCommerce',
  pluginUri: 'https://woocommerce.com/',
  version: '8.5.2',
  description:
  'An eCommerce toolkit that helps you sell anything. Beautifully.',
  author: 'Automattic',
  authorUri: 'https://woocommerce.com/',
  status: 'active',
  updateAvailable: true,
  newVersion: '8.6.0'
},
{
  id: 'wordfence',
  name: 'Wordfence Security',
  pluginUri: 'https://www.wordfence.com/',
  version: '7.11.1',
  description: 'Wordfence Security - Anti-virus, Firewall and Malware Scan',
  author: 'Wordfence',
  authorUri: 'https://www.wordfence.com/',
  status: 'active',
  updateAvailable: false
},
{
  id: 'yoast-seo',
  name: 'Yoast SEO',
  pluginUri: 'https://yoast.com/wordpress/plugins/seo/',
  version: '22.0',
  description:
  'The first true all-in-one SEO solution for WordPress, including on-page content analysis, XML sitemaps and much more.',
  author: 'Team Yoast',
  authorUri: 'https://yoast.com/',
  status: 'active',
  updateAvailable: false
},
{
  id: 'contact-form-7',
  name: 'Contact Form 7',
  pluginUri: 'https://contactform7.com/',
  version: '5.8.6',
  description: 'Just another contact form plugin. Simple but flexible.',
  author: 'Takayuki Miyoshi',
  authorUri: 'https://ideasilo.wordpress.com/',
  status: 'inactive',
  updateAvailable: true,
  newVersion: '5.8.7'
},
{
  id: 'wp-mail-smtp',
  name: 'WP Mail SMTP',
  pluginUri: 'https://wpmailsmtp.com/',
  version: '3.11.1',
  description:
  'Reconfigures the wp_mail() function to use Gmail/Mailgun/SendGrid/SMTP instead of the default mail() and creates an options page to manage the settings.',
  author: 'WP Mail SMTP',
  authorUri: 'https://wpmailsmtp.com/',
  status: 'active',
  updateAvailable: false
}];


export const DEFAULT_WP_SETTINGS: WPSettings = {
  apiUrl: '', // ⚠️ Set via server env: WP_API_URL
  consumerKey: '', // ⚠️ SERVER ONLY — never expose to client
  consumerSecret: '', // ⚠️ SERVER ONLY — never expose to client
  verifySsl: true,
  version: 'wc/v3'
};