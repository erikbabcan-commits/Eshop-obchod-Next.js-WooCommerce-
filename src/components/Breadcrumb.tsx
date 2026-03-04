import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import type { BreadcrumbItem } from '../types';
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onHomeClick?: () => void;
}
export function Breadcrumb({ items, onHomeClick }: BreadcrumbProps) {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      navigate('/');
    }
  };
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-0">
      <ol
        className="flex items-center gap-1 flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList">

        {/* Home */}
        <li
          className="flex items-center"
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement">

          <button
            onClick={handleHomeClick}
            className="font-mono text-xs text-gray-400 flex items-center gap-1 hover:text-gray-700 cursor-pointer transition-colors"
            aria-label="Torna alla home">

            <HomeIcon size={11} aria-hidden="true" />
            <span itemProp="name">home</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) =>
        <li
          key={index}
          className="flex items-center gap-1"
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement">

            <ChevronRightIcon
            size={11}
            className="text-gray-300"
            aria-hidden="true" />

            {item.onClick || item.href ?
          <button
            onClick={
            item.onClick ?? (() => item.href && navigate(item.href))
            }
            className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            itemProp="name">

                {item.label}
              </button> :

          <span
            className="font-mono text-xs text-gray-800 font-medium"
            aria-current="page"
            itemProp="name">

                {item.label}
              </span>
          }
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        )}
      </ol>
    </nav>);

}