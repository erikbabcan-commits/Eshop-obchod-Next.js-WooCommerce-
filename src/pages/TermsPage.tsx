import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollTextIcon, FileTextIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
export function TermsPage() {
  const navigate = useNavigate();
  const lastUpdated = '15 Gennaio 2025';
  return (
    <Layout>
      <SEOHead title="Termini di Servizio" canonical="/termini" />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <Breadcrumb
            items={[
            {
              label: 'termini di servizio'
            }]
            } />


          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center">
                <ScrollTextIcon
                  size={18}
                  className="text-gray-400"
                  aria-hidden="true" />

              </div>
              <div>
                <h1 className="font-sans text-3xl font-bold text-gray-900">
                  Termini di Servizio
                </h1>
                <p className="font-mono text-xs text-gray-400">
                  /termini · Ultimo aggiornamento: {lastUpdated}
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
                  Condizioni Generali di Vendita
                </span>
              </div>
              <span className="font-mono text-xs text-gray-300">
                D.Lgs. 206/2005
              </span>
            </div>

            <div className="px-6 py-6 max-w-3xl space-y-6">
              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  1. Premesse
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Le presenti Condizioni Generali di Vendita disciplinano
                  l'offerta e la vendita di prodotti sul sito isteroidi.it.
                  L'utilizzo del sito e l'acquisto dei prodotti comportano
                  l'accettazione integrale delle presenti condizioni.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  2. Identificazione del Venditore
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  ISTEROIDI S.r.l., Via Roma 123, 00100 Roma (RM), Italia.
                  P.IVA: IT12345678901. Email: info@isteroidi.it
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  3. Prodotti e Prezzi
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  I prodotti offerti sono descritti nelle relative schede
                  prodotto. I prezzi indicati sono in Euro (€) e includono
                  l'IVA. Il Venditore si riserva il diritto di modificare i
                  prezzi in qualsiasi momento, fermo restando che il prezzo
                  addebitato sarà quello indicato al momento dell'ordine.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  4. Ordini e Pagamenti
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">
                  L'ordine costituisce proposta di acquisto. Il contratto si
                  perfeziona con l'invio della conferma d'ordine via email. I
                  metodi di pagamento accettati sono:
                </p>
                <ul className="list-disc list-inside font-sans text-sm text-gray-600 space-y-1.5 ml-2">
                  <li>
                    Carta di credito/debito (Visa, Mastercard, American Express)
                  </li>
                  <li>PayPal</li>
                  <li>Bonifico bancario anticipato</li>
                  <li>Criptovalute (Bitcoin, Ethereum)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  5. Spedizioni
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Le spedizioni vengono effettuate in tutta Europa. I tempi di
                  consegna sono indicativi (2-5 giorni lavorativi). La
                  spedizione è gratuita per ordini superiori a €150. Il pacco
                  viene spedito in modo discreto senza indicazioni sul
                  contenuto.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  6. Diritto di Recesso
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Ai sensi dell'art. 52 del D.Lgs. 206/2005, il consumatore ha
                  diritto di recedere dal contratto entro 14 giorni dalla
                  ricezione dei prodotti, senza dover fornire alcuna
                  motivazione. Per esercitare il diritto di recesso, contattare
                  il servizio clienti.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  7. Garanzia
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Tutti i prodotti sono coperti dalla garanzia legale di
                  conformità di 24 mesi ai sensi degli artt. 128-135 del D.Lgs.
                  206/2005. In caso di difetto di conformità, il consumatore ha
                  diritto alla riparazione o sostituzione del prodotto.
                </p>
              </section>

              <section>
                <h2 className="font-sans text-lg font-bold text-gray-900 mb-3">
                  8. Foro Competente
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Per qualsiasi controversia relativa all'interpretazione o
                  esecuzione delle presenti condizioni, sarà competente il Foro
                  del luogo di residenza o domicilio del consumatore.
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