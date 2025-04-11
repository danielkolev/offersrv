import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupportedLanguage, SupportedCurrency, Translations } from '@/types/language';
import { translations } from '@/localization';

interface LanguageContextType {
  language: SupportedLanguage;
  currency: SupportedCurrency;
  t: Translations;
  setLanguage: (lang: SupportedLanguage) => void;
  setCurrency: (currency: SupportedCurrency) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('bg');
  const [currency, setCurrency] = useState<SupportedCurrency>(language === 'bg' ? 'BGN' : 'EUR');

  // Update currency when language changes
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    // Default currency based on language, but don't change if user explicitly set another currency
    if ((lang === 'bg' && currency === 'EUR') || (lang === 'en' && currency === 'BGN')) {
      setCurrency(lang === 'bg' ? 'BGN' : 'EUR');
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        currency,
        t,
        setLanguage: handleLanguageChange,
        setCurrency,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
