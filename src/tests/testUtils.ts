// Simple Test Framework for ISTEROIDI E-Shop
// Supports sync and async tests with timing and error capture

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  duration: number;
}

export interface TestSuite {
  name: string;
  results: TestResult[];
  totalDuration: number;
}

export type TestFn = () => void | Promise<void>;

interface TestCase {
  name: string;
  fn: TestFn;
}

interface SuiteDefinition {
  name: string;
  tests: TestCase[];
  beforeEach?: () => void | Promise<void>;
  afterEach?: () => void | Promise<void>;
}

// Global state for collecting tests
let currentSuite: SuiteDefinition | null = null;
const suites: SuiteDefinition[] = [];

// ── Test Definition Functions ─────────────────────────────

export function describe(name: string, fn: () => void): void {
  currentSuite = { name, tests: [] };
  fn();
  suites.push(currentSuite);
  currentSuite = null;
}

export function it(name: string, fn: TestFn): void {
  if (!currentSuite) {
    throw new Error('it() must be called inside describe()');
  }
  currentSuite.tests.push({ name, fn });
}

export function beforeEach(fn: () => void | Promise<void>): void {
  if (!currentSuite) {
    throw new Error('beforeEach() must be called inside describe()');
  }
  currentSuite.beforeEach = fn;
}

export function afterEach(fn: () => void | Promise<void>): void {
  if (!currentSuite) {
    throw new Error('afterEach() must be called inside describe()');
  }
  currentSuite.afterEach = fn;
}

// ── Assertion Helpers ─────────────────────────────────────

export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export const expect = <T,>(actual: T) => ({
  toBe(expected: T): void {
    if (actual !== expected) {
      throw new AssertionError(
        `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`
      );
    }
  },

  toEqual(expected: T): void {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new AssertionError(`Expected ${expectedStr}, but got ${actualStr}`);
    }
  },

  toBeTruthy(): void {
    if (!actual) {
      throw new AssertionError(
        `Expected truthy value, but got ${JSON.stringify(actual)}`
      );
    }
  },

  toBeFalsy(): void {
    if (actual) {
      throw new AssertionError(
        `Expected falsy value, but got ${JSON.stringify(actual)}`
      );
    }
  },

  toBeNull(): void {
    if (actual !== null) {
      throw new AssertionError(
        `Expected null, but got ${JSON.stringify(actual)}`
      );
    }
  },

  toBeUndefined(): void {
    if (actual !== undefined) {
      throw new AssertionError(
        `Expected undefined, but got ${JSON.stringify(actual)}`
      );
    }
  },

  toBeDefined(): void {
    if (actual === undefined) {
      throw new AssertionError(
        'Expected value to be defined, but got undefined'
      );
    }
  },

  toBeGreaterThan(expected: number): void {
    if (typeof actual !== 'number' || actual <= expected) {
      throw new AssertionError(
        `Expected ${actual} to be greater than ${expected}`
      );
    }
  },

  toBeGreaterThanOrEqual(expected: number): void {
    if (typeof actual !== 'number' || actual < expected) {
      throw new AssertionError(
        `Expected ${actual} to be greater than or equal to ${expected}`
      );
    }
  },

  toBeLessThan(expected: number): void {
    if (typeof actual !== 'number' || actual >= expected) {
      throw new AssertionError(`Expected ${actual} to be less than ${expected}`);
    }
  },

  toContain(expected: unknown): void {
    if (Array.isArray(actual)) {
      if (!actual.includes(expected)) {
        throw new AssertionError(
          `Expected array to contain ${JSON.stringify(expected)}`
        );
      }
    } else if (typeof actual === 'string') {
      if (!actual.includes(expected as string)) {
        throw new AssertionError(`Expected string to contain "${expected}"`);
      }
    } else {
      throw new AssertionError('toContain() requires an array or string');
    }
  },

  toHaveLength(expected: number): void {
    const length = (actual as unknown as {length: number;})?.length;
    if (length !== expected) {
      throw new AssertionError(`Expected length ${expected}, but got ${length}`);
    }
  },

  toThrow(expectedMessage?: string): void {
    if (typeof actual !== 'function') {
      throw new AssertionError('toThrow() requires a function');
    }
    let threw = false;
    let thrownError: Error | null = null;
    try {
      ;(actual as () => void)();
    } catch (e) {
      threw = true;
      thrownError = e as Error;
    }
    if (!threw) {
      throw new AssertionError('Expected function to throw, but it did not');
    }
    if (expectedMessage && thrownError?.message !== expectedMessage) {
      throw new AssertionError(
        `Expected error message "${expectedMessage}", but got "${thrownError?.message}"`
      );
    }
  },

  toMatch(pattern: RegExp): void {
    if (typeof actual !== 'string') {
      throw new AssertionError('toMatch() requires a string');
    }
    if (!pattern.test(actual)) {
      throw new AssertionError(`Expected "${actual}" to match ${pattern}`);
    }
  },

  toBeInstanceOf(expected: new (...args: unknown[]) => unknown): void {
    if (!(actual instanceof expected)) {
      throw new AssertionError(
        `Expected value to be instance of ${expected.name}`
      );
    }
  }
});

// ── Test Runner ───────────────────────────────────────────

export async function runAllTests(): Promise<TestSuite[]> {
  const results: TestSuite[] = [];

  for (const suite of suites) {
    const suiteResults: TestResult[] = [];
    const suiteStart = performance.now();

    for (const test of suite.tests) {
      const testStart = performance.now();
      let passed = true;
      let error: string | undefined;

      try {
        if (suite.beforeEach) {
          await suite.beforeEach();
        }
        await test.fn();
        if (suite.afterEach) {
          await suite.afterEach();
        }
      } catch (e) {
        passed = false;
        error = e instanceof Error ? e.message : String(e);
      }

      const duration = performance.now() - testStart;

      suiteResults.push({
        name: test.name,
        passed,
        error,
        duration
      });
    }

    const totalDuration = performance.now() - suiteStart;

    results.push({
      name: suite.name,
      results: suiteResults,
      totalDuration
    });
  }

  return results;
}

export function clearSuites(): void {
  suites.length = 0;
}

export function getSuiteCount(): number {
  return suites.length;
}

export function getTestCount(): number {
  return suites.reduce((sum, suite) => sum + suite.tests.length, 0);
}