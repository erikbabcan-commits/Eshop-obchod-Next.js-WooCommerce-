import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircleIcon, LockIcon, MailIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { CubeLogo } from '../components/CubeLogo';
export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Inserisci email e password');
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/account');
    } catch (err) {
      setError('Credenziali non valide. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <SEOHead title="Accedi" canonical="/login" />
      <main
        className="min-h-screen w-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 w-full">
          <Breadcrumb
            items={[
            {
              label: 'login'
            }]
            } />

        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <CubeLogo size={48} className="text-primary" />
              </div>
              <h1 className="font-sans text-3xl font-bold text-gray-900 mb-2">
                Accedi
              </h1>
              <p className="font-mono text-sm text-gray-500">
                Bentornato. Accedi per gestire i tuoi ordini.
              </p>
            </div>

            <div
              className="bg-white border border-gray-200 rounded p-6 sm:p-8"
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>

              {error &&
              <div className="mb-6 p-3 border border-red-200 bg-red-50 rounded flex items-start gap-2 text-red-600">
                  <AlertCircleIcon size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="font-sans text-sm">{error}</span>
                </div>
              }

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-xs text-gray-500 block mb-1.5">

                    Email
                  </label>
                  <div className="relative">
                    <MailIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16} />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full font-sans text-sm border border-gray-300 rounded pl-10 pr-3 py-2.5 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
                      placeholder="mario@esempio.it"
                      required />

                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="font-mono text-xs text-gray-500">

                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="font-mono text-xs text-gray-400 hover:text-gray-700 underline">

                      Password dimenticata?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16} />

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full font-sans text-sm border border-gray-300 rounded pl-10 pr-3 py-2.5 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
                      placeholder="••••••••"
                      required />

                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-sans font-semibold text-sm py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors disabled:opacity-70 flex items-center justify-center">

                    {isLoading ? 'Accesso in corso...' : 'Accedi'}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-dashed border-gray-200 text-center">
                <p className="font-sans text-sm text-gray-600">
                  Non hai un account?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-gray-900 hover:underline">

                    Registrati
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="font-mono text-xs px-2 py-1 border border-dashed border-gray-300 text-gray-400 rounded bg-white">
                POST /api/auth/login
              </span>
            </div>
          </div>
        </div>
      </main>
    </Layout>);

}