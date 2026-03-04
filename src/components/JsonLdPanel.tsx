import React from 'react';
import { CodeIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import type { JsonLdProduct } from '../types';
interface JsonLdPanelProps {
  data: JsonLdProduct;
}
interface FieldRowProps {
  path: string;
  value: string;
  type?: 'string' | 'url' | 'number' | 'type';
  indent?: number;
}
function FieldRow({ path, value, type = 'string', indent = 0 }: FieldRowProps) {
  const typeColors: Record<string, string> = {
    string: 'text-emerald-700',
    url: 'text-blue-600',
    number: 'text-purple-700',
    type: 'text-orange-600'
  };
  return (
    <div
      className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
      style={{
        paddingLeft: `${indent * 16 + 12}px`,
        paddingRight: '12px'
      }}>

      <span className="font-mono text-xs text-gray-400 flex-shrink-0 mt-0.5 min-w-0 w-40 truncate">
        {path}
      </span>
      <span className="font-mono text-xs text-gray-300 flex-shrink-0 mt-0.5">
        →
      </span>
      <span
        className={`font-mono text-xs flex-1 break-all ${typeColors[type]}`}>

        {type === 'string' || type === 'type' ? `"${value}"` : value}
      </span>
    </div>);

}
export function JsonLdPanel({ data }: JsonLdPanelProps) {
  const isInStock = data.offers.availability.includes('InStock');
  return (
    <aside
      className="bg-white border border-gray-200 rounded"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}
      aria-label="Dati strutturati JSON-LD">

      {/* Panel header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200 bg-gray-50 rounded-t">
        <div className="flex items-center gap-2">
          <CodeIcon size={14} className="text-gray-500" aria-hidden="true" />
          <span className="font-mono text-xs font-medium text-gray-600">
            JSON-LD structured data
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isInStock ?
          <CheckCircleIcon
            size={13}
            className="text-green-500"
            aria-hidden="true" /> :


          <AlertCircleIcon
            size={13}
            className="text-red-400"
            aria-hidden="true" />

          }
          <span className="font-mono text-xs text-gray-400">
            schema.org/Product
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="divide-y divide-gray-50">
        {/* Context + Type */}
        <div className="px-3 py-1 bg-gray-50/50">
          <span className="font-mono text-xs text-gray-400">root object</span>
        </div>
        <FieldRow path="@context" value={data['@context']} type="url" />
        <FieldRow path="@type" value={data['@type']} type="type" />
        <FieldRow path="name" value={data.name} />
        <FieldRow
          path="description"
          value={data.description.slice(0, 80) + '...'} />

        <FieldRow path="sku" value={data.sku} type="string" />

        {/* Brand */}
        <div className="px-3 py-1 bg-gray-50/50">
          <span className="font-mono text-xs text-gray-400">
            brand: Organization
          </span>
        </div>
        <FieldRow
          path="brand.@type"
          value={data.brand['@type']}
          type="type"
          indent={1} />

        <FieldRow path="brand.name" value={data.brand.name} indent={1} />

        {/* Offers */}
        <div className="px-3 py-1 bg-gray-50/50">
          <span className="font-mono text-xs text-gray-400">offers: Offer</span>
        </div>
        <FieldRow
          path="offers.@type"
          value={data.offers['@type']}
          type="type"
          indent={1} />

        <FieldRow
          path="offers.price"
          value={data.offers.price}
          type="number"
          indent={1} />

        <FieldRow
          path="offers.priceCurrency"
          value={data.offers.priceCurrency}
          indent={1} />

        <FieldRow
          path="offers.availability"
          value={data.offers.availability.replace('https://schema.org/', '')}
          type="type"
          indent={1} />

        <FieldRow
          path="offers.url"
          value={data.offers.url}
          type="url"
          indent={1} />


        {/* AggregateRating */}
        {data.aggregateRating &&
        <>
            <div className="px-3 py-1 bg-gray-50/50">
              <span className="font-mono text-xs text-gray-400">
                aggregateRating: AggregateRating
              </span>
            </div>
            <FieldRow
            path="aggregateRating.@type"
            value={data.aggregateRating['@type']}
            type="type"
            indent={1} />

            <FieldRow
            path="aggregateRating.ratingValue"
            value={data.aggregateRating.ratingValue}
            type="number"
            indent={1} />

            <FieldRow
            path="aggregateRating.reviewCount"
            value={data.aggregateRating.reviewCount}
            type="number"
            indent={1} />

          </>
        }
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 rounded-b flex items-center justify-between">
        <span className="font-mono text-xs text-gray-400">
          {Object.keys(data).length} top-level fields
        </span>
        <span className="font-mono text-xs text-gray-400">
          valid · google rich results eligible
        </span>
      </div>
    </aside>);

}