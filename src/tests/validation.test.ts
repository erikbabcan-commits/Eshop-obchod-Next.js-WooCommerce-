import { describe, it, expect } from './testUtils';

// Checkout form validation (mirrors CheckoutPage logic)
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
  paymentMethod: string;
}

interface FormErrors {
  [key: string]: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'Campo obbligatorio';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Campo obbligatorio';
  }

  if (!data.email.trim()) {
    errors.email = 'Campo obbligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email non valida';
  }

  if (!data.address.trim()) {
    errors.address = 'Campo obbligatorio';
  }

  if (!data.city.trim()) {
    errors.city = 'Campo obbligatorio';
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = 'Campo obbligatorio';
  } else if (!/^\d{4,6}$/.test(data.postalCode.replace(/\s/g, ''))) {
    errors.postalCode = 'CAP non valido';
  }

  return errors;
}

const validFormData: FormData = {
  firstName: 'Mario',
  lastName: 'Rossi',
  email: 'mario@example.it',
  phone: '+39 333 1234567',
  address: 'Via Roma 1',
  city: 'Roma',
  postalCode: '00100',
  country: 'IT',
  notes: '',
  paymentMethod: 'card'
};

describe('Checkout Validation — Required Fields', () => {
  it('should pass with valid data', () => {
    const errors = validateForm(validFormData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('should fail when firstName is empty', () => {
    const errors = validateForm({ ...validFormData, firstName: '' });
    expect(errors.firstName).toBe('Campo obbligatorio');
  });

  it('should fail when firstName is only whitespace', () => {
    const errors = validateForm({ ...validFormData, firstName: '   ' });
    expect(errors.firstName).toBe('Campo obbligatorio');
  });

  it('should fail when lastName is empty', () => {
    const errors = validateForm({ ...validFormData, lastName: '' });
    expect(errors.lastName).toBe('Campo obbligatorio');
  });

  it('should fail when address is empty', () => {
    const errors = validateForm({ ...validFormData, address: '' });
    expect(errors.address).toBe('Campo obbligatorio');
  });

  it('should fail when city is empty', () => {
    const errors = validateForm({ ...validFormData, city: '' });
    expect(errors.city).toBe('Campo obbligatorio');
  });
});

describe('Checkout Validation — Email', () => {
  it('should fail when email is empty', () => {
    const errors = validateForm({ ...validFormData, email: '' });
    expect(errors.email).toBe('Campo obbligatorio');
  });

  it('should fail for invalid email format', () => {
    const invalidEmails = [
    'notanemail',
    'missing@domain',
    '@nodomain.com',
    'spaces in@email.com',
    'double@@at.com'];

    invalidEmails.forEach((email) => {
      const errors = validateForm({ ...validFormData, email });
      expect(errors.email).toBe('Email non valida');
    });
  });

  it('should pass for valid email formats', () => {
    const validEmails = [
    'simple@example.com',
    'user.name@domain.it',
    'user+tag@example.org',
    'user123@sub.domain.com'];

    validEmails.forEach((email) => {
      const errors = validateForm({ ...validFormData, email });
      expect(errors.email).toBeUndefined();
    });
  });
});

describe('Checkout Validation — Postal Code (CAP)', () => {
  it('should fail when postalCode is empty', () => {
    const errors = validateForm({ ...validFormData, postalCode: '' });
    expect(errors.postalCode).toBe('Campo obbligatorio');
  });

  it('should fail for invalid postal code formats', () => {
    const invalidCodes = ['123', '1234567', 'ABCDE', '12-34', '12 34 56'];
    invalidCodes.forEach((postalCode) => {
      const errors = validateForm({ ...validFormData, postalCode });
      expect(errors.postalCode).toBe('CAP non valido');
    });
  });

  it('should pass for valid postal codes (4-6 digits)', () => {
    const validCodes = ['1234', '12345', '123456', '00100', '20121'];
    validCodes.forEach((postalCode) => {
      const errors = validateForm({ ...validFormData, postalCode });
      expect(errors.postalCode).toBeUndefined();
    });
  });

  it('should handle postal codes with spaces', () => {
    // Spaces are stripped before validation
    const errors = validateForm({ ...validFormData, postalCode: '00 100' });
    expect(errors.postalCode).toBeUndefined();
  });
});

describe('Checkout Validation — Multiple Errors', () => {
  it('should return all errors for completely empty form', () => {
    const emptyForm: FormData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'IT',
      notes: '',
      paymentMethod: ''
    };
    const errors = validateForm(emptyForm);
    expect(errors.firstName).toBeTruthy();
    expect(errors.lastName).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.address).toBeTruthy();
    expect(errors.city).toBeTruthy();
    expect(errors.postalCode).toBeTruthy();
  });

  it('should return multiple specific errors', () => {
    const partialForm: FormData = {
      firstName: 'Mario',
      lastName: '',
      email: 'invalid-email',
      phone: '',
      address: 'Via Roma 1',
      city: '',
      postalCode: 'ABC',
      country: 'IT',
      notes: '',
      paymentMethod: ''
    };
    const errors = validateForm(partialForm);
    expect(errors.firstName).toBeUndefined();
    expect(errors.lastName).toBe('Campo obbligatorio');
    expect(errors.email).toBe('Email non valida');
    expect(errors.address).toBeUndefined();
    expect(errors.city).toBe('Campo obbligatorio');
    expect(errors.postalCode).toBe('CAP non valido');
  });
});

describe('Checkout Validation — Optional Fields', () => {
  it('should not validate phone (optional)', () => {
    const errors = validateForm({ ...validFormData, phone: '' });
    expect(errors.phone).toBeUndefined();
  });

  it('should not validate notes (optional)', () => {
    const errors = validateForm({ ...validFormData, notes: '' });
    expect(errors.notes).toBeUndefined();
  });

  it('should not validate paymentMethod in address step', () => {
    const errors = validateForm({ ...validFormData, paymentMethod: '' });
    expect(errors.paymentMethod).toBeUndefined();
  });
});