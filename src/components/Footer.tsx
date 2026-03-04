import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheckIcon,
  LockIcon,
  TruckIcon,
  MailIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon } from
'lucide-react';
import { LANGUAGES, CATEGORIES, LANGUAGE_LABELS, BRANDS } from '../data/store';
import { CubeLogo } from './CubeLogo';
export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-gray-300 pt-16 pb-8 border-t border-primary-light cubes-overlay">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <CubeLogo size={28} className="text-accent" />
              <span className="text-2xl font-black font-sans text-white tracking-tighter">
                ISTEROIDI
              </span>
            </div>
            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              Il punto di riferimento in Europa per farmaci per la performance.
              Offriamo esclusivamente prodotti originali di qualità farmaceutica
              per atleti e bodybuilder.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-gray-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary">

                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-gray-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary">

                <TwitterIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-gray-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary">

                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-sans text-base font-bold text-white mb-6 uppercase tracking-wider">
              Categorie
            </h3>
            <ul className="space-y-3" role="list">
              {CATEGORIES.slice(0, 6).map((cat) =>
              <li key={cat.slug}>
                  <button
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className="font-sans text-sm text-gray-300 hover:text-accent transition-colors flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

                    <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-accent transition-colors"></span>
                    {cat.label}
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => navigate('/brands')}
                  className="font-sans text-sm text-gray-300 hover:text-accent transition-colors flex items-center gap-2 group mt-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

                  <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-accent transition-colors"></span>
                  Tutti i Marchi
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-sans text-base font-bold text-white mb-6 uppercase tracking-wider">
              Servizio Clienti
            </h3>
            <ul className="space-y-3" role="list">
              {[
              {
                label: 'Il mio Account',
                path: '/account'
              },
              {
                label: 'Traccia Ordine',
                path: '/account'
              },
              {
                label: 'Spedizioni e Consegne',
                path: '/termini'
              },
              {
                label: 'Resi e Rimborsi',
                path: '/termini'
              },
              {
                label: 'FAQ',
                path: '/faq'
              },
              {
                label: 'Contattaci',
                path: '/contact'
              }].
              map((item) =>
              <li key={item.label}>
                  <button
                  onClick={() => navigate(item.path)}
                  className="font-sans text-sm text-gray-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

                    {item.label}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter & Trust */}
          <div className="space-y-6">
            <h3 className="font-sans text-base font-bold text-white mb-2 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="font-sans text-sm text-gray-300 mb-4">
              Iscriviti per ricevere il 10% di sconto sul primo ordine.
            </p>

            <form
              className="relative flex items-center"
              onSubmit={(e) => e.preventDefault()}>

              <input
                type="email"
                placeholder="La tua email"
                className="w-full h-10 bg-white/10 border border-white/15 rounded-md pl-4 pr-12 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white/15 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary" />

              <button
                type="submit"
                className="absolute right-2 p-1.5 text-gray-300 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

                <MailIcon size={18} />
              </button>
            </form>

            <div className="pt-6">
              <h4 className="font-sans text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">
                Pagamenti Sicuri
              </h4>
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-white/10 rounded border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                  VISA
                </div>
                <div className="w-12 h-8 bg-white/10 rounded border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                  MC
                </div>
                <div className="w-12 h-8 bg-white/10 rounded border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                  SEPA
                </div>
                <div className="w-12 h-8 bg-white/10 rounded border border-white/10 flex items-center justify-center text-xs font-bold text-warning">
                  BTC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-y border-white/10 mb-8">
          <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-200">
            <ShieldCheckIcon size={24} className="text-success" />
            <span className="font-sans text-sm font-medium">
              Prodotti 100% Originali
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-200">
            <LockIcon size={24} className="text-success" />
            <span className="font-sans text-sm font-medium">
              Pagamenti Crittografati SSL
            </span>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-3 text-gray-200">
            <TruckIcon size={24} className="text-success" />
            <span className="font-sans text-sm font-medium">
              Spedizione Discreta 24h
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <p className="font-sans text-xs text-gray-300">
            © {currentYear} ISTEROIDI.IT — Tutti i diritti riservati.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button
              onClick={() => navigate('/privacy')}
              className="font-sans text-xs text-gray-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/cookie-policy')}
              className="font-sans text-xs text-gray-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

              Cookie Policy
            </button>
            <button
              onClick={() => navigate('/termini')}
              className="font-sans text-xs text-gray-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

              Termini di Servizio
            </button>
            <button
              onClick={() => navigate('/disclaimer')}
              className="font-sans text-xs text-gray-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">

              Disclaimer Medico
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="font-sans text-xs text-gray-300 max-w-4xl mx-auto leading-relaxed">
            ATTENZIONE: Le informazioni contenute in questo sito sono a scopo
            puramente informativo. Non incoraggiamo l'uso di sostanze dopanti.
            Consultare sempre un medico prima di intraprendere qualsiasi
            terapia. I prodotti venduti sono destinati esclusivamente a scopi di
            ricerca o per uso personale dove consentito dalla legge.
          </p>
        </div>
      </div>
    </footer>);

}