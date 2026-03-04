import React, { useState } from 'react';
import {
  ActivityIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  DownloadIcon } from
'lucide-react';
import {
  MOCK_HEALTH_CHECKS,
  MOCK_ACTIVITY_LOGS } from
'../../data/infrastructureStore';
import type { ServiceStatus } from '../../types/infrastructure';
export function HealthPanel() {
  const [isChecking, setIsChecking] = useState(false);
  const handleCheckAll = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 2000);
  };
  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      case 'error':
        return <XCircleIcon size={16} className="text-red-500" />;
      case 'disconnected':
        return <AlertTriangleIcon size={16} className="text-yellow-500" />;
      case 'checking':
        return (
          <RefreshCwIcon size={16} className="text-blue-500 animate-spin" />);

    }
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  const connectedCount = MOCK_HEALTH_CHECKS.filter(
    (h) => h.status === 'connected'
  ).length;
  const avgResponseTime = Math.round(
    MOCK_HEALTH_CHECKS.filter((h) => h.responseTime).reduce(
      (acc, h) => acc + (h.responseTime || 0),
      0
    ) / connectedCount
  );
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Stato Sistema & Log
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Monitoraggio dei servizi e registro attività
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCheckAll}
            disabled={isChecking}
            className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

            <ActivityIcon size={16} />
            Controlla Tutti i Servizi
          </button>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="flex flex-wrap gap-4">
        <div
          className="bg-white border border-gray-200 rounded p-4 flex-1 min-w-[200px]"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <span className="font-mono text-xs text-gray-500 block mb-1">
            Servizi Connessi
          </span>
          <div className="flex items-end gap-2">
            <span className="font-sans text-2xl font-bold text-gray-900">
              {connectedCount}/{MOCK_HEALTH_CHECKS.length}
            </span>
            <span className="font-mono text-xs text-green-600 mb-1">
              Tutti operativi
            </span>
          </div>
        </div>
        <div
          className="bg-white border border-gray-200 rounded p-4 flex-1 min-w-[200px]"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <span className="font-mono text-xs text-gray-500 block mb-1">
            Tempo Medio Risposta
          </span>
          <div className="flex items-end gap-2">
            <span className="font-sans text-2xl font-bold text-gray-900">
              {avgResponseTime}ms
            </span>
            <span className="font-mono text-xs text-gray-400 mb-1">
              Ottimale
            </span>
          </div>
        </div>
      </div>

      {/* Health Checks Grid */}
      <div>
        <h3 className="font-sans font-semibold text-gray-900 mb-4">
          Stato Servizi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_HEALTH_CHECKS.map((check) =>
          <div
            key={check.id}
            className="bg-white border border-gray-200 rounded p-4"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(isChecking ? 'checking' : check.status)}
                  <span className="font-sans font-semibold text-sm text-gray-900">
                    {check.name}
                  </span>
                </div>
                {check.responseTime && !isChecking &&
              <span className="font-mono text-xs text-gray-500">
                    {check.responseTime}ms
                  </span>
              }
              </div>
              <p className="font-mono text-xs text-gray-600 mb-3 h-8 line-clamp-2">
                {check.message}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="font-mono text-xs text-gray-400 truncate max-w-[150px]">
                  {check.endpoint}
                </span>
                <button className="font-mono text-xs text-blue-600 hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">
                  Ricontrolla
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Logs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-gray-900">
            Registro Attività (Logs)
          </h3>
          <button className="font-mono text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 border border-gray-300 rounded px-3 h-8 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            <DownloadIcon size={12} /> Esporta CSV
          </button>
        </div>

        <div
          className="bg-white border border-gray-200 rounded overflow-hidden"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 w-40">
                    Timestamp
                  </th>
                  <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                    Azione
                  </th>
                  <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                    Categoria
                  </th>
                  <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                    Utente
                  </th>
                  <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-right">
                    Severità
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_ACTIVITY_LOGS.map((log) =>
                <tr
                  key={log.id}
                  className="hover:bg-gray-50 transition-colors">

                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm font-medium text-gray-900 block">
                        {log.action}
                      </span>
                      <span className="font-mono text-xs text-gray-500 line-clamp-1">
                        {log.details}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-600 uppercase">
                        {log.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-600">
                        {log.user}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                      className={`inline-flex font-mono text-xs px-2 py-1 rounded-full border uppercase tracking-wider ${getSeverityColor(log.severity)}`}>

                        {log.severity}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);

}