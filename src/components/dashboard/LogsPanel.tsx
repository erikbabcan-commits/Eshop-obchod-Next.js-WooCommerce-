import React, { useState } from 'react';
import {
  ScrollTextIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
} from 'lucide-react';
import { MOCK_ACTIVITY_LOGS } from '../../data/infrastructureStore';
import { translations } from '../../data/i18n';

const { title, description, headers } = translations.dashboard.section.logs;

type Severity = 'all' | 'info' | 'success' | 'warning' | 'error';

const SEVERITY_COLORS: Record<string, string> = {
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  error: 'bg-red-50 text-red-700 border-red-200',
};

export function LogsPanel() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<Severity>('all');

  const filtered = MOCK_ACTIVITY_LOGS.filter((log) => {
    const matchesSeverity =
      severityFilter === 'all' || log.severity === severityFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      log.action.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      log.user.toLowerCase().includes(q) ||
      log.category.toLowerCase().includes(q);
    return matchesSeverity && matchesSearch;
  });

  const handleExport = () => {
    const rows = [
      [headers.date, headers.action, headers.user, headers.category, headers.severity, headers.details],
      ...filtered.map((l) => [
        new Date(l.timestamp).toLocaleString(),
        l.action,
        l.user,
        l.category,
        l.severity,
        l.details,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-trail.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            {title}
          </h2>
          <p className="font-mono text-xs text-gray-500">{description}</p>
        </div>
        <button
          onClick={handleExport}
          className="font-mono text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 border border-gray-300 rounded px-3 h-8 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <DownloadIcon size={12} /> Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="flex flex-wrap gap-4">
        {(['info', 'success', 'warning', 'error'] as const).map((s) => {
          const count = MOCK_ACTIVITY_LOGS.filter((l) => l.severity === s).length;
          return (
            <div
              key={s}
              className="bg-white border border-gray-200 rounded p-4 flex-1 min-w-[160px]"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <span className="font-mono text-xs text-gray-500 block mb-1 capitalize">
                {s}
              </span>
              <span className="font-sans text-2xl font-bold text-gray-900">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search logs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 h-9 border border-gray-300 rounded font-mono text-xs focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterIcon size={14} className="text-gray-400" />
          {(['all', 'info', 'success', 'warning', 'error'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`font-mono text-xs px-3 h-8 rounded border transition-colors ${
                severityFilter === s
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white border border-gray-200 rounded overflow-hidden"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 w-44">
                  {headers.date}
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  {headers.action}
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  {headers.user}
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  {headers.category}
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-right">
                  {headers.severity}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center font-mono text-xs text-gray-400"
                  >
                    <ScrollTextIcon
                      size={20}
                      className="inline-block mb-2 opacity-40"
                    />
                    <br />
                    No logs found
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
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
                      <span className="font-mono text-xs text-gray-600">
                        {log.user}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-600 uppercase">
                        {log.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-flex font-mono text-xs px-2 py-1 rounded-full border uppercase tracking-wider ${
                          SEVERITY_COLORS[log.severity] ?? ''
                        }`}
                      >
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
