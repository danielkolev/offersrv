import React from 'react';
import { Product } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';
import { cn } from '@/lib/utils';

export interface ProductsTableProps {
  products: Product[];
  showPartNumber: boolean;
  displayLanguage?: SupportedLanguage;
  settings?: any;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ 
  products, 
  showPartNumber, 
  displayLanguage = 'bg',
  settings 
}) => {
  const { t } = useLanguage();
  
  const isCompactMode = settings?.layout?.compactMode === true;
  const isBoldPrices = settings?.content?.boldPrices !== false;
  const alternateRowColors = settings?.content?.alternateRowColors === true;
  
  return (
    <div className="w-full overflow-hidden rounded-md border print-visible">
      <table className="w-full">
        <thead>
          <tr 
            className={cn(
              "text-sm font-medium",
              settings?.layout?.compactMode ? "text-xs" : ""
            )}
            style={{ 
              backgroundColor: settings?.appearance?.primaryColor || "",
              color: settings?.appearance?.textColor || ""
            }}
          >
            <th className="p-2 text-left">{t.offer.item}</th>
            {showPartNumber && <th className="p-2 text-left">{t.offer.partNo}</th>}
            <th className="p-2 text-right">{t.offer.qty}</th>
            <th className="p-2 text-right">{t.offer.unit}</th>
            <th className="p-2 text-right">{t.offer.unitPrice}</th>
            <th className="p-2 text-right">{t.offer.total}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr 
              key={product.id} 
              className={cn(
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                alternateRowColors && index % 2 !== 0 ? 'bg-gray-100' : '',
                settings?.layout?.compactMode ? "text-xs" : ""
              )}
            >
              <td className="p-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  {product.description && (
                    <p className="text-sm text-gray-500">{product.description}</p>
                  )}
                </div>
              </td>
              {showPartNumber && <td className="p-2">{product.partNumber}</td>}
              <td className="p-2 text-right">{product.quantity}</td>
              <td className="p-2 text-right">{product.unit || 'бр.'}</td>
              <td className="p-2 text-right">
                <span className={cn(isBoldPrices ? 'font-medium' : '')}>
                  {formatCurrency(product.unitPrice, displayLanguage)}
                </span>
              </td>
              <td className="p-2 text-right">
                <span className={cn(isBoldPrices ? 'font-medium' : '')}>
                  {formatCurrency(product.quantity * product.unitPrice, displayLanguage)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
