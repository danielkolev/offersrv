
import React from 'react';
import { Product } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

interface ProductsTableProps {
  products: Product[];
  showPartNumber: boolean;
  displayLanguage?: SupportedLanguage; // Properly typed as SupportedLanguage
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, showPartNumber, displayLanguage }) => {
  const { language, currency, t } = useLanguage();
  
  // Use displayLanguage prop or fall back to context language
  const tableLanguage = displayLanguage || language;

  return (
    <div className="mb-6">
      <div className="bg-offer-blue text-white py-2 px-3 rounded-t-md">
        <div className="grid grid-cols-12 gap-2 text-sm">
          <div className="col-span-5 font-medium">{t.offer.item}</div>
          {showPartNumber && (
            <div className="col-span-2 font-medium">{t.offer.partNo}</div>
          )}
          <div className={`col-span-${showPartNumber ? '1' : '3'} text-center font-medium`}>{t.offer.qty}</div>
          <div className={`col-span-${showPartNumber ? '2' : '2'} text-right font-medium`}>{t.offer.unitPrice}</div>
          <div className={`col-span-${showPartNumber ? '2' : '2'} text-right font-medium`}>{t.offer.total}</div>
        </div>
      </div>
      
      <div className="border-x border-b rounded-b-md overflow-hidden">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`grid grid-cols-12 gap-2 px-3 py-2 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className="col-span-5">
              <div className="font-medium text-sm">{product.name}</div>
              {product.description && (
                <div className="text-xs text-muted-foreground">{product.description}</div>
              )}
              
              {/* Display bundled products */}
              {product.isBundle && product.bundledProducts && product.bundledProducts.length > 0 && product.showBundledPrices && (
                <div className="mt-1 pl-2 border-l-2 border-gray-200">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {tableLanguage === 'bg' ? 'Пакетът включва:' : 'Bundle includes:'}
                  </p>
                  {product.bundledProducts.map(item => (
                    <div key={item.id} className="text-xs flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{formatCurrency(item.unitPrice * item.quantity, tableLanguage, currency)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Just show the item count if showBundledPrices is false */}
              {product.isBundle && product.bundledProducts && product.bundledProducts.length > 0 && !product.showBundledPrices && (
                <div className="mt-1 pl-2 border-l border-gray-200">
                  <p className="text-xs text-muted-foreground">
                    {tableLanguage === 'bg' 
                      ? `Пакетът включва ${product.bundledProducts.length} артикула` 
                      : `Bundle includes ${product.bundledProducts.length} items`}
                  </p>
                </div>
              )}
            </div>
            
            {showPartNumber && (
              <div className="col-span-2 self-center text-sm">{product.partNumber || '-'}</div>
            )}
            
            {/* Quantity column - show unit only if defined and not empty */}
            <div className={`col-span-${showPartNumber ? '1' : '3'} self-center text-center text-sm`}>
              {product.quantity}{product.unit && product.unit !== '' ? ` ${product.unit}` : ''}
            </div>
            
            {/* Unit price column - make it bold like the total price */}
            <div className={`col-span-${showPartNumber ? '2' : '2'} self-center text-right text-sm font-medium`}>
              {formatCurrency(product.unitPrice, tableLanguage, currency)}
            </div>
            
            <div className={`col-span-${showPartNumber ? '2' : '2'} self-center text-right font-medium text-sm`}>
              {formatCurrency(product.quantity * product.unitPrice, tableLanguage, currency)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
