
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/types/language/base';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[130px] h-9">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue placeholder={t.common.language} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bg">
          <div className="flex items-center gap-2">
            <span>🇧🇬</span> Български
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <span>🇬🇧</span> English (EN)
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
