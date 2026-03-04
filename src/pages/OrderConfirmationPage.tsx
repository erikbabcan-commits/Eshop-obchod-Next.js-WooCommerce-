import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  PackageIcon,
  TruckIcon,
  MailIcon,
  HomeIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { CubeLogo } from '../components/CubeLogo';
function generateOrderNumber(): string {
  const prefix = 'IST';
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${year}-${random}`;
}
const ORDER_NUMBER = generateOrderNumber();
export function OrderConfirmationPage() {
  const navigate = useNavigate();
  return (
    <Layout>
      <SEOHead title="Ordine Confermato" noIndex />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <Breadcrumb
            items={[
            {
              label: 'checkout',
              onClick: () => navigate('/checkout')
            },
            {
              label: 'conferma ordine'
            }]
            } />


          {/* Success Banner */}
          <div
            className="mt-6 bg-white border border-gray-200 rounded p-8 text-center relative overflow-hidden cubes-overlay-light"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <div className="relative z-10">
              <div className="flex justify-center mb-5">
                <CubeLogo size={56} className="text-primary" />
              </div>
              <h1 className="font-sans text-2xl font-bold text-gray-900 mb-2">
                Ordine Confermato!
              </h1>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mb-4">
                Il tuo ordine è stato ricevuto e sarà elaborato entro 24 ore.
                Riceverai una email di conferma con i dettagli e il numero di
                tracciamento.
              </p>
              <div className="inline-block border border-dashed border-gray-300 rounded px-4 py-2">
                <span className="font-mono text-xs text-gray-400 mr-2">
                  Numero ordine:
                </span>
                <span className="font-mono text-sm font-bold text-gray-800">
                  {ORDER_NUMBER}
                </span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div
            className="mt-6 bg-white border border-gray-200 rounded p-6"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <h2 className="font-mono text-xs font-medium text-gray-500 uppercase tracking-widest mb-6">
              Stato Ordine
            </h2>
            <div className="space-y-0">
              {/* Step 1 - active */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-800 border border-gray-800 rounded flex items-center justify-center">
                    <CheckCircleIcon
                      className="w-4 h-4 text-white"
                      aria-hidden="true" />

                  </div>
                  <div className="w-px h-8 my-1 border-l border-dashed border-gray-300" />
                </div>
                <div className="pb-6">
                  <p className="font-sans text-sm font-semibold text-gray-900">
                    Ordine ricevuto
                  </p>
                  <p className="font-mono text-xs text-gray-400 mt-0.5">
                    {new Date().toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Step 2 - pending */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                    <PackageIcon
                      className="w-4 h-4 text-gray-400"
                      aria-hidden="true" />

                  </div>
                  <div className="w-px h-8 my-1 border-l border-dashed border-gray-300" />
                </div>
                <div className="pb-6">
                  <p className="font-sans text-sm font-semibold text-gray-400">
                    Preparazione spedizione
                  </p>
                  <p className="font-mono text-xs text-gray-400 mt-0.5">
                    In attesa di elaborazione
                  </p>
                </div>
              </div>

              {/* Step 3 - pending */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                    <TruckIcon
                      className="w-4 h-4 text-gray-400"
                      aria-hidden="true" />

                  </div>
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-gray-400">
                    Spedito
                  </p>
                  <p className="font-mono text-xs text-gray-400 mt-0.5">
                    Consegna stimata: 2–4 giorni lavorativi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Notice */}
          <div
            className="mt-6 bg-white border border-gray-200 rounded p-5 flex items-start gap-4"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <MailIcon
              className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400"
              aria-hidden="true" />

            <div>
              <p className="font-sans text-sm font-semibold text-gray-800 mb-1">
                Conferma via Email
              </p>
              <p className="font-mono text-xs text-gray-500">
                Abbiamo inviato una conferma d'ordine al tuo indirizzo email con
                tutti i dettagli e il numero di tracciamento della spedizione.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-sans font-semibold text-sm rounded hover:bg-accent-hover transition-colors">

              <HomeIcon className="w-4 h-4" aria-hidden="true" />
              Torna alla Home
            </button>
            <button
              onClick={() => navigate('/category/anabolizzanti')}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 font-mono text-xs text-gray-600 rounded hover:border-gray-500 hover:text-gray-800 transition-colors">

              Continua lo Shopping
            </button>
          </div>
        </div>
      </main>
    </Layout>);

}