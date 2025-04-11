
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedCurrency } from '@/types/language';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CurrencySwitcher = () => {
  const { currency, setCurrency, t } = useLanguage();

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as SupportedCurrency);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t.common.currency}:</span>
      <Select value={currency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BGN">BGN (лв)</SelectItem>
          <SelectItem value="EUR">EUR (€)</SelectItem>
          <SelectItem value="USD">USD ($)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySwitcher;
