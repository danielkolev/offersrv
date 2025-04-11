
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';

interface TotalsSectionProps {
  subtotal: number;
  vat: number;
  vatRate: number;
  includeVat: boolean;
  transportCost: number;
  otherCosts: number;
  total: number;
}

const TotalsSection: React.FC<TotalsSectionProps> = ({ 
  subtotal, 
  vat, 
  vatRate, 
  includeVat, 
  transportCost, 
  otherCosts, 
  total 
}) => {
  const { language, currency, t } = useLanguage();

  return (
    <div className="flex justify-end mb-8">
      <div className="w-full md:w-64">
        <div className="grid grid-cols-2 gap-1 border-b pb-2 mb-2">
          <p className="font-medium">{t.totals.subtotal}:</p>
          <p className="text-right">{formatCurrency(subtotal, language, currency)}</p>
          
          {includeVat && (
            <>
              <p className="font-medium">{t.totals.vat} ({vatRate}%):</p>
              <p className="text-right">{formatCurrency(vat, language, currency)}</p>
            </>
          )}
          
          {transportCost > 0 && (
            <>
              <p className="font-medium">{t.totals.transport}:</p>
              <p className="text-right">{formatCurrency(transportCost, language, currency)}</p>
            </>
          )}
          
          {otherCosts > 0 && (
            <>
              <p className="font-medium">{t.totals.otherCosts}:</p>
              <p className="text-right">{formatCurrency(otherCosts, language, currency)}</p>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          <p className="font-bold text-lg">{t.totals.totalAmount}:</p>
          <p className="text-right font-bold text-lg text-offer-blue">
            {formatCurrency(total, language, currency)}
          </p>
          
          {includeVat ? (
            <p className="col-span-2 text-right text-xs text-muted-foreground">
              {t.offer.vatIncluded}
            </p>
          ) : (
            <p className="col-span-2 text-right text-xs text-muted-foreground">
              {t.offer.vatExcluded}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalsSection;
