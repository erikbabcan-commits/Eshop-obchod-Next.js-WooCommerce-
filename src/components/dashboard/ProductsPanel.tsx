import React, { useState } from 'react';
import {
  SearchIcon,
  EditIcon,
  ExternalLinkIcon,
  CheckIcon,
  XIcon } from
'lucide-react';
import { PRODUCTS } from '../../data/store';
export function ProductsPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = PRODUCTS.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()));

  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Prodotti
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Catalogo prodotti sincronizzato da WooCommerce
          </p>
        </div>
        <button className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 flex items-center justify-center">
          Sincronizza Prodotti
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Cerca per nome, SKU o brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-4 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white border border-gray-200 rounded overflow-hidden"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 w-12">
                  Img
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Prodotto
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  SKU
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Stock
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-right">
                  Prezzo
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-center">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length > 0 ?
              filteredProducts.map((product) =>
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors">

                    <td className="px-4 py-3">
                      <div className="w-10 h-10 border border-dashed border-gray-300 rounded bg-gray-50 flex items-center justify-center overflow-hidden">
                        {product.imageUrl ?
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="w-full h-full object-cover mix-blend-multiply" /> :


                    <span className="font-mono text-xs text-gray-400">
                            IMG
                          </span>
                    }
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm font-medium text-gray-900 block line-clamp-1">
                        {product.name}
                      </span>
                      <span className="font-mono text-xs text-gray-500">
                        {product.brand} · {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-600">
                        {product.sku}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {product.availability === 'InStock' ?
                  <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 rounded-full border bg-green-50 text-green-700 border-green-200 uppercase tracking-wider">
                          <CheckIcon size={10} /> In Stock
                        </span> :

                  <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 rounded-full border bg-red-50 text-red-700 border-red-200 uppercase tracking-wider">
                          <XIcon size={10} /> Esaurito
                        </span>
                  }
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm font-medium text-gray-900 block">
                        €{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice &&
                  <span className="font-mono text-xs text-gray-400 line-through">
                          €{product.originalPrice.toFixed(2)}
                        </span>
                  }
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      title="Modifica in WP">

                          <EditIcon size={16} />
                        </button>
                        <a
                      href={`/product/${product.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      title="Vedi sul sito">

                          <ExternalLinkIcon size={16} />
                        </a>
                      </div>
                    </td>
                  </tr>
              ) :

              <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <p className="font-sans text-sm text-gray-500">
                      Nessun prodotto trovato.
                    </p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-500">
            Mostrando {filteredProducts.length} prodotti
          </span>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 h-8 border border-gray-300 rounded text-gray-400 font-mono text-xs bg-white cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

              Precedente
            </button>
            <button
              disabled
              className="px-3 h-8 border border-gray-300 rounded text-gray-400 font-mono text-xs bg-white cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

              Successivo
            </button>
          </div>
        </div>
      </div>
    </div>);

}