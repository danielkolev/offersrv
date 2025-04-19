
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';
import { cn } from '@/lib/utils';

interface TotalsSectionProps {
  subtotal: number;
  vat: number;
  vatRate: number;
  includeVat: boolean;
  transportCost: number;
  otherCosts: number;
  total: number;
  language: SupportedLanguage;
  settings?: any;
}

const TotalsSection: React.FC<TotalsSectionProps> = ({
  subtotal,
  vat,
  vatRate,
  includeVat,
  transportCost,
  otherCosts,
  total,
  language,
  settings
}) => {
  const { currency, t } = useLanguage();
  
  const isBoldPrices = settings?.content?.boldPrices !== false;
  const isCompactMode = settings?.layout?.compactMode === true;
  
  return (
    <div className="flex justify-end mb-6">
      <div className={cn(
        "w-full max-w-sm space-y-1",
        isCompactMode ? "text-sm" : ""
      )}>
        <div className="flex justify-between py-1">
          <span className="text-sm text-gray-600">
            {t.totals.subtotal}:
          </span>
          <span className={cn(
            "text-gray-800",
            isBoldPrices ? "font-medium" : ""
          )}>
            {formatCurrency(subtotal, language, currency)}
          </span>
        </div>
        
        {transportCost > 0 && (
          <div className="flex justify-between py-1">
            <span className="text-sm text-gray-600">
              {t.totals.transport}:
            </span>
            <span className={cn(
              "text-gray-800",
              isBoldPrices ? "font-medium" : ""
            )}>
              {formatCurrency(transportCost, language, currency)}
            </span>
          </div>
        )}
        
        {otherCosts > 0 && (
          <div className="flex justify-between py-1">
            <span className="text-sm text-gray-600">
              {t.totals.otherCosts}:
            </span>
            <span className={cn(
              "text-gray-800",
              isBoldPrices ? "font-medium" : ""
            )}>
              {formatCurrency(otherCosts, language, currency)}
            </span>
          </div>
        )}
        
        {!includeVat && vat > 0 && (
          <div className="flex justify-between py-1">
            <span className="text-sm text-gray-600">
              {`${t.totals.vat} (${vatRate}%)`}:
            </span>
            <span className={cn(
              "text-gray-800",
              isBoldPrices ? "font-medium" : ""
            )}>
              {formatCurrency(vat, language, currency)}
            </span>
          </div>
        )}
        
        <div className={cn(
          "flex justify-between py-1 border-t",
          settings?.appearance?.primaryColor ? "" : "",
          isBoldPrices ? "font-bold" : "font-medium",
          "text-gray-900"
        )}
        style={{ 
          borderColor: settings?.appearance?.primaryColor || ""
        }}>
          <span>
            {t.totals.total}:
          </span>
          <span>{formatCurrency(total, language, currency)}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalsSection;
