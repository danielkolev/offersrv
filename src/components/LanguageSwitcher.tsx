
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/types/language';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: SupportedLanguage = language === 'bg' ? 'en' : 'bg';
    setLanguage(newLang);
  };

  return (
    <Button 
      variant="outline" 
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      {language === 'bg' ? '🇧🇬 BG' : '🇬🇧 EN'}
    </Button>
  );
};

export default LanguageSwitcher;
