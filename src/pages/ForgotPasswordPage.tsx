import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MailIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { CubeLogo } from '../components/CubeLogo';
export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };
  return (
    <Layout>
      <SEOHead title="Recupera Password" canonical="/forgot-password" />
      <main
        className="min-h-screen w-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 w-full">
          <Breadcrumb
            items={[
            {
              label: 'login',
              onClick: () => navigate('/login')
            },
            {
              label: 'recupera password'
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
                Recupera Password
              </h1>
              <p className="font-mono text-sm text-gray-500">
                Inserisci la tua email per ricevere le istruzioni di reset.
              </p>
            </div>

            <div
              className="bg-white border border-gray-200 rounded p-6 sm:p-8"
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>

              {isSubmitted ?
              <div className="text-center py-4">
                  <div className="w-16 h-16 border-2 border-gray-800 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircleIcon
                    size={28}
                    className="text-gray-800"
                    aria-hidden="true" />

                  </div>
                  <h2 className="font-sans text-xl font-bold text-gray-900 mb-2">
                    Email Inviata!
                  </h2>
                  <p className="font-sans text-sm text-gray-600 mb-6">
                    Se l'indirizzo <span className="font-medium">{email}</span>{' '}
                    è registrato, riceverai un'email con le istruzioni per
                    reimpostare la password.
                  </p>
                  <div className="border border-dashed border-gray-200 rounded p-3 mb-6">
                    <p className="font-mono text-xs text-gray-400">
                      Controlla anche la cartella spam se non vedi l'email entro
                      qualche minuto.
                    </p>
                  </div>
                  <button
                  onClick={() => navigate('/login')}
                  className="font-sans font-semibold text-sm px-5 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                    Torna al Login
                  </button>
                </div> :

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

                  <div className="pt-2">
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-sans font-semibold text-sm py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors disabled:opacity-70 flex items-center justify-center">

                      {isLoading ? 'Invio in corso...' : 'Invia Istruzioni'}
                    </button>
                  </div>
                </form>
              }

              {!isSubmitted &&
              <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                  <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors">

                    <ArrowLeftIcon size={12} aria-hidden="true" />
                    Torna al Login
                  </Link>
                </div>
              }
            </div>

            <div className="mt-6 text-center">
              <span className="font-mono text-xs px-2 py-1 border border-dashed border-gray-300 text-gray-400 rounded bg-white">
                POST /api/auth/forgot-password
              </span>
            </div>
          </div>
        </div>
      </main>
    </Layout>);

}