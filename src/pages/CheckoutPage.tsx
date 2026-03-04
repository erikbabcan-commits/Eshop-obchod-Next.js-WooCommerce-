import React, { useMemo, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckIcon,
  AlertCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  BuildingIcon,
  BitcoinIcon,
  TruckIcon,
  ZapIcon,
  GiftIcon,
  XIcon,
  TagIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { useCart } from '../context/CartContext';
type Step = 'shipping' | 'delivery' | 'payment' | 'review';
interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
}
interface FormErrors {
  [key: string]: string;
}
const INITIAL_SHIPPING: ShippingForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'IT',
  notes: ''
};
const COUNTRIES = [
{
  code: 'IT',
  label: 'Italia',
  vat: 22
},
{
  code: 'DE',
  label: 'Germania',
  vat: 19
},
{
  code: 'FR',
  label: 'Francia',
  vat: 20
},
{
  code: 'ES',
  label: 'Spagna',
  vat: 21
},
{
  code: 'AT',
  label: 'Austria',
  vat: 20
},
{
  code: 'CH',
  label: 'Svizzera',
  vat: 7.7
},
{
  code: 'NL',
  label: 'Paesi Bassi',
  vat: 21
},
{
  code: 'BE',
  label: 'Belgio',
  vat: 21
},
{
  code: 'PL',
  label: 'Polonia',
  vat: 23
},
{
  code: 'CZ',
  label: 'Repubblica Ceca',
  vat: 21
}];

const DELIVERY_METHODS = [
{
  id: 'standard',
  name: 'Standard',
  price: 4.9,
  days: '4-7 giorni lavorativi',
  icon: TruckIcon
},
{
  id: 'express',
  name: 'Express',
  price: 9.9,
  days: '1-2 giorni lavorativi',
  icon: ZapIcon
},
{
  id: 'free',
  name: 'Gratuita',
  price: 0,
  days: '4-7 giorni lavorativi',
  icon: GiftIcon,
  minOrder: 100
}];

const PAYMENT_METHODS = [
{
  id: 'card',
  name: 'Carta di Credito/Debito',
  description: 'Visa, Mastercard, American Express',
  icon: CreditCardIcon
},
{
  id: 'paypal',
  name: 'PayPal',
  description: 'Paga in modo sicuro con PayPal',
  icon: null
},
{
  id: 'bank',
  name: 'Bonifico Bancario',
  description: 'Trasferimento diretto dal tuo conto',
  icon: BuildingIcon
},
{
  id: 'crypto',
  name: 'Bitcoin / Criptovalute',
  description: 'BTC, ETH, USDT e altre crypto',
  icon: BitcoinIcon
}];

