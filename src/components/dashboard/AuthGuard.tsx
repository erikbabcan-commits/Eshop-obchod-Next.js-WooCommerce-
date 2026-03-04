import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlertIcon, LockIcon, ArrowLeftIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { hasAdminAccess } from '../../services/security';
interface AuthGuardProps {
  children: React.ReactNode;
}
export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <LockIcon size={20} className="text-gray-400" />
          </div>
          <p className="font-mono text-sm text-gray-500">Verifica accesso...</p>
        </div>
      </div>);

  }
  // Not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div
            className="bg-white border border-gray-200 rounded p-8"
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>

            <div className="w-16 h-16 border-2 border-dashed border-red-200 rounded-full flex items-center justify-center mx-auto mb-6 bg-red-50">
              <ShieldAlertIcon size={28} className="text-red-400" />
            </div>
            <h1 className="font-sans text-2xl font-bold text-gray-900 mb-2">
              Accesso Negato
            </h1>
            <p className="font-sans text-sm text-gray-500 mb-6">
              Devi effettuare l'accesso per visualizzare il pannello di
              amministrazione.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full font-sans font-semibold text-sm h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                <LockIcon size={14} />
                Accedi
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full font-mono text-xs h-8 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                <ArrowLeftIcon size={12} />
                Torna allo Store
              </button>
            </div>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-4">
            HTTP 401 · Autenticazione richiesta
          </p>
        </div>
      </div>);

  }
  // Authenticated but not admin
  if (!hasAdminAccess(user)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div
            className="bg-white border border-gray-200 rounded p-8"
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>

            <div className="w-16 h-16 border-2 border-dashed border-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 bg-yellow-50">
              <ShieldAlertIcon size={28} className="text-yellow-500" />
            </div>
            <h1 className="font-sans text-2xl font-bold text-gray-900 mb-2">
              Permessi Insufficienti
            </h1>
            <p className="font-sans text-sm text-gray-500 mb-2">
              Il tuo account non ha i permessi di amministratore necessari per
              accedere a questa sezione.
            </p>
            <p className="font-mono text-xs text-gray-400 mb-6">
              Utente: {user.email}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/account')}
                className="w-full font-sans font-semibold text-sm h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                Vai al tuo Account
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full font-mono text-xs h-8 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                <ArrowLeftIcon size={12} />
                Torna allo Store
              </button>
            </div>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-4">
            HTTP 403 · Autorizzazione negata
          </p>
        </div>
      </div>);

  }
  // Admin access granted
  return <>{children}</>;
}