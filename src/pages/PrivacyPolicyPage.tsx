import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldIcon, FileTextIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
export function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const lastUpdated = '15 Gennaio 2025';
  return (
    <Layout>
      <SEOHead title="Privacy Policy" canonical="/privacy" />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <Breadcrumb
            items={[
            {
              label: 'privacy policy'
            }]
            } />


          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center">
                <ShieldIcon
                  size={18}
                  className="text-gray-400"
                  aria-hidden="true" />

              </div>
              <div>
                <h1 className="font-sans text-3xl font-bold text-gray-900">
                  Privacy Policy
                </h1>
                <p className="font-mono text-xs text-gray-400">
                  /privacy · Ultimo aggiornamento: {lastUpdated}
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
                  Informativa sulla Privacy — GDPR compliant
                </span>
              </div>
              <span className="font-mono text-xs text-gray-300">
                Art. 13 Reg. UE 2016/679
              </span>
            </div>

            <div className="px-6 py-6 max-w-3xl space-y-6">
              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  1. Titolare del Trattamento
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Il Titolare del trattamento dei dati personali è ISTEROIDI
                  S.r.l., con sede legale in Via Roma 123, 00100 Roma (RM),
                  Italia. Email: privacy@isteroidi.it
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  2. Tipologie di Dati Raccolti
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">
                  I dati personali raccolti includono:
                </p>
                <ul className="list-disc list-inside font-sans text-sm text-gray-600 space-y-1.5 ml-2">
                  <li>Dati identificativi (nome, cognome, indirizzo email)</li>
                  <li>
                    Dati di contatto (numero di telefono, indirizzo di
                    spedizione)
                  </li>
                  <li>
                    Dati di navigazione (indirizzo IP, browser, pagine visitate)
                  </li>
                  <li>
                    Dati di acquisto (storico ordini, metodi di pagamento)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  3. Finalità del Trattamento
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">
                  I dati personali sono trattati per le seguenti finalità:
                </p>
                <ul className="list-disc list-inside font-sans text-sm text-gray-600 space-y-1.5 ml-2">
                  <li>Gestione degli ordini e delle spedizioni</li>
                  <li>Creazione e gestione dell'account utente</li>
                  <li>Invio di comunicazioni commerciali (previo consenso)</li>
                  <li>Adempimento di obblighi legali e fiscali</li>
                  <li>Miglioramento dei servizi e analisi statistiche</li>
                </ul>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  4. Base Giuridica del Trattamento
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Il trattamento dei dati personali si basa su: esecuzione di un
                  contratto (per gli ordini), consenso dell'interessato (per
                  marketing), adempimento di obblighi legali, legittimo
                  interesse del titolare (per sicurezza e miglioramento
                  servizi).
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  5. Conservazione dei Dati
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  I dati personali sono conservati per il tempo necessario al
                  raggiungimento delle finalità per cui sono stati raccolti. I
                  dati relativi agli ordini sono conservati per 10 anni per
                  obblighi fiscali. I dati di marketing sono conservati fino
                  alla revoca del consenso.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  6. Diritti dell'Interessato
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">
                  Ai sensi degli artt. 15-22 del GDPR, l'interessato ha diritto
                  di:
                </p>
                <ul className="list-disc list-inside font-sans text-sm text-gray-600 space-y-1.5 ml-2">
                  <li>Accedere ai propri dati personali</li>
                  <li>Ottenere la rettifica o la cancellazione dei dati</li>
                  <li>Limitare il trattamento</li>
                  <li>Opporsi al trattamento</li>
                  <li>Richiedere la portabilità dei dati</li>
                  <li>Revocare il consenso in qualsiasi momento</li>
                </ul>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  7. Contatti
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Per esercitare i propri diritti o per qualsiasi informazione
                  relativa al trattamento dei dati personali, è possibile
                  contattare il Titolare all'indirizzo email:
                  privacy@isteroidi.it
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