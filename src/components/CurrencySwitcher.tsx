
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedCurrency } from '@/types/language/base';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Coins } from 'lucide-react';

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useLanguage();

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as SupportedCurrency);
  };

  return (
    <Select value={currency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-[80px] h-9">
        <Coins className="h-4 w-4 mr-1" />
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="BGN">BGN (лв)</SelectItem>
        <SelectItem value="EUR">EUR (€)</SelectItem>
        <SelectItem value="USD">USD ($)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySwitcher;
