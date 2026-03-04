import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon, FileTextIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
export function DisclaimerPage() {
  const navigate = useNavigate();
  const lastUpdated = '15 Gennaio 2025';
  return (
    <Layout>
      <SEOHead title="Disclaimer" canonical="/disclaimer" />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <Breadcrumb
            items={[
            {
              label: 'disclaimer'
            }]
            } />


          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center">
                <AlertTriangleIcon
                  size={18}
                  className="text-gray-400"
                  aria-hidden="true" />

              </div>
              <div>
                <h1 className="font-sans text-3xl font-bold text-gray-900">
                  Disclaimer
                </h1>
                <p className="font-mono text-xs text-gray-400">
                  /disclaimer · Ultimo aggiornamento: {lastUpdated}
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
                  Avvertenze Legali e Limitazione di Responsabilità
                </span>
              </div>
            </div>

            <div className="px-6 py-6 max-w-3xl space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded p-5 bg-gray-50">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon
                    size={20}
                    className="text-gray-500 flex-shrink-0 mt-0.5" />

                  <div>
                    <h2 className="font-sans text-base font-bold text-gray-900 mb-2">
                      Avvertenza Importante
                    </h2>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      I prodotti presenti su questo sito sono destinati
                      esclusivamente a scopi di ricerca e non sono destinati al
                      consumo umano. L'acquirente si assume la piena
                      responsabilità dell'uso dei prodotti acquistati.
                    </p>
                  </div>
                </div>
              </div>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  1. Scopo Informativo
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Le informazioni contenute in questo sito hanno scopo puramente
                  informativo e non costituiscono in alcun modo consiglio
                  medico, diagnosi o trattamento. Consultare sempre un medico
                  qualificato prima di assumere qualsiasi sostanza.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  2. Limitazione di Responsabilità
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  ISTEROIDI S.r.l. non si assume alcuna responsabilità per
                  eventuali danni diretti o indiretti derivanti dall'uso
                  improprio dei prodotti acquistati. L'acquirente dichiara di
                  essere maggiorenne e di conoscere le leggi vigenti nel proprio
                  paese riguardo ai prodotti acquistati.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  3. Conformità Legale
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  È responsabilità dell'acquirente verificare che i prodotti
                  acquistati siano legali nel proprio paese di residenza.
                  ISTEROIDI non effettua spedizioni verso paesi in cui i
                  prodotti sono vietati.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  4. Uso Sportivo
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Molti dei prodotti presenti su questo sito sono vietati dalla
                  WADA (World Anti-Doping Agency) e da altre organizzazioni
                  sportive. Gli atleti professionisti o dilettanti soggetti a
                  controlli antidoping non devono utilizzare questi prodotti.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  5. Effetti Collaterali
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  L'uso di steroidi anabolizzanti, ormoni e altre sostanze può
                  comportare gravi effetti collaterali sulla salute. Le
                  descrizioni dei prodotti non costituiscono un invito all'uso e
                  non sostituiscono il parere medico.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  6. Accuratezza delle Informazioni
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Nonostante ogni sforzo per garantire l'accuratezza delle
                  informazioni, ISTEROIDI non garantisce che le informazioni
                  presenti sul sito siano complete, accurate o aggiornate. Le
                  informazioni possono essere modificate senza preavviso.
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