import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircleIcon, UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../components/SEOHead';
import { CubeLogo } from '../components/CubeLogo';
export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }
    if (formData.password.length < 6) {
      setError('La password deve contenere almeno 6 caratteri');
      return;
    }
    setIsLoading(true);
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      navigate('/account');
    } catch (err) {
      setError('Errore durante la registrazione. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <SEOHead title="Registrazione" canonical="/register" />
      <main
        className="min-h-screen w-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 w-full">
          <Breadcrumb
            items={[
            {
              label: 'registrazione'
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
                Crea Account
              </h1>
              <p className="font-mono text-sm text-gray-500">
                Registrati per velocizzare il checkout e tracciare gli ordini.
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="font-mono text-xs text-gray-500 block mb-1.5">

                      Nome
                    </label>
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={14} />

                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:border-gray-500"
                        required />

                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="font-mono text-xs text-gray-500 block mb-1.5">

                      Cognome
                    </label>
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={14} />

                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:border-gray-500"
                        required />

                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-xs text-gray-500 block mb-1.5">

                    Email
                  </label>
                  <div className="relative">
                    <MailIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={14} />

                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:border-gray-500"
                      required />

                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="font-mono text-xs text-gray-500 block mb-1.5">

                    Password
                  </label>
                  <div className="relative">
                    <LockIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={14} />

                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:border-gray-500"
                      required />

                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="font-mono text-xs text-gray-500 block mb-1.5">

                    Conferma Password
                  </label>
                  <div className="relative">
                    <LockIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={14} />

                    <input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:border-gray-500"
                      required />

                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-sans font-semibold text-sm py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors disabled:opacity-70">

                    {isLoading ? 'Creazione in corso...' : 'Crea Account'}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-dashed border-gray-200 text-center">
                <p className="font-sans text-sm text-gray-600">
                  Hai già un account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-gray-900 hover:underline">

                    Accedi
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>);

}