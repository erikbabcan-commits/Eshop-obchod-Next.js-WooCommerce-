import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookieIcon, FileTextIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
export function CookiePolicyPage() {
  const navigate = useNavigate();
  const lastUpdated = '15 Gennaio 2025';
  return (
    <Layout>
      <SEOHead title="Cookie Policy" canonical="/cookie-policy" />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <Breadcrumb
            items={[
            {
              label: 'cookie policy'
            }]
            } />


          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center">
                <CookieIcon
                  size={18}
                  className="text-gray-400"
                  aria-hidden="true" />

              </div>
              <div>
                <h1 className="font-sans text-3xl font-bold text-gray-900">
                  Cookie Policy
                </h1>
                <p className="font-mono text-xs text-gray-400">
                  /cookie-policy · Ultimo aggiornamento: {lastUpdated}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white border border-gray-200 rounded"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileTextIcon
                  size={13}
                  className="text-gray-400"
                  aria-hidden="true" />

                <span className="font-mono text-xs text-gray-500 font-medium">
                  Informativa sui Cookie — Direttiva ePrivacy
                </span>
              </div>
              <span className="font-mono text-xs text-gray-300">
                Art. 122 D.Lgs. 196/2003
              </span>
            </div>

            <div className="px-6 py-6 max-w-3xl space-y-6">
              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  1. Cosa sono i Cookie
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  I cookie sono piccoli file di testo che vengono memorizzati
                  sul dispositivo dell'utente quando visita un sito web. Servono
                  a migliorare l'esperienza di navigazione, ricordare le
                  preferenze e raccogliere informazioni statistiche.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  2. Tipologie di Cookie Utilizzati
                </h2>

                <div className="space-y-4">
                  <div className="border border-dashed border-gray-200 rounded p-4">
                    <h3 className="font-sans text-sm font-semibold text-gray-800 mb-2">
                      Cookie Tecnici (Essenziali)
                    </h3>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      Necessari per il funzionamento del sito. Includono cookie
                      di sessione, carrello, autenticazione. Non richiedono
                      consenso.
                    </p>
                  </div>

                  <div className="border border-dashed border-gray-200 rounded p-4">
                    <h3 className="font-sans text-sm font-semibold text-gray-800 mb-2">
                      Cookie Analitici
                    </h3>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      Utilizzati per raccogliere informazioni aggregate
                      sull'utilizzo del sito (es. Google Analytics). Aiutano a
                      migliorare i servizi.
                    </p>
                  </div>

                  <div className="border border-dashed border-gray-200 rounded p-4">
                    <h3 className="font-sans text-sm font-semibold text-gray-800 mb-2">
                      Cookie di Profilazione
                    </h3>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      Utilizzati per creare profili utente e mostrare pubblicità
                      personalizzata. Richiedono il consenso esplicito
                      dell'utente.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  3. Cookie di Terze Parti
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">
                  Il sito utilizza i seguenti servizi di terze parti che
                  potrebbero installare cookie:
                </p>
                <ul className="list-disc list-inside font-sans text-sm text-gray-600 space-y-1.5 ml-2">
                  <li>Google Analytics (analisi traffico)</li>
                  <li>Stripe/PayPal (elaborazione pagamenti)</li>
                  <li>Facebook Pixel (remarketing)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  4. Gestione dei Cookie
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  L'utente può gestire le preferenze sui cookie attraverso il
                  banner mostrato al primo accesso al sito, oppure modificando
                  le impostazioni del proprio browser. La disabilitazione dei
                  cookie tecnici potrebbe compromettere alcune funzionalità del
                  sito.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  5. Durata dei Cookie
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  I cookie di sessione vengono eliminati alla chiusura del
                  browser. I cookie persistenti hanno una durata variabile da 30
                  giorni a 2 anni a seconda della tipologia e della finalità.
                </p>
              </section>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b">
              <p className="font-mono text-xs text-gray-400">
                Documento aggiornato il {lastUpdated} · Versione 2.0
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>);

}