const COUPON_CODES: Record<
  string,
  {
    type: 'percent' | 'shipping';
    value: number;
    label: string;
  }> =
{
  WELCOME10: {
    type: 'percent',
    value: 10,
    label: '10% di sconto'
  },
  SHIP0: {
    type: 'shipping',
    value: 0,
    label: 'Spedizione gratuita'
  }
};
function validateShipping(data: ShippingForm): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = 'Campo obbligatorio';
  if (!data.lastName.trim()) errors.lastName = 'Campo obbligatorio';
  if (!data.email.trim()) {
    errors.email = 'Campo obbligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email non valida';
  }
  if (!data.address.trim()) errors.address = 'Campo obbligatorio';
  if (!data.city.trim()) errors.city = 'Campo obbligatorio';
  if (!data.postalCode.trim()) {
    errors.postalCode = 'Campo obbligatorio';
  } else if (!/^\d{4,6}$/.test(data.postalCode.replace(/\s/g, ''))) {
    errors.postalCode = 'CAP non valido';
  }
  return errors;
}
interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}
function Field({
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  placeholder,
  required
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-xs text-gray-500 block mb-1">

        {label}
        {required && <span className="text-gray-400 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full font-sans text-sm border rounded px-3 h-10 text-gray-800 placeholder-gray-300 bg-white focus:outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${error ? 'border-red-300 focus:border-red-400' : 'border-gray-300 focus:border-gray-500'}`} />

      {error &&
      <p className="font-mono text-xs text-red-400 mt-1 flex items-center gap-1">
          <AlertCircleIcon size={10} />
          {error}
        </p>
      }
    </div>);

}
export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>('shipping');
  const [shipping, setShipping] = useState<ShippingForm>(INITIAL_SHIPPING);
  const [errors, setErrors] = useState<FormErrors>({});
  const [deliveryMethod, setDeliveryMethod] = useState<string>('standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const steps: {
    key: Step;
    label: string;
    number: number;
  }[] = [
  {
    key: 'shipping',
    label: 'Indirizzo',
    number: 1
  },
  {
    key: 'delivery',
    label: 'Spedizione',
    number: 2
  },
  {
    key: 'payment',
    label: 'Pagamento',
    number: 3
  },
  {
    key: 'review',
    label: 'Riepilogo',
    number: 4
  }];

  const getStepIndex = (s: Step) => steps.findIndex((st) => st.key === s);
  const currentStepIndex = getStepIndex(step);
  // Calculations
  const country =
  COUNTRIES.find((c) => c.code === shipping.country) ?? COUNTRIES[0];
  const vatRate = country.vat;
  const selectedDelivery =
  DELIVERY_METHODS.find((d) => d.id === deliveryMethod) ?? DELIVERY_METHODS[0];
  const couponData = appliedCoupon ? COUPON_CODES[appliedCoupon] : null;
  const percentDiscount =
  couponData?.type === 'percent' ? totalPrice * couponData.value / 100 : 0;
  const subtotalAfterDiscount = totalPrice - percentDiscount;
  const shippingCost =
  couponData?.type === 'shipping' ?
  0 :
  selectedDelivery.id === 'free' && totalPrice >= 100 ?
  0 :
  selectedDelivery.price;
  const vatAmount = (subtotalAfterDiscount + shippingCost) * (vatRate / 100);
  const grandTotal = subtotalAfterDiscount + shippingCost + vatAmount;
  const freeShippingThreshold = 100;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const updateField = (field: keyof ShippingForm) => (value: string) => {
    setShipping((prev) => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  const validateField = (field: keyof ShippingForm) => () => {
    const fieldErrors = validateShipping(shipping);
    if (fieldErrors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: fieldErrors[field]
      }));
    }
  };
  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (COUPON_CODES[code]) {
      setAppliedCoupon(code);
      setCouponCode('');
    } else {
      setCouponError('Codice non valido');
    }
  };
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };
  const canProceed = (currentStep: Step): boolean => {
    switch (currentStep) {
      case 'shipping':
        return Object.keys(validateShipping(shipping)).length === 0;
      case 'delivery':
        return !!deliveryMethod;
      case 'payment':
        return !!paymentMethod;
      case 'review':
        return true;
      default:
        return false;
    }
  };
  const handleNext = () => {
    if (step === 'shipping') {
      const newErrors = validateShipping(shipping);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep('delivery');
    } else if (step === 'delivery') {
      setStep('payment');
    } else if (step === 'payment') {
      if (!paymentMethod) return;
      setStep('review');
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleBack = (targetStep: Step) => {
    const targetIndex = getStepIndex(targetStep);
    if (targetIndex < currentStepIndex) {
      setStep(targetStep);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    clearCart();
    navigate('/order-confirmation');
  };
  if (items.length === 0) {
    return (
      <Layout>
        <SEOHead title="Checkout" canonical="/checkout" noIndex />
        <main
          className="min-h-screen w-full"
          style={{
            backgroundColor: 'var(--color-bg)'
          }}>

          <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
              {
                label: 'carrello',
                onClick: () => navigate('/cart')
              },
              {
                label: 'checkout'
              }]
              } />

            <div className="border border-dashed border-gray-300 rounded py-20 flex flex-col items-center justify-center mt-6">
              <p className="font-sans text-sm text-gray-500 mb-4">
                Il carrello è vuoto
              </p>
              <button
                onClick={() => navigate('/cart')}
                className="font-mono text-xs px-4 h-8 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 flex items-center justify-center">

                ← Torna al Carrello
              </button>
            </div>
          </div>
        </main>
      </Layout>);

  }
  const selectedPayment = PAYMENT_METHODS.find((m) => m.id === paymentMethod);
  return (
    <Layout>
      <SEOHead title="Checkout" canonical="/checkout" noIndex />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
            {
              label: 'carrello',
              onClick: () => navigate('/cart')
            },
            {
              label: 'checkout'
            }]
            } />


          <div className="mb-6">
            <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1">
              Checkout
            </h1>
            <p className="font-mono text-xs text-gray-400">
              /checkout · ordine sicuro
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center justify-between mb-8 max-w-2xl">
            {steps.map((s, i) => {
              const isActive = s.key === step;
              const isDone = i < currentStepIndex;
              const isClickable = i < currentStepIndex;
              return (
                <Fragment key={s.key}>
                  <button
                    onClick={() => isClickable && handleBack(s.key)}
                    disabled={!isClickable}
                    className={`flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isDone ? 'bg-gray-800 text-white' : isActive ? 'border-2 border-gray-800 text-gray-800' : 'border border-gray-300 text-gray-400'}`}>

                      {isDone ?
                      <CheckIcon size={14} /> :

                      <span className="font-mono text-xs">{s.number}</span>
                      }
                    </div>
                    <span
                      className={`font-mono text-xs hidden sm:inline ${isActive ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>

                      {s.label}
                    </span>
                  </button>
                  {i < steps.length - 1 &&
                  <div className="flex-1 h-px bg-gray-300 mx-2" />
                  }
                </Fragment>);

            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Form steps */}
            <div className="lg:col-span-7">
              {/* Step 1: Shipping */}
              {step === 'shipping' &&
              <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t">
                    <span className="font-mono text-xs font-medium text-gray-600">
                      1. Indirizzo di Spedizione
                    </span>
                  </div>
                  <div className="px-5 py-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                      label="Nome"
                      id="firstName"
                      value={shipping.firstName}
                      onChange={updateField('firstName')}
                      onBlur={validateField('firstName')}
                      error={errors.firstName}
                      placeholder="Mario"
                      required />

                      <Field
                      label="Cognome"
                      id="lastName"
                      value={shipping.lastName}
                      onChange={updateField('lastName')}
                      onBlur={validateField('lastName')}
                      error={errors.lastName}
                      placeholder="Rossi"
                      required />

                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                      label="Email"
                      id="email"
                      type="email"
                      value={shipping.email}
                      onChange={updateField('email')}
                      onBlur={validateField('email')}
                      error={errors.email}
                      placeholder="mario@email.it"
                      required />

                      <Field
                      label="Telefono"
                      id="phone"
                      type="tel"
                      value={shipping.phone}
                      onChange={updateField('phone')}
                      placeholder="+39 333 1234567" />

                    </div>
                    <Field
                    label="Indirizzo"
                    id="address"
                    value={shipping.address}
                    onChange={updateField('address')}
                    onBlur={validateField('address')}
                    error={errors.address}
                    placeholder="Via Roma 1, Interno 3"
                    required />

                    <div className="grid grid-cols-3 gap-4">
                      <Field
                      label="CAP"
                      id="postalCode"
                      value={shipping.postalCode}
                      onChange={updateField('postalCode')}
                      onBlur={validateField('postalCode')}
                      error={errors.postalCode}
                      placeholder="00100"
                      required />

                      <Field
                      label="Città"
                      id="city"
                      value={shipping.city}
                      onChange={updateField('city')}
                      onBlur={validateField('city')}
                      error={errors.city}
                      placeholder="Roma"
                      required />

                      <div>
                        <label
                        htmlFor="country"
                        className="font-mono text-xs text-gray-500 block mb-1">

                          Paese
                        </label>
                        <select
                        id="country"
                        value={shipping.country}
                        onChange={(e) =>
                        updateField('country')(e.target.value)
                        }
                        className="w-full font-sans text-sm border border-gray-300 rounded px-3 h-10 text-gray-800 bg-white focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                          {COUNTRIES.map((c) =>
                        <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                        )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                      htmlFor="notes"
                      className="font-mono text-xs text-gray-500 block mb-1">

                        Note ordine (opzionale)
                      </label>
                      <textarea
                      id="notes"
                      value={shipping.notes}
                      onChange={(e) => updateField('notes')(e.target.value)}
                      placeholder="Istruzioni speciali per la consegna..."
                      rows={3}
                      className="w-full font-sans text-sm border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-300 bg-white focus:outline-none focus:border-gray-500 resize-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                    </div>
                  </div>
                  <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b flex items-center justify-between">
                    <button
                    onClick={() => navigate('/cart')}
                    className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                      ← Torna al Carrello
                    </button>
                    <button
                    onClick={handleNext}
                    className="font-sans font-semibold text-sm px-6 h-10 bg-accent text-white rounded hover:bg-accent-hover transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                      Continua →
                    </button>
                  </div>
                </div>
              }

              {/* Step 2: Delivery */}
              {step === 'delivery' &&
              <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t">
                    <span className="font-mono text-xs font-medium text-gray-600">
                      2. Metodo di Spedizione
                    </span>
                  </div>
                  <div className="px-5 py-5 space-y-3">
                    {DELIVERY_METHODS.map((method) => {
                    const isDisabled =
                    method.minOrder !== undefined &&
                    totalPrice < method.minOrder;
                    const isSelected = deliveryMethod === method.id;
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() =>
                        !isDisabled && setDeliveryMethod(method.id)
                        }
                        disabled={isDisabled}
                        className={`w-full flex items-center gap-4 p-4 border rounded transition-colors text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' : isSelected ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>

                          <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-gray-800' : 'border-gray-300'}`}>

                            {isSelected &&
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                          }
                          </div>
                          <div className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center flex-shrink-0 bg-white">
                            <Icon size={16} className="text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-medium text-gray-800">
                              {method.name}
                            </p>
                            <p className="font-mono text-xs text-gray-400">
                              {method.days}
                            </p>
                            {method.minOrder &&
                          <p className="font-mono text-xs text-gray-400">
                                Ordine minimo €{method.minOrder}
                              </p>
                          }
                          </div>
                          <span className="font-mono text-sm font-medium text-gray-900">
                            {method.price === 0 ?
                          'Gratis' :
                          `€${method.price.toFixed(2)}`}
                          </span>
                        </button>);

                  })}
                  </div>
                  <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b flex items-center justify-between">
                    <button
                    onClick={() => handleBack('shipping')}
                    className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                      ← Modifica Indirizzo
                    </button>
                    <button
                    onClick={handleNext}
                    className="font-sans font-semibold text-sm px-6 h-10 bg-accent text-white rounded hover:bg-accent-hover transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                      Continua →
                    </button>
                  </div>
                </div>
              }

              {/* Step 3: Payment */}
              {step === 'payment' &&
              <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t">
                    <span className="font-mono text-xs font-medium text-gray-600">
                      3. Metodo di Pagamento
                    </span>
                  </div>
                  <div className="px-5 py-5 space-y-3">
                    {PAYMENT_METHODS.map((method) => {
                    const isSelected = paymentMethod === method.id;
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 border rounded transition-colors text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${isSelected ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>

                          <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-gray-800' : 'border-gray-300'}`}>

                            {isSelected &&
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                          }
                          </div>
                          <div className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center flex-shrink-0 bg-white">
                            {Icon ?
                          <Icon size={16} className="text-gray-400" /> :

                          <span className="font-mono text-xs text-gray-400">
                                PP
                              </span>
                          }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-medium text-gray-800">
                              {method.name}
                            </p>
                            <p className="font-mono text-xs text-gray-400">
                              {method.description}
                            </p>
                          </div>
                        </button>);

                  })}
                  </div>
                  <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b flex items-center justify-between">
                    <button
                    onClick={() => handleBack('delivery')}
                    className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                      ← Modifica Spedizione
                    </button>
                    <button
                    onClick={handleNext}
                    disabled={!paymentMethod}
                    className="font-sans font-semibold text-sm px-6 h-10 bg-accent text-white rounded hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                      Continua →
                    </button>
                  </div>
                </div>
              }

              {/* Step 4: Review */}
              {step === 'review' &&
              <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t">
                    <span className="font-mono text-xs font-medium text-gray-600">
                      4. Riepilogo Ordine
                    </span>
                  </div>

                  {/* Shipping address */}
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-gray-400 block mb-1">
                          Indirizzo di spedizione
                        </span>
                        <p className="font-sans text-sm text-gray-800">
                          {shipping.firstName} {shipping.lastName}
                        </p>
                        <p className="font-sans text-sm text-gray-600">
                          {shipping.address}
                        </p>
                        <p className="font-sans text-sm text-gray-600">
                          {shipping.postalCode} {shipping.city}, {country.label}
                        </p>
                        <p className="font-mono text-xs text-gray-400 mt-1">
                          {shipping.email}
                          {shipping.phone && ` · ${shipping.phone}`}
                        </p>
                      </div>
                      <button
                      onClick={() => handleBack('shipping')}
                      className="font-mono text-xs text-gray-400 hover:text-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                        Modifica
                      </button>
                    </div>
                  </div>

                  {/* Delivery method */}
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-gray-400 block mb-1">
                          Metodo di spedizione
                        </span>
                        <p className="font-sans text-sm text-gray-800">
                          {selectedDelivery.name}
                        </p>
                        <p className="font-mono text-xs text-gray-400">
                          {selectedDelivery.days} ·{' '}
                          {shippingCost === 0 ?
                        'Gratuita' :
                        `€${shippingCost.toFixed(2)}`}
                        </p>
                      </div>
                      <button
                      onClick={() => handleBack('delivery')}
                      className="font-mono text-xs text-gray-400 hover:text-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                        Modifica
                      </button>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-gray-400 block mb-1">
                          Metodo di pagamento
                        </span>
                        <p className="font-sans text-sm text-gray-800">
                          {selectedPayment?.name}
                        </p>
                        <p className="font-mono text-xs text-gray-400">
                          {selectedPayment?.description}
                        </p>
                      </div>
                      <button
                      onClick={() => handleBack('payment')}
                      className="font-mono text-xs text-gray-400 hover:text-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                        Modifica
                      </button>
                    </div>
                  </div>

                  {/* Items */}
                  <ul className="divide-y divide-gray-100">
                    {items.map((item) =>
                  <li
                    key={item.product.id}
                    className="px-5 py-3 flex items-center gap-3">

                        <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center flex-shrink-0 bg-gray-50 overflow-hidden">
                          {item.product.imageUrl ?
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="w-full h-full object-cover mix-blend-multiply" /> :


                      <span className="font-mono text-xs text-gray-300">
                              IMG
                            </span>
                      }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-gray-800 truncate">
                            {item.product.name}
                          </p>
                          <span className="font-mono text-xs text-gray-400">
                            {item.product.brand} · Qtà: {item.quantity}
                          </span>
                        </div>
                        <span className="font-mono text-sm text-gray-900">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                  )}
                  </ul>

                  <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b flex items-center justify-between">
                    <button
                    onClick={() => handleBack('payment')}
                    className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                      ← Modifica Pagamento
                    </button>
                    <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="font-sans font-semibold text-sm px-6 h-10 bg-accent text-white rounded hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                      {isSubmitting ?
                    <span className="font-mono text-xs">
                          Elaborazione...
                        </span> :

                    <>
                          <ShoppingCartIcon size={16} />
                          Conferma Ordine
                        </>
                    }
                    </button>
                  </div>
                </div>
              }
            </div>

            {/* Right: Order summary sidebar */}
            <div className="lg:col-span-5">
              <div
                className="lg:sticky lg:top-24 bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t flex items-center gap-2">
                  <ShoppingCartIcon size={16} className="text-gray-400" />
                  <span className="font-mono text-xs font-medium text-gray-600">
                    Il tuo ordine · {totalItems} articoli
                  </span>
                </div>

                <ul className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
                  {items.map((item) =>
                  <li
                    key={item.product.id}
                    className="px-4 py-3 flex items-center gap-3">

                      <span className="font-mono text-xs text-gray-400 w-5 text-center flex-shrink-0">
                        {item.quantity}×
                      </span>
                      <span className="font-sans text-xs text-gray-700 flex-1 truncate">
                        {item.product.name}
                      </span>
                      <span className="font-mono text-xs text-gray-700 flex-shrink-0">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  )}
                </ul>

                {/* Coupon code */}
                <div className="px-4 py-3 border-t border-gray-100">
                  {appliedCoupon ?
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TagIcon size={12} className="text-gray-500" />
                        <span className="font-mono text-xs text-gray-700">
                          {appliedCoupon}
                        </span>
                        <span className="font-mono text-xs text-gray-400">
                          ({couponData?.label})
                        </span>
                      </div>
                      <button
                      onClick={handleRemoveCoupon}
                      className="text-gray-400 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full">

                        <XIcon size={14} />
                      </button>
                    </div> :

                  <div className="flex gap-2">
                      <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Codice sconto"
                      className="flex-1 font-mono text-xs border border-gray-300 rounded px-3 h-8 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                      <button
                      onClick={handleApplyCoupon}
                      className="font-mono text-xs px-3 h-8 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                        Applica
                      </button>
                    </div>
                  }
                  {couponError &&
                  <p className="font-mono text-xs text-red-400 mt-1">
                      {couponError}
                    </p>
                  }
                </div>

                {/* Free shipping progress */}
                {amountToFreeShipping > 0 && !appliedCoupon &&
                <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-gray-500">
                        Spedizione gratuita
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        €{amountToFreeShipping.toFixed(2)} mancanti
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                      className="h-full bg-gray-600 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, totalPrice / freeShippingThreshold * 100)}%`
                      }} />

                    </div>
                  </div>
                }

                {/* Totals */}
                <div className="px-4 py-3 border-t border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500">
                      Subtotale
                    </span>
                    <span className="font-mono text-xs text-gray-700">
                      €{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  {percentDiscount > 0 &&
                  <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">
                        Sconto ({couponData?.label})
                      </span>
                      <span className="font-mono text-xs text-gray-700">
                        -€{percentDiscount.toFixed(2)}
                      </span>
                    </div>
                  }
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500">
                      Spedizione
                    </span>
                    <span className="font-mono text-xs text-gray-700">
                      {shippingCost === 0 ?
                      'Gratuita' :
                      `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500">
                      IVA ({vatRate}%)
                    </span>
                    <span className="font-mono text-xs text-gray-700">
                      €{vatAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-gray-200 flex items-center justify-between">
                    <span className="font-sans text-sm font-semibold text-gray-900">
                      Totale
                    </span>
                    <span className="font-mono text-lg font-medium text-gray-900">
                      €{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="border border-dashed border-gray-200 rounded p-3">
                    <span className="font-mono text-xs text-gray-400 block">
                      POST /wp-json/wc/v3/orders
                    </span>
                    <span className="font-mono text-xs text-gray-300">
                      WooCommerce REST API · server action
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>);

}