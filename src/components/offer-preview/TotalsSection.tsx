
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language';

interface TotalsSectionProps {
  subtotal: number;
  vat: number;
  vatRate: number;
  includeVat: boolean;
  transportCost: number;
  otherCosts: number;
  total: number;
  language?: SupportedLanguage; // Make language optional
}

const TotalsSection: React.FC<TotalsSectionProps> = ({ 
  subtotal, 
  vat, 
  vatRate, 
  includeVat, 
  transportCost, 
  otherCosts, 
  total,
  language: displayLanguage // Accept the language prop
}) => {
  const { language, currency, t } = useLanguage();
  
  // Use the provided language or fall back to the context language
  const currentLanguage = displayLanguage || language;

  const translations = {
    subtotal: t?.totals?.subtotal || "Subtotal",
    vat: t?.totals?.vat || "VAT",
    transport: t?.totals?.transport || "Transport",
    otherCosts: t?.totals?.otherCosts || "Other Costs",
    totalAmount: t?.totals?.totalAmount || "Total Amount",
    vatIncluded: t?.offer?.vatIncluded || "VAT included",
    vatExcluded: t?.offer?.vatExcluded || "VAT not included"
  };

  return (
    <div className="flex justify-end mb-6">
      <div className="w-full md:w-60 bg-gray-50 p-3 rounded-md">
        <div className="grid grid-cols-2 gap-1 border-b pb-2 mb-2 text-sm">
          <p className="font-medium">{translations.subtotal}:</p>
          <p className="text-right">{formatCurrency(subtotal, currentLanguage, currency)}</p>
          
          <p className="font-medium">{translations.vat} ({vatRate}%):</p>
          <p className="text-right">{formatCurrency(vat, currentLanguage, currency)}</p>
          
          {transportCost > 0 && (
            <>
              <p className="font-medium">{translations.transport}:</p>
              <p className="text-right">{formatCurrency(transportCost, currentLanguage, currency)}</p>
            </>
          )}
          
          {otherCosts > 0 && (
            <>
              <p className="font-medium">{translations.otherCosts}:</p>
              <p className="text-right">{formatCurrency(otherCosts, currentLanguage, currency)}</p>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          <p className="font-bold">{translations.totalAmount}:</p>
          <p className="text-right font-bold text-offer-blue">
            {formatCurrency(total, currentLanguage, currency)}
          </p>
          
          <p className="col-span-2 text-right text-xs text-muted-foreground">
            {includeVat ? translations.vatIncluded : translations.vatExcluded}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalsSection;
