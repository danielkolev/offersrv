
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/types/language';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bg">
            <div className="flex items-center gap-2">
              <span>🇧🇬</span> Български
            </div>
          </SelectItem>
          <SelectItem value="en">
            <div className="flex items-center gap-2">
              <span>🇬🇧</span> English
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
