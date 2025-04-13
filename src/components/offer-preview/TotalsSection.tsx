
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

interface TotalsSectionProps {
  subtotal: number;
  vat: number;
  vatRate: number;
  includeVat: boolean;
  transportCost: number;
  otherCosts: number;
  total: number;
  language: SupportedLanguage;
}

const TotalsSection: React.FC<TotalsSectionProps> = ({
  subtotal,
  vat,
  vatRate,
  includeVat,
  transportCost,
  otherCosts,
  total,
  language
}) => {
  const { currency } = useLanguage();
  
  return (
    <div className="flex justify-end mb-6">
      <div className="w-full max-w-sm space-y-1">
        <div className="flex justify-between py-1">
          <span className="text-sm text-muted-foreground">
            {language === 'bg' ? 'Междинна сума' : 'Subtotal'}:
          </span>
          <span>{formatCurrency(subtotal, language, currency)}</span>
        </div>
        
        {transportCost > 0 && (
          <div className="flex justify-between py-1">
            <span className="text-sm text-muted-foreground">
              {language === 'bg' ? 'Транспорт' : 'Transport'}:
            </span>
            <span>{formatCurrency(transportCost, language, currency)}</span>
          </div>
        )}
        
        {otherCosts > 0 && (
          <div className="flex justify-between py-1">
            <span className="text-sm text-muted-foreground">
              {language === 'bg' ? 'Други разходи' : 'Other costs'}:
            </span>
            <span>{formatCurrency(otherCosts, language, currency)}</span>
          </div>
        )}
        
        {includeVat && (
          <div className="flex justify-between py-1">
            <span className="text-sm text-muted-foreground">
              {language === 'bg' ? `ДДС (${vatRate}%)` : `VAT (${vatRate}%)`}:
            </span>
            <span>{formatCurrency(vat, language, currency)}</span>
          </div>
        )}
        
        <div className="flex justify-between py-1 border-t font-medium">
          <span>
            {language === 'bg' ? 'Обща сума' : 'Total'}:
          </span>
          <span>{formatCurrency(total, language, currency)}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalsSection;
