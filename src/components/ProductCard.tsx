import React from 'react';
import { StarIcon, ShoppingCartIcon, TagIcon, HeartIcon } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}
export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist
  } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice ?
  Math.round(
    (product.originalPrice - product.price) / product.originalPrice * 100
  ) :
  null;
  const isNew = product.tags.includes('nuovo');
  const isBestseller = product.reviewCount > 50;
  return (
    <article
      onClick={onClick}
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full overflow-hidden border border-gray-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label={`Prodotto: ${product.name}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onClick) onClick();
      }}>

      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {product.imageUrl ?
        <img
          src={product.imageUrl}
          alt={product.imageAlt}
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out" /> :


        <div className="text-center">
            <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 bg-white/50">
              <span className="font-mono text-xs text-gray-400">IMG</span>
            </div>
          </div>
        }

        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start z-10">
          {discount &&
          <span className="font-sans font-bold text-xs px-2 py-1 bg-accent text-white rounded-sm shadow-sm transform -rotate-3">
              -{discount}%
            </span>
          }
          {isNew &&
          <span className="font-sans font-bold text-xs uppercase tracking-wider px-2 py-1 bg-primary text-white rounded-sm shadow-sm">
              Nuovo
            </span>
          }
          {isBestseller && !isNew &&
          <span className="font-sans font-bold text-xs uppercase tracking-wider px-2 py-1 bg-warning text-white rounded-sm shadow-sm">
              Bestseller
            </span>
          }
          {product.availability !== 'InStock' &&
          <span className="font-sans font-bold text-xs uppercase tracking-wider px-2 py-1 bg-gray-800 text-white rounded-sm shadow-sm">
              Esaurito
            </span>
          }
        </div>

        {/* Wishlist heart - Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (inWishlist) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist(product);
            }
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm z-10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${inWishlist ? 'bg-accent text-white scale-110' : 'bg-white text-gray-400 hover:text-accent hover:scale-110'}`}
          aria-label={
          inWishlist ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'
          }>

          <HeartIcon
            size={14}
            className={inWishlist ? 'fill-current' : ''}
            strokeWidth={inWishlist ? 2 : 1.5}
            aria-hidden="true" />

        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 bg-gradient-to-t from-black/50 to-transparent">
          <button
            className="w-full h-10 flex items-center justify-center gap-2 font-sans font-semibold text-sm px-4 bg-accent text-white rounded hover:bg-accent-hover transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, 1);
              openDrawer();
            }}
            disabled={product.availability !== 'InStock'}>

            <ShoppingCartIcon size={16} aria-hidden="true" />
            {product.availability === 'InStock' ? 'Aggiungi' : 'Esaurito'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        {/* Brand & Rating Row */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            {product.brand}
          </span>
          <div
            className="flex items-center gap-1"
            aria-label={`Valutazione: ${product.rating} su 5`}>

            <StarIcon
              size={14}
              className="text-warning fill-warning"
              aria-hidden="true" />

            <span className="font-mono text-xs font-medium text-gray-600">
              {product.rating}{' '}
              <span className="text-gray-500 font-normal">
                ({product.reviewCount})
              </span>
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-sans font-bold text-sm text-primary leading-tight mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="font-sans text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Price Row */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex flex-col">
            {product.originalPrice &&
            <span className="font-mono text-xs text-gray-500 line-through mb-1">
                €{product.originalPrice.toFixed(2)}
              </span>
            }
            <span className="font-mono font-bold text-lg text-primary leading-none">
              €{product.price.toFixed(2)}
            </span>
          </div>

          {/* Mobile Add Button (visible only on small screens where hover doesn't work well) */}
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 bg-gray-100 text-primary rounded-full hover:bg-accent hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, 1);
              openDrawer();
            }}
            aria-label="Aggiungi al carrello">

            <ShoppingCartIcon size={14} />
          </button>
        </div>
      </div>
    </article>);

}