import React, { useCallback, useEffect, useState } from 'react';
import {
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  RefreshCwIcon,
  ChevronDownIcon,
  ChevronRightIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { SEOHead } from '../components/SEOHead';
import {
  runAllTests,
  clearSuites,
  type TestSuite,
  type TestResult } from
'../tests/testUtils';
// Import all test files to register suites
import '../tests/store.test';
import '../tests/cartReducer.test';
import '../tests/wishlistReducer.test';
import '../tests/api.test';
import '../tests/validation.test';
import '../tests/dataIntegrity.test';
import '../tests/security.test';
import '../tests/infrastructure.test';
import '../tests/uiux.test';
type RunStatus = 'idle' | 'running' | 'complete';
export function TestRunnerPage() {
  const [status, setStatus] = useState<RunStatus>('idle');
  const [suites, setSuites] = useState<TestSuite[]>([]);
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());
  const [runTime, setRunTime] = useState<number>(0);
  const runTests = useCallback(async () => {
    setStatus('running');
    setSuites([]);
    setExpandedSuites(new Set());
    const startTime = performance.now();
    try {
      const results = await runAllTests();
      setSuites(results);
      // Auto-expand failed suites
      const failedSuites = new Set<string>();
      results.forEach((suite) => {
        if (suite.results.some((r) => !r.passed)) {
          failedSuites.add(suite.name);
        }
      });
      setExpandedSuites(failedSuites);
    } catch (error) {
      console.error('Test runner error:', error);
    }
    setRunTime(performance.now() - startTime);
    setStatus('complete');
  }, []);
  const toggleSuite = (suiteName: string) => {
    setExpandedSuites((prev) => {
      const next = new Set(prev);
      if (next.has(suiteName)) {
        next.delete(suiteName);
      } else {
        next.add(suiteName);
      }
      return next;
    });
  };
  const expandAll = () => {
    setExpandedSuites(new Set(suites.map((s) => s.name)));
  };
  const collapseAll = () => {
    setExpandedSuites(new Set());
  };
  // Calculate stats
  const totalTests = suites.reduce((sum, s) => sum + s.results.length, 0);
  const passedTests = suites.reduce(
    (sum, s) => sum + s.results.filter((r) => r.passed).length,
    0
  );
  const failedTests = totalTests - passedTests;
  const passRate =
  totalTests > 0 ? Math.round(passedTests / totalTests * 100) : 0;
  return (
    <Layout>
      <SEOHead title="Test Runner" noIndex />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1">
              Test Runner
            </h1>
            <p className="font-mono text-xs text-gray-400">
              /tests · ISTEROIDI E-Shop Test Suite
            </p>
          </div>

          {/* Controls */}
          <div
            className="bg-white border border-gray-200 rounded mb-6"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <div className="px-5 py-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={runTests}
                  disabled={status === 'running'}
                  className="flex items-center gap-2 font-sans font-semibold text-sm px-5 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">

                  {status === 'running' ?
                  <>
                      <RefreshCwIcon
                      size={14}
                      className="animate-spin"
                      aria-hidden="true" />

                      Esecuzione...
                    </> :

                  <>
                      <PlayIcon size={14} aria-hidden="true" />
                      Esegui Test
                    </>
                  }
                </button>

                {status === 'complete' && suites.length > 0 &&
                <div className="flex items-center gap-2">
                    <button
                    onClick={expandAll}
                    className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors">

                      Espandi tutto
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                    onClick={collapseAll}
                    className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors">

                      Comprimi tutto
                    </button>
                  </div>
                }
              </div>

              {status === 'complete' &&
              <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <ClockIcon size={12} className="text-gray-400" />
                    <span className="font-mono text-xs text-gray-500">
                      {runTime.toFixed(0)}ms
                    </span>
                  </div>
                </div>
              }
            </div>
          </div>

          {/* Stats */}
          {status === 'complete' &&
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div
              className="bg-white border border-gray-200 rounded p-4"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
              }}>

                <span className="font-mono text-xs text-gray-400 block mb-1">
                  Suite
                </span>
                <span className="font-sans text-2xl font-bold text-gray-900">
                  {suites.length}
                </span>
              </div>
              <div
              className="bg-white border border-gray-200 rounded p-4"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
              }}>

                <span className="font-mono text-xs text-gray-400 block mb-1">
                  Test Totali
                </span>
                <span className="font-sans text-2xl font-bold text-gray-900">
                  {totalTests}
                </span>
              </div>
              <div
              className="bg-white border border-gray-200 rounded p-4"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
              }}>

                <span className="font-mono text-xs text-gray-400 block mb-1">
                  Passati
                </span>
                <span className="font-sans text-2xl font-bold text-green-600">
                  {passedTests}
                </span>
              </div>
              <div
              className="bg-white border border-gray-200 rounded p-4"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
              }}>

                <span className="font-mono text-xs text-gray-400 block mb-1">
                  Falliti
                </span>
                <span
                className={`font-sans text-2xl font-bold ${failedTests > 0 ? 'text-red-600' : 'text-gray-400'}`}>

                  {failedTests}
                </span>
              </div>
            </div>
          }

          {/* Progress bar */}
          {status === 'complete' && totalTests > 0 &&
          <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-gray-500">
                  Pass Rate
                </span>
                <span
                className={`font-mono text-xs font-medium ${passRate === 100 ? 'text-green-600' : passRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>

                  {passRate}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                className={`h-full transition-all duration-500 ${passRate === 100 ? 'bg-green-500' : passRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{
                  width: `${passRate}%`
                }} />

              </div>
            </div>
          }

          {/* Idle state */}
          {status === 'idle' &&
          <div className="border border-dashed border-gray-300 rounded py-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-4">
                <PlayIcon size={24} className="text-gray-300" />
              </div>
              <p className="font-sans text-sm text-gray-500 mb-2">
                Clicca "Esegui Test" per avviare la suite di test
              </p>
              <p className="font-mono text-xs text-gray-400">
                9 suite · ~230 test · UI/UX, Security, Infrastructure, Store,
                Cart, Wishlist, API, Validation, Data Integrity
              </p>
            </div>
          }

          {/* Running state */}
          {status === 'running' &&
          <div className="border border-dashed border-gray-300 rounded py-20 flex flex-col items-center justify-center">
              <RefreshCwIcon
              size={32}
              className="text-gray-400 animate-spin mb-4" />

              <p className="font-sans text-sm text-gray-500">
                Esecuzione test in corso...
              </p>
            </div>
          }

          {/* Results */}
          {status === 'complete' && suites.length > 0 &&
          <div className="space-y-4">
              {suites.map((suite) => {
              const passed = suite.results.filter((r) => r.passed).length;
              const failed = suite.results.length - passed;
              const isExpanded = expandedSuites.has(suite.name);
              const allPassed = failed === 0;
              return (
                <div
                  key={suite.name}
                  className="bg-white border border-gray-200 rounded overflow-hidden"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}>

                    {/* Suite header */}
                    <button
                    onClick={() => toggleSuite(suite.name)}
                    className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">

                      <div className="flex items-center gap-3">
                        {isExpanded ?
                      <ChevronDownIcon
                        size={16}
                        className="text-gray-400" /> :


                      <ChevronRightIcon
                        size={16}
                        className="text-gray-400" />

                      }
                        {allPassed ?
                      <CheckCircleIcon
                        size={16}
                        className="text-green-500" /> :


                      <XCircleIcon size={16} className="text-red-500" />
                      }
                        <span className="font-sans text-sm font-medium text-gray-800">
                          {suite.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-gray-400">
                          {suite.totalDuration.toFixed(0)}ms
                        </span>
                        <span
                        className={`font-mono text-xs ${allPassed ? 'text-green-600' : 'text-red-600'}`}>

                          {passed}/{suite.results.length}
                        </span>
                      </div>
                    </button>

                    {/* Test results */}
                    {isExpanded &&
                  <div className="border-t border-gray-100">
                        {suite.results.map((result, idx) =>
                    <div
                      key={idx}
                      className={`px-5 py-2.5 flex items-start gap-3 ${idx > 0 ? 'border-t border-gray-50' : ''}`}>

                            <div className="mt-0.5">
                              {result.passed ?
                        <CheckCircleIcon
                          size={14}
                          className="text-green-500" /> :


                        <XCircleIcon
                          size={14}
                          className="text-red-500" />

                        }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                          className={`font-sans text-sm ${result.passed ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>

                                {result.name}
                              </p>
                              {result.error &&
                        <p className="font-mono text-xs text-red-500 mt-1 break-all">
                                  {result.error}
                                </p>
                        }
                            </div>
                            <span className="font-mono text-xs text-gray-400 flex-shrink-0">
                              {result.duration.toFixed(1)}ms
                            </span>
                          </div>
                    )}
                      </div>
                  }
                  </div>);

            })}
            </div>
          }

          {/* Technical info */}
          <div className="mt-8 border border-dashed border-gray-200 rounded p-4">
            <span className="font-mono text-xs text-gray-400 block mb-2">
              Test Framework Info
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="font-mono text-xs text-gray-300 block">
                  Framework
                </span>
                <span className="font-mono text-xs text-gray-500">
                  Custom (sync/async)
                </span>
              </div>
              <div>
                <span className="font-mono text-xs text-gray-300 block">
                  Assertions
                </span>
                <span className="font-mono text-xs text-gray-500">
                  expect() API
                </span>
              </div>
              <div>
                <span className="font-mono text-xs text-gray-300 block">
                  Coverage
                </span>
                <span className="font-mono text-xs text-gray-500">
                  Store, Cart, Wishlist, API, Validation, Data Integrity,
                  Security, Infrastructure
                </span>
              </div>
              <div>
                <span className="font-mono text-xs text-gray-300 block">
                  Route
                </span>
                <span className="font-mono text-xs text-gray-500">/tests</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>);

